import nodemailer from "nodemailer";

/**
 * Configuración del transporte SMTP con las credenciales de Gmail
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Contraseña de aplicación
  },
  // SEGURIDAD: Permite conexiones SMTP que tengan certificados auto-firmados
  // Esto solventa el error "self-signed certificate in certificate chain"
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * Función para enviar el email de verificación
 */
export async function sendVerificationEmail(to: string, url: string) {
  const mailOptions = {
    from: `"Testimonial Hub" <${process.env.SMTP_USER}>`,
    to,
    subject: "Verifica tu cuenta - Testimonial Hub",
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #6366f1;">¡Bienvenido a Testimonial Hub!</h2>
        <p>Gracias por unirte a nuestra plataforma. Para completar tu registro de seguridad, por favor haz clic en el botón de abajo para verificar tu correo:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" style="display: inline-block; padding: 14px 28px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);">
            Verificar mi Cuenta
          </a>
        </div>
        <p style="margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 20px;">
          Si no creaste esta cuenta, puedes ignorar este correo tranquilamente.<br>
          El enlace expira en breve.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de verificación enviado a: ${to}`);
  } catch (error) {
    console.error("❌ Error enviando email de verificación:", error);
    throw error;
  }
}
/**
 * Función para enviar el email de restablecimiento de contraseña
 */
export async function sendPasswordResetEmail(to: string, url: string) {
  const mailOptions = {
    from: `"Testimonial Hub" <${process.env.SMTP_USER}>`,
    to,
    subject: "Restablece tu contraseña - Testimonial Hub",
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #6366f1;">Restablecer tu contraseña</h2>
        <p>Has solicitado restablecer tu contraseña en Testimonial Hub. Si no fuiste tú, puedes ignorar este correo.</p>
        <p>Para elegir una nueva contraseña, por favor haz clic en el botón de abajo:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" style="display: inline-block; padding: 14px 28px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);">
            Restablecer Contraseña
          </a>
        </div>
        <p style="margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 20px;">
          Este enlace expirará en 1 hora por seguridad.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de reset enviado a: ${to}`);
  } catch (error) {
    console.error("❌ Error enviando email de reset:", error);
    throw error;
  }
}

/**
 * Función para enviar el email de invitación a una organización
 */
interface InvitationEmailParams {
  to: string;
  organizationName: string;
  inviterName: string;
  role: string;
  inviteUrl: string;
}

export async function sendInvitationEmail({ to, organizationName, inviterName, role, inviteUrl }: InvitationEmailParams) {
  const roleLabels: Record<string, string> = {
    owner: "Propietario",
    admin: "Administrador",
    member: "Editor",
  };
  const roleLabel = roleLabels[role] || role;

  const mailOptions = {
    from: `"Testimonial Hub" <${process.env.SMTP_USER}>`,
    to,
    subject: `Te han invitado a ${organizationName} - Testimonial Hub`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">¡Has sido invitado!</h2>
        <p><strong>${inviterName}</strong> te ha invitado a unirte a <strong>${organizationName}</strong> como <strong>${roleLabel}</strong> en Testimonial Hub.</p>
        <p>Testimonial Hub es la plataforma más elegante para gestionar testimonios de clientes. Acepta la invitación para comenzar a colaborar:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${inviteUrl}" style="display: inline-block; padding: 14px 28px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);">
            Aceptar Invitación
          </a>
        </div>
        <div style="margin-top: 20px; padding: 16px; background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 13px; color: #6b7280;"><strong>Organización:</strong> ${organizationName}</p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #6b7280;"><strong>Rol asignado:</strong> ${roleLabel}</p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #6b7280;"><strong>Invitado por:</strong> ${inviterName}</p>
        </div>
        <p style="margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 20px;">
          Esta invitación expira en 7 días. Si no esperabas esta invitación, puedes ignorar este correo.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de invitación enviado a: ${to}`);
  } catch (error) {
    console.error("❌ Error enviando email de invitación:", error);
    throw error;
  }
}
