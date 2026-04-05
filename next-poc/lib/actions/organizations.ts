"use server";

import { db } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { encrypt, decrypt } from "@/lib/encryption";

export async function updateOrganizationConfigAction(data: {
  cloudinaryCloudName?: string;
  cloudinaryApiKey?: string;
  cloudinaryApiSecret?: string;
  name?: string;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.session.activeOrganizationId) {
      throw new Error("No estás autorizado o no tienes una organización activa.");
    }

    const organizationId = session.session.activeOrganizationId;

    // 🛡️ Seguridad Server-side: Verificar rol en la DB
    const member = await db.query.members.findFirst({
      where: (members, { and, eq }) => and(
        eq(members.userId, session.user.id),
        eq(members.organizationId, organizationId)
      )
    });

    if (!member || member.role !== "owner") {
      throw new Error("No tienes permisos suficientes (Owner requerido)");
    }

    // Traer metadata actual
    const currentOrg = await db.query.organizations.findFirst({
      where: eq(organizations.id, organizationId)
    });

    if (!currentOrg) throw new Error("Organización no encontrada.");

    const metadata = currentOrg.metadata ? JSON.parse(currentOrg.metadata) : {};

    // Ciframos los datos sensibles antes de guardarlos
    if (data.cloudinaryCloudName || data.cloudinaryApiKey || data.cloudinaryApiSecret) {
       metadata.cloudinary = {
         ...(metadata.cloudinary || {}),
         cloud_name: data.cloudinaryCloudName ? encrypt(data.cloudinaryCloudName) : metadata.cloudinary?.cloud_name,
         api_key: data.cloudinaryApiKey ? encrypt(data.cloudinaryApiKey) : metadata.cloudinary?.api_key,
         api_secret: data.cloudinaryApiSecret ? encrypt(data.cloudinaryApiSecret) : metadata.cloudinary?.api_secret,
       };
    }

    await db.update(organizations)
      .set({
        name: data.name || currentOrg.name,
        metadata: JSON.stringify(metadata),
      })
      .where(eq(organizations.id, organizationId));

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error en updateOrganizationConfigAction:", error);
      return { success: false, error: error.message };
    }
    return { success: false, error: "Ocurrió un error inesperado." };
  }
}

export async function getOrganizationConfigAction() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.session.activeOrganizationId) {
      throw new Error("No estás autorizado.");
    }

    const organizationId = session.session.activeOrganizationId;

    // 🛡️ Seguridad Server-side: Solo el owner puede ver las llaves
    const member = await db.query.members.findFirst({
      where: (members, { and, eq }) => and(
        eq(members.userId, session.user.id),
        eq(members.organizationId, organizationId)
      )
    });

    if (!member || member.role !== "owner") {
      throw new Error("No autorizado");
    }

    const org = await db.query.organizations.findFirst({
      where: eq(organizations.id, organizationId)
    });

    if (!org) return { success: false, error: "No org" };

    const metadata = org.metadata ? JSON.parse(org.metadata) : {};
    
    // Desencriptamos para la UI (solo el owner las ve)
    return { 
      success: true, 
      data: {
        name: org.name,
        cloudinaryCloudName: metadata.cloudinary?.cloud_name ? decrypt(metadata.cloudinary.cloud_name) : "",
        cloudinaryApiKey: metadata.cloudinary?.api_key ? decrypt(metadata.cloudinary.api_key) : "",
        cloudinaryApiSecret: metadata.cloudinary?.api_secret ? decrypt(metadata.cloudinary.api_secret) : "",
        hasApiSecret: !!metadata.cloudinary?.api_secret
      } 
    };
  } catch {
    return { success: false, error: "Error de carga" };
  }
}
