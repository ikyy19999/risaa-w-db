// lib/prisma.ts
import { PrismaClient } from "@prisma/client"

// buat instance singleton supaya ga bikin multiple connections
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
