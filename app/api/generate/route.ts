import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { url, shorturl }: { url: string; shorturl: string } = await request.json();
  try {
    if (url && shorturl) {
      const data = await prisma.link.findFirst({
        where: {
          shortCode: shorturl,
        },
        select: {
          url: true,
          createdAt: true,
          id: true,
        },
      });
      if (data) {
        return NextResponse.json(
          {
            message: "Shorturl already exists for this url",
            url: data.url,
            Created: data.createdAt,
          },
          { status: 400 }
        );
      } else {
        const urlData = await prisma.link.create({
          data: {
            url: url,
            shortCode: shorturl,
          },
          select: {
            shortCode: true,
            createdAt: true,
          },
        });
        return NextResponse.json(
          {
            message: "Shorturl created successfully",
            Shorturl: urlData.shortCode,
            Created: urlData.createdAt,
          },
          { status: 200 }
        );
      }
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
  return NextResponse.json({ message: "Error creating shorturl" }, { status: 500 });
}
