import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, organizations, members } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

// POST /api/register — Register a new owner + create organization
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, companyName } = body;

    // Validate required fields
    if (!name || !email || !password || !companyName) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: name, email, password, companyName" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres." },
        { status: 400 }
      );
    }

    // Check if email already exists
    const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con ese email." },
        { status: 409 }
      );
    }

    // 1. Create user via Better Auth (handles password hashing + session)
    const signUpResult = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    if (!signUpResult || !signUpResult.user) {
      return NextResponse.json({ error: "Error al crear la cuenta." }, { status: 500 });
    }

    const userId = signUpResult.user.id;

    // 2. Set role to "owner" (Better Auth creates with default, we ensure it's owner)
    await db.update(users).set({ role: "owner" }).where(eq(users.id, userId));

    // 3. Generate slug from company name
    const slug = companyName
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-") // Spaces to hyphens
      .replace(/-+/g, "-") // Multiple hyphens to single
      .trim();

    // Check slug uniqueness
    const [existingOrg] = await db.select().from(organizations).where(eq(organizations.slug, slug)).limit(1);
    const finalSlug = existingOrg ? `${slug}-${randomUUID().slice(0, 4)}` : slug;

    // 4. Create organization
    const orgId = randomUUID();
    const now = new Date();

    await db.insert(organizations).values({
      id: orgId,
      name: companyName,
      slug: finalSlug,
      createdAt: now,
    });

    // 5. Create member (owner of the organization)
    await db.insert(members).values({
      id: randomUUID(),
      organizationId: orgId,
      userId,
      role: "owner",
    });

    return NextResponse.json({
      data: {
        userId,
        organizationId: orgId,
        organizationSlug: finalSlug,
        message: `Bienvenido a Testimonial Hub, ${name}. Tu organización "${companyName}" está lista.`,
      },
    }, { status: 201 });

  } catch (error) {
    console.error("❌ Error in registration:", error);
    return NextResponse.json({ error: "Error al registrar la cuenta." }, { status: 500 });
  }
}
