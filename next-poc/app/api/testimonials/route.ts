import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq, sql, desc, and } from "drizzle-orm";
import { randomUUID } from "crypto";

// GET /api/testimonials — List testimonials with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // pending | approved | rejected | archived
    const organizationId = searchParams.get("organizationId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    const conditions = [];
    if (status) conditions.push(eq(testimonials.status, status as "pending" | "approved" | "rejected" | "archived"));
    if (organizationId) conditions.push(eq(testimonials.organizationId, organizationId));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, countResult] = await Promise.all([
      db.select().from(testimonials).where(where).orderBy(desc(testimonials.createdAt)).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(testimonials).where(where),
    ]);

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: Number(countResult[0].count),
        totalPages: Math.ceil(Number(countResult[0].count) / limit),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching testimonials:", error);
    return NextResponse.json({ error: "Error fetching testimonials" }, { status: 500 });
  }
}

// POST /api/testimonials — Create a new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      organizationId,
      categoryId,
      visitorName,
      visitorRole,
      visitorCompany,
      visitorImage,
      content,
      mediaUrl,
      mediaType,
      rating,
      tags,
      source,
    } = body;

    if (!organizationId || !visitorName || !visitorRole || !content) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: organizationId, visitorName, visitorRole, content" },
        { status: 400 }
      );
    }

    const id = randomUUID();
    const now = new Date();

    const [created] = await db.insert(testimonials).values({
      id,
      organizationId,
      categoryId: categoryId || null,
      visitorName,
      visitorRole,
      visitorCompany: visitorCompany || null,
      visitorImage: visitorImage || null,
      content,
      mediaUrl: mediaUrl || null,
      mediaType: mediaType || null,
      rating: rating ?? 5,
      tags: tags ? JSON.stringify(tags) : null,
      source: source || "manual",
      status: "pending",
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    }).returning();

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating testimonial:", error);
    return NextResponse.json({ error: "Error creating testimonial" }, { status: 500 });
  }
}
