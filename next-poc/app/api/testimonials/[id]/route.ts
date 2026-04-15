import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/testimonials/[id] — Get testimonial detail
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({ data: testimonial });
  } catch (error) {
    console.error("❌ Error fetching testimonial:", error);
    return NextResponse.json({ error: "Error fetching testimonial" }, { status: 500 });
  }
}

// PATCH /api/testimonials/[id] — Update testimonial (approve, reject, edit)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Verify testimonial exists
    const [existing] = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date() };

    // Only update fields that were sent
    const allowedFields = [
      "visitorName", "visitorRole", "visitorCompany", "visitorImage",
      "content", "mediaUrl", "mediaType", "rating", "tags",
      "status", "isFeatured", "categoryId",
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === "tags" && Array.isArray(body[field])) {
          updateData[field] = JSON.stringify(body[field]);
        } else {
          updateData[field] = body[field];
        }
      }
    }

    const [updated] = await db.update(testimonials).set(updateData).where(eq(testimonials.id, id)).returning();

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("❌ Error updating testimonial:", error);
    return NextResponse.json({ error: "Error updating testimonial" }, { status: 500 });
  }
}

// DELETE /api/testimonials/[id] — Delete testimonial
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const [existing] = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    await db.delete(testimonials).where(eq(testimonials.id, id));

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting testimonial:", error);
    return NextResponse.json({ error: "Error deleting testimonial" }, { status: 500 });
  }
}
