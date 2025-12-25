import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { email: "asc" },
  });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { email, name } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "Email required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: { email, name },
    });
    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 409 }
    );
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "ID required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: { id },
    data,
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID required" },
      { status: 400 }
    );
  }

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
