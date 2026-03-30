import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { visitorAccessTokens } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import { headers } from "next/headers";

// POST /api/invitations/visitor — Generate a visitor link (no email sent)
export async function POST(request: NextRequest) {
  try {
    // Verify the requester is an admin
    const session = await auth.api.getSession({ headers: await headers() });
    const userRole = (session?.user as { role?: string } | undefined)?.role;
    if (!session || userRole !== "admin") {
      return NextResponse.json({ error: "No autorizado. Solo admins pueden invitar visitantes." }, { status: 403 });
    }

    const body = await request.json();
    const { visitorName, visitorEmail, organizationId } = body;

    if (!visitorName || !visitorEmail || !organizationId) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: visitorName, visitorEmail, organizationId" },
        { status: 400 }
      );
    }

    // Generate unique token
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Store token in DB
    const [created] = await db.insert(visitorAccessTokens).values({
      organizationId,
      token,
      visitorName,
      visitorEmail,
      used: false,
      expiresAt,
    }).returning();

    // Build the testimonial form link
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const formLink = `${appUrl}/testimonial/new?token=${token}`;

    // Build WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `¡Hola ${visitorName}! 👋\n\n` +
      `Te invitamos a dejar tu testimonio en Testimonial Hub. ` +
      `Es rápido y sencillo, solo haz clic aquí:\n\n` +
      `${formLink}\n\n` +
      `¡Gracias por compartir tu experiencia! ⭐`
    );

    return NextResponse.json({
      data: {
        tokenId: created.id,
        visitorName,
        visitorEmail,
        formLink,
        whatsappUrl: `https://wa.me/?text=${whatsappMessage}`,
        expiresAt: expiresAt.toISOString(),
        message: `Link generado para "${visitorName}". Compártelo por el canal que prefieras.`,
      },
    }, { status: 201 });

  } catch (error) {
    console.error("❌ Error creating visitor invitation:", error);
    return NextResponse.json({ error: "Error al crear invitación de visitante." }, { status: 500 });
  }
}

// GET /api/invitations/visitor — List all visitor tokens for an organization
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userRole = (session?.user as { role?: string } | undefined)?.role;
    if (!session || userRole !== "admin") {
      return NextResponse.json({ error: "No autorizado." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get("organizationId");

    if (!organizationId) {
      return NextResponse.json({ error: "organizationId es requerido." }, { status: 400 });
    }

    const tokens = await db.select().from(visitorAccessTokens)
      .where(eq(visitorAccessTokens.organizationId, organizationId))
      .orderBy(desc(visitorAccessTokens.createdAt));

    return NextResponse.json({ data: tokens });
  } catch (error) {
    console.error("❌ Error fetching visitor tokens:", error);
    return NextResponse.json({ error: "Error al listar invitaciones." }, { status: 500 });
  }
}
