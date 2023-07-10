import { PrismaClient } from "@prisma/client";

// It's best practice to assign PrismaClient in Place then export it anywhere

declare global {
  var prisma: PrismaClient | undefined;
}

// V.I.P

// Next.js hot reloading may create alot of instances of PrismaClient

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
