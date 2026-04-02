import { db } from "@/lib/db";
import { users, accounts, members, invitations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) return NextResponse.json({ error: "Falta email" }, { status: 400 });

  try {
    const user = await db.query.users.findFirst({
        where: eq(users.email, email)
    });

    if (user) {
        // Borrarlo de todas las tablas relacionadas
        await db.delete(members).where(eq(members.userId, user.id));
        await db.delete(accounts).where(eq(accounts.userId, user.id));
        await db.delete(invitations).where(eq(invitations.email, email));
        await db.delete(users).where(eq(users.id, user.id));
        
        return NextResponse.json({ success: true, message: `✅ Usuario '${email}' eliminado por completo.` });
    }

    return NextResponse.json({ success: false, message: "❌ El usuario no existe en la BD." });

  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
