import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendInvitationEmail } from "@/lib/mail";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const { visitorName, visitorEmail, organizationId, sendEmail: emailEnabled } = await req.json();
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 1. Obtener datos de la organización
    const org = await db.query.organizations.findFirst({
        where: (orgs, { eq }) => eq(orgs.id, organizationId)
    });

    if (!org) {
        return NextResponse.json({ error: "Organización no encontrada" }, { status: 404 });
    }

    // 2. Generar el link público de recolección de testimonios
    // El slug de la organización es clave para tener un link elegante
    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/v/${org.slug}?name=${encodeURIComponent(visitorName)}`;

    // 3. Si se proporcionó email y la opción está activa, mandar invitación formal
    if (visitorEmail && emailEnabled) {
      const serverAuth = auth as unknown;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (serverAuth as any).api.organization.inviteMember({
        body: {
          email: visitorEmail,
          role: "member", // Podríamos definir un rol específico 'storyteller'
          organizationId,
        },
        headers: await headers()
      });
      
      // Enviamos el email usando nuestro sistema personalizado
      await sendInvitationEmail({
          to: visitorEmail,
          organizationName: org.name,
          inviterName: session.user.name,
          role: 'member',
          inviteUrl: inviteLink
      });
    }

    return NextResponse.json({ 
        success: true, 
        data: {
          inviteLink,
          visitorName,
          emailSent: !!(visitorEmail && emailEnabled)
        }
    });

  } catch (error: unknown) {
    console.error("Error en invitación de visitante:", error);
    return NextResponse.json({ error: "Error al generar link de testimonio" }, { status: 500 });
  }
}
