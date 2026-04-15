import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials, organizations, categories } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

// GET /api/public/testimonials — Public endpoint for approved + featured testimonials
// Query params: slug (org slug) OR organizationId, categoryId (optional), limit (optional)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const organizationId = searchParams.get("organizationId");
    const categoryId = searchParams.get("categoryId");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Need either slug or organizationId
    let orgId = organizationId;

    if (slug && !orgId) {
      const [org] = await db.select().from(organizations).where(eq(organizations.slug, slug)).limit(1);
      if (!org) {
        return NextResponse.json({ error: "Organización no encontrada." }, { status: 404 });
      }
      orgId = org.id;
    }

    if (!orgId) {
      return NextResponse.json(
        { error: "Se requiere 'slug' o 'organizationId' como parámetro." },
        { status: 400 }
      );
    }

    // Build conditions: approved + featured + org
    const conditions = [
      eq(testimonials.organizationId, orgId),
      eq(testimonials.status, "approved"),
      eq(testimonials.isFeatured, true),
    ];

    if (categoryId) {
      conditions.push(eq(testimonials.categoryId, categoryId));
    }

    const data = await db.select({
      id: testimonials.id,
      visitorName: testimonials.visitorName,
      visitorRole: testimonials.visitorRole,
      visitorCompany: testimonials.visitorCompany,
      visitorImage: testimonials.visitorImage,
      content: testimonials.content,
      mediaUrl: testimonials.mediaUrl,
      mediaType: testimonials.mediaType,
      rating: testimonials.rating,
      tags: testimonials.tags,
      createdAt: testimonials.createdAt,
    })
    .from(testimonials)
    .where(and(...conditions))
    .orderBy(desc(testimonials.createdAt))
    .limit(limit);

    // Also fetch available categories for this org (for filtering)
    const orgCategories = await db.select({
      id: categories.id,
      name: categories.name,
    }).from(categories).where(eq(categories.organizationId, orgId));

    // Parse tags from JSON strings
    const parsed = data.map(t => ({
      ...t,
      tags: t.tags ? JSON.parse(t.tags) : [],
    }));

    // CORS headers for embed usage
    const response = NextResponse.json({
      data: parsed,
      categories: orgCategories,
      total: parsed.length,
    });

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("❌ Error fetching public testimonials:", error);
    return NextResponse.json({ error: "Error fetching testimonials" }, { status: 500 });
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
