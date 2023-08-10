import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const checkUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (checkUser) {
    return NextResponse.json({
      error: "This email address is already registered",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
