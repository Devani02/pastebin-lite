export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, expiresInSeconds, maxViews } = body;

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    let expiresAt: Date | null = null;

    if (expiresInSeconds) {
      expiresAt = new Date(Date.now() + expiresInSeconds * 1000);
    }

    const paste = await prisma.paste.create({
      data: {
        content,
        expiresAt,
        maxViews,
      },
    });

    return NextResponse.json(
      {
        id: paste.id,
        url: `/p/${paste.id}`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
