import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PATCH /api/categories/[id] — Update category name
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const [existing] = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const [updated] = await db.update(categories).set({
      name: body.name || existing.name,
    }).where(eq(categories.id, id)).returning();

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("❌ Error updating category:", error);
    return NextResponse.json({ error: "Error updating category" }, { status: 500 });
  }
}

// DELETE /api/categories/[id] — Delete category
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const [existing] = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    await db.delete(categories).where(eq(categories.id, id));

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting category:", error);
    return NextResponse.json({ error: "Error deleting category" }, { status: 500 });
  }
}
