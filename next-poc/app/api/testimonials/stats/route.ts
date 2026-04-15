import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

// GET /api/testimonials/stats — Dashboard stats
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get("organizationId");

    const baseCondition = organizationId ? eq(testimonials.organizationId, organizationId) : undefined;

    const [total, approved, pending, rejected] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(testimonials).where(baseCondition),
      db.select({ count: sql<number>`count(*)` }).from(testimonials).where(
        baseCondition
          ? sql`${testimonials.organizationId} = ${organizationId} AND ${testimonials.status} = 'approved'`
          : eq(testimonials.status, "approved")
      ),
      db.select({ count: sql<number>`count(*)` }).from(testimonials).where(
        baseCondition
          ? sql`${testimonials.organizationId} = ${organizationId} AND ${testimonials.status} = 'pending'`
          : eq(testimonials.status, "pending")
      ),
      db.select({ count: sql<number>`count(*)` }).from(testimonials).where(
        baseCondition
          ? sql`${testimonials.organizationId} = ${organizationId} AND ${testimonials.status} = 'rejected'`
          : eq(testimonials.status, "rejected")
      ),
    ]);

    return NextResponse.json({
      data: {
        total: Number(total[0].count),
        approved: Number(approved[0].count),
        pending: Number(pending[0].count),
        rejected: Number(rejected[0].count),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching stats:", error);
    return NextResponse.json({ error: "Error fetching stats" }, { status: 500 });
  }
}
