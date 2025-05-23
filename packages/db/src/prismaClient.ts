// Declare a global variable for PrismaClient in development to prevent

import { PrismaClient } from "../generated/prisma/client";

// creating new instances on hot reloads.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaClient: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prismaClient = new PrismaClient();
} else {
  // Use the global variable in development
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prismaClient = global.prisma;
}

export { prismaClient };
