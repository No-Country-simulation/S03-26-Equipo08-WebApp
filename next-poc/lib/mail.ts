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
