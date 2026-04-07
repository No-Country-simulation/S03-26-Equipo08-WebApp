"use server";

import { db } from "@/lib/db";
import { testimonials, organizations, categories } from "@/lib/db/schema";
import { uploadImage } from "@/lib/cloudinary";
import { randomUUID } from "crypto";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, type SQL } from "drizzle-orm";
import { decrypt } from "@/lib/encryption";

export async function createTestimonialAction(formData: {
  visitorName: string;
  visitorRole: string;
  visitorCompany: string;
  content: string;
  rating: number;
  tags: string[];
  mediaUrl: string;
  mediaType: "video" | "image" | "text";
  status: "pending" | "approved" | "rejected";
  imageFile?: string; // base64 string
  categoryId?: string;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.session.activeOrganizationId) {
      throw new Error("No estás autorizado o no tienes una organización activa.");
    }

    const organizationId = session.session.activeOrganizationId;

    // Obtener configuración de la organización
    const org = await db.query.organizations.findFirst({
      where: eq(organizations.id, organizationId)
    });

    const metadata = org?.metadata ? JSON.parse(org.metadata) : {};
    
    // Desencriptamos las credenciales antes de usarlas para la subida
    const cloudinaryConfig = metadata.cloudinary ? {
      cloud_name: decrypt(metadata.cloudinary.cloud_name),
      api_key: decrypt(metadata.cloudinary.api_key),
      api_secret: decrypt(metadata.cloudinary.api_secret),
    } : undefined;

    let visitorImage = formData.mediaUrl && formData.mediaType === 'image' ? formData.mediaUrl : null;

    // Si se subió un archivo, lo subimos a Cloudinary
    if (formData.imageFile) {
      const uploadedUrl = await uploadImage(
        formData.imageFile, 
        `testimonials/${organizationId}`,
        cloudinaryConfig // Ahora van desencriptadas para el SDK
      );
      visitorImage = uploadedUrl;
    }

    const id = randomUUID();
    const now = new Date();

    const [created] = await db.insert(testimonials).values({
      id,
      organizationId,
      categoryId: formData.categoryId || null,
      visitorName: formData.visitorName,
      visitorRole: formData.visitorRole,
      visitorCompany: formData.visitorCompany || null,
      visitorImage: visitorImage,
      content: formData.content,
      mediaUrl: formData.mediaUrl || null,
      mediaType: formData.mediaType,
      rating: formData.rating,
      tags: JSON.stringify(formData.tags),
      status: formData.status,
      source: "manual",
      createdAt: now,
      updatedAt: now,
    }).returning();

    return { success: true, data: created };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error en createTestimonialAction:", error);
      return { success: false, error: error.message || "Error desconocido al crear el testimonio" };
    }
    return { success: false, error: "Error desconocido al crear el testimonio" };
  }
}

export async function getPendingTestimonialsAction() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.session.activeOrganizationId) throw new Error("No autorizado");

    // Traemos solo los pendientes de la organización actual
    const data = await db.query.testimonials.findMany({
      where: (testimonials, { and, eq }) => and(
        eq(testimonials.organizationId, session.session.activeOrganizationId!),
        eq(testimonials.status, "pending")
      ),
      orderBy: (testimonials, { desc }) => [desc(testimonials.createdAt)]
    });

    return { success: true, data };
  } catch {
    return { success: false, error: "Error de carga" };
  }
}

export async function updateTestimonialStatusAction(id: string, status: "approved" | "rejected") {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.session.activeOrganizationId) throw new Error("No autorizado");

    // 🛡️ Seguridad: Solo el Owner puede moderar
    const member = await db.query.members.findFirst({
      where: (members, { and, eq }) => and(
        eq(members.userId, session.user.id),
        eq(members.organizationId, session.session.activeOrganizationId!)
      )
    });

    if (!member || member.role !== "owner") {
      throw new Error("Solo el propietario puede moderar testimonios");
    }

    await db.update(testimonials)
      .set({ status, updatedAt: new Date() })
      .where(eq(testimonials.id, id));

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Error al actualizar estado" };
  }
}

export async function getAllTestimonialsAction(filters?: { 
  status?: string, 
  search?: string 
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.session.activeOrganizationId) throw new Error("No autorizado");

    const orgId = session.session.activeOrganizationId;

    const data = await db.query.testimonials.findMany({
      where: (t, { and, eq, or, ilike }) => {
        const ops: unknown[] = [eq(t.organizationId, orgId)];
        
        if (filters?.status && filters.status !== "Todos los estados") {
          const statusMap: Record<string, string> = { "Aprobado": "approved", "Pendiente": "pending", "Rechazado": "rejected" };
          const dbStatus = statusMap[filters.status] || filters.status;
          ops.push(eq(t.status, dbStatus as "pending" | "approved" | "rejected" | "archived"));
        }

        if (filters?.search) {
          ops.push(or(
            ilike(t.visitorName, `%${filters.search}%`),
            ilike(t.content, `%${filters.search}%`),
            ilike(t.visitorCompany, `%${filters.search}%`)
          ));
        }

        return and(...(ops as SQL[]));
      },
      with: {
        category: true // Traemos la relación de categoría
      },
      orderBy: (t, { desc }) => [desc(t.createdAt)]
    });

    return { success: true, data: data.map(item => ({
       ...item,
       createdAt: item.createdAt.toISOString(),
       categoryName: (item as { category?: { name: string } }).category?.name || "Sin categoría"
    })) };
  } catch (error) {
    console.error("❌ Error en getAllTestimonialsAction:", error);
    return { success: false, error: "Error al cargar testimonios" };
  }
}

export async function seedMockTestimonialsAction() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.session.activeOrganizationId) throw new Error("No autorizado");

    const orgId = session.session.activeOrganizationId;

    // 1. Asegurar categorías base
    const baseNames = ["Producto", "Evento", "Cliente", "Industria"];
    const categoryMap: Record<string, string> = {};

    for (const name of baseNames) {
      let cat = await db.query.categories.findFirst({
        where: (c, { and, eq }) => and(eq(c.name, name), eq(c.organizationId, orgId))
      });

      if (!cat) {
        const [newCat] = await db.insert(categories).values({
          name,
          organizationId: orgId,
        }).returning();
        cat = newCat;
      }
      categoryMap[name] = cat.id;
    }

    // 2. Datos Mock Mapeados
    const mocks: Array<{
      name: string; role: string; company: string; rating: number;
      status: "pending" | "approved" | "rejected";
      content: string; image: string; category: string; tags: string[];
    }> = [
      { 
        name: "María González", role: "CEO", company: "TechStart Solutions", rating: 5, status: "approved",
        content: "Este producto transformó completamente nuestra manera de trabajar. La eficiencia aumentó un 300% y nuestro equipo está más feliz que nunca.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria", category: "Producto",
        tags: ["eficiencia", "transformación digital"]
      },
      { 
        name: "Carlos Mendoza", role: "Director de Operaciones", company: "Global Retail Corp", rating: 5, status: "approved",
        content: "Participar en el evento anual fue una experiencia increíble. Las conexiones que hice y el conocimiento que adquirí son invaluables.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos", category: "Evento",
        tags: ["networking", "aprendizaje"]
      },
      { 
        name: "Ana Rodríguez", role: "Gerente de Marketing", company: "Creative Agency Plus", rating: 4, status: "pending",
        content: "Llevamos usando la plataforma por 6 meses y los resultados hablan por sí solos. Nuestras campañas tienen mejor ROI.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana", category: "Producto",
        tags: ["marketing", "ROI"]
      },
      { 
        name: "Roberto Sánchez", role: "Fundador", company: "EcoSolutions Ltd", rating: 5, status: "pending",
        content: "La conferencia superó todas mis expectativas. Los speakers fueron de primer nivel y la organización impecable.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto", category: "Evento",
        tags: ["Innovación"]
      },
      { 
        name: "Laura Fernández", role: "VP de Tecnología", company: "FinTech Innovations", rating: 5, status: "approved",
        content: "Excelente servicio al cliente y un producto que realmente resuelve problemas reales. La integración fue sencilla.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura", category: "Producto",
        tags: ["soporte", "integración"]
      },
      { 
        name: "Diego Torres", role: "CTO", company: "DataDriven Co", rating: 3, status: "rejected",
        content: "No estoy seguro si este producto es adecuado para nosotros. Algunos features faltan.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego", category: "Producto",
        tags: ["feedback", "mejoras"]
      }
    ];

    // 3. Inserción Masiva
    const now = new Date();
    for (const m of mocks) {
      await db.insert(testimonials).values({
        id: randomUUID(),
        organizationId: orgId,
        visitorName: m.name,
        visitorRole: m.role,
        visitorCompany: m.company,
        visitorImage: m.image,
        content: m.content,
        rating: m.rating,
        status: m.status,
        categoryId: categoryMap[m.category] || null,
        tags: JSON.stringify(m.tags),
        mediaType: "text",
        source: "manual",
        createdAt: now,
        updatedAt: now
      });
    }

    return { success: true, count: mocks.length };
  } catch (error) {
    console.error("❌ Error seeding testimonials:", error);
    return { success: false, error: "Error al sembrar datos" };
  }
}
