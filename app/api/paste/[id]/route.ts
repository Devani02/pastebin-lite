export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // ✅ Extract ID from URL instead of params
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "Paste ID missing" },
        { status: 400 }
      );
    }

    const paste = await prisma.paste.findUnique({
      where: { id },
    });

    if (!paste || paste.isExpired) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const now = new Date();

    const expiredByTime =
      paste.expiresAt !== null && paste.expiresAt < now;

    const expiredByViews =
      paste.maxViews !== null &&
      paste.currentViews >= paste.maxViews;

    if (expiredByTime || expiredByViews) {
      await prisma.paste.update({
        where: { id },
        data: { isExpired: true },
      });

      return NextResponse.json({ error: "Expired" }, { status: 404 });
    }

    const updatedPaste = await prisma.paste.update({
      where: { id },
      data: {
        currentViews: { increment: 1 },
      },
    });

    return NextResponse.json({
      content: updatedPaste.content,
      views: updatedPaste.currentViews,
    });
  } catch (error) {
    console.error("GET /api/paste/[id] failed:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
