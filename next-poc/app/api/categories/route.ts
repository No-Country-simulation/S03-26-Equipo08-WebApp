import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

// GET /api/categories — List categories (optionally filtered by organizationId)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get("organizationId");

    const where = organizationId ? eq(categories.organizationId, organizationId) : undefined;

    const data = await db.select().from(categories).where(where).orderBy(desc(categories.createdAt));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 });
  }
}

// POST /api/categories — Create a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, organizationId } = body;

    if (!name || !organizationId) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: name, organizationId" },
        { status: 400 }
      );
    }

    const [created] = await db.insert(categories).values({
      name,
      organizationId,
    }).returning();

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating category:", error);
    return NextResponse.json({ error: "Error creating category" }, { status: 500 });
  }
}
