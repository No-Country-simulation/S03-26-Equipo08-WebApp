import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, members } from "@/lib/db/schema";
import { sendEditorWelcomeEmail } from "@/lib/mail";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * Genera una contraseña temporal segura
 */
function generateTempPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let password = "Hub-";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export async function POST(req: Request) {
  try {
    const { email, name, organizationId, organizationName } = await req.json();
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 1. Generar contraseña temporal
    const tempPassword = generateTempPassword();

    // 2. Verificar si el usuario ya existe
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      // 2. Crear el usuario usando la API oficial pero CON HEADERS VACÍOS
      // Esto evita que Better Auth pueda setear cookies en la respuesta real
      // y así NO te deslogueas como Owner.
      const serverAuth = auth as unknown;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (serverAuth as any).api.signUpEmail({
        body: {
          email: email.toLowerCase(),
          password: tempPassword,
          name,
        },
        headers: new Headers() // <--- EL TRUCO: No tiene acceso a tus cookies
      });

      // Recuperamos el ID del usuario recién creado
      const newUser = await db.query.users.findFirst({
        where: eq(users.email, email.toLowerCase())
      });

      if (newUser) {
          // 2d. ¡VINCULARLO A LA AGENCIA YA MISMO! (Tabla 'member')
          await db.insert(members).values({
            id: crypto.randomUUID(),
            userId: newUser.id,
            organizationId: organizationId,
            role: "member", 
            createdAt: new Date(),
          });

          // Marcar que debe cambiar clave
          await db.update(users)
            .set({ mustChangePassword: true, role: 'editor' })
            .where(eq(users.id, newUser.id));
      }
      
      console.log(`✅ Editor registrado y vinculado sin afectar sesión actual: ${email}`);
    }

    // 3. Omitimos inviteMember de Better Auth porque YA lo hemos vinculado 
    // manualmente arriba en la tabla 'member'. Así evitamos errores de API.
    
    // 4. Enviar el email personalizado con el link a la página EXTERNA de configuración
    const loginLink = `${process.env.NEXT_PUBLIC_APP_URL}/invitacion/configurar?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;
    
    await sendEditorWelcomeEmail({
      to: email,
      name,
      tempPassword,
      loginLink,
      organizationName,
    });

    return NextResponse.json({ 
        success: true, 
        tempPassword // Por si queremos mostrarla en pantalla también como respaldo
    });

  } catch (err: unknown) {
    console.error("Error en invitación de editor:", err);
    return NextResponse.json({ error: "Error al procesar la invitación" }, { status: 500 });
  }
}
