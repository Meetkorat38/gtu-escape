// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma || new PrismaClient({
      log: ['query', 'info', 'warn', 'error'], // ✅ Enables SQL logging
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma