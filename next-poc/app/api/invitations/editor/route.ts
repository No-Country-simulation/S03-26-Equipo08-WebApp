import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, members, organizations } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { sendEditorWelcomeEmail } from "@/lib/mail";

// POST /api/invitations/editor — Invite a new editor
export async function POST(request: NextRequest) {
  try {
    // Verify the requester is an admin
    const session = await auth.api.getSession({ headers: await headers() });
    const userRole = (session?.user as { role?: string } | undefined)?.role;
    if (!session || userRole !== "owner") {
      return NextResponse.json({ error: "No autorizado. Solo owners pueden invitar editores." }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, organizationId, sendNotification } = body;

    if (!name || !email || !organizationId) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: name, email, organizationId" },
        { status: 400 }
      );
    }

    // Fetch organization name
    const [organization] = await db.select().from(organizations).where(eq(organizations.id, organizationId)).limit(1);
    const orgName = organization?.name || "Testimonial Hub";

    // Check if email is already registered
    const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser) {
      return NextResponse.json(
        { error: "Ya existe un usuario con ese email." },
        { status: 409 }
      );
    }

    // Generate a temporary password
    const tempPassword = `TH-${randomUUID().slice(0, 8)}`;

    // Create user via Better Auth API (handles password hashing)
    const newUser = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password: tempPassword,
      },
    });

    if (!newUser || !newUser.user) {
      return NextResponse.json({ error: "Error al crear el usuario." }, { status: 500 });
    }

    const userId = newUser.user.id;

    // Set mustChangePassword = true and role = editor
    await db.update(users).set({
      mustChangePassword: true,
      role: "editor",
    }).where(eq(users.id, userId));

    // Create member in organization
    await db.insert(members).values({
      id: randomUUID(),
      organizationId,
      userId,
      role: "member",
    });

    // Build the login link
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const loginLink = `${appUrl}/login`;

    // Build WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `¡Hola ${name}! 👋 Has sido invitado como Editor en Testimonial Hub.\n\n` +
      `📧 Tu email: ${email}\n🔑 Tu contraseña temporal: ${tempPassword}\n\n` +
      `Ingresa aquí para comenzar: ${loginLink}\n\n` +
      `⚠️ Recuerda cambiar tu contraseña al ingresar por primera vez.`
    );

    // Send email if requested
    if (sendNotification) {
      await sendEditorWelcomeEmail({
        to: email,
        name,
        tempPassword,
        loginLink,
        organizationName: orgName,
      });
    }

    return NextResponse.json({
      data: {
        userId,
        name,
        email,
        tempPassword,
        loginLink,
        whatsappUrl: `https://wa.me/?text=${whatsappMessage}`,
        message: `Editor "${name}" creado exitosamente. Comparte las credenciales por el canal que prefieras.`,
      },
    }, { status: 201 });

  } catch (error) {
    console.error("❌ Error inviting editor:", error);
    return NextResponse.json({ error: "Error al invitar editor." }, { status: 500 });
  }
}
