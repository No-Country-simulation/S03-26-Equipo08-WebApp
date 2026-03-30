import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { visitorAccessTokens } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";

// GET /api/invitations/visitor/validate?token=xxx — Validate a visitor token
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token es requerido." }, { status: 400 });
    }

    const [tokenRecord] = await db.select().from(visitorAccessTokens).where(
      and(
        eq(visitorAccessTokens.token, token),
        eq(visitorAccessTokens.used, false),
        gt(visitorAccessTokens.expiresAt, new Date()),
      )
    ).limit(1);

    if (!tokenRecord) {
      return NextResponse.json({
        valid: false,
        error: "Token inválido, expirado o ya utilizado.",
      }, { status: 404 });
    }

    return NextResponse.json({
      valid: true,
      data: {
        visitorName: tokenRecord.visitorName,
        visitorEmail: tokenRecord.visitorEmail,
        organizationId: tokenRecord.organizationId,
        expiresAt: tokenRecord.expiresAt,
      },
    });
  } catch (error) {
    console.error("❌ Error validating token:", error);
    return NextResponse.json({ error: "Error al validar token." }, { status: 500 });
  }
}

// POST /api/invitations/visitor/validate — Mark token as used after form submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: "Token es requerido." }, { status: 400 });
    }

    const [tokenRecord] = await db.select().from(visitorAccessTokens).where(
      and(
        eq(visitorAccessTokens.token, token),
        eq(visitorAccessTokens.used, false),
        gt(visitorAccessTokens.expiresAt, new Date()),
      )
    ).limit(1);

    if (!tokenRecord) {
      return NextResponse.json({
        error: "Token inválido, expirado o ya utilizado.",
      }, { status: 404 });
    }

    // Mark as used
    await db.update(visitorAccessTokens).set({ used: true }).where(
      eq(visitorAccessTokens.token, token)
    );

    return NextResponse.json({
      message: "Token invalidado exitosamente.",
      organizationId: tokenRecord.organizationId,
    });
  } catch (error) {
    console.error("❌ Error invalidating token:", error);
    return NextResponse.json({ error: "Error al invalidar token." }, { status: 500 });
  }
}
