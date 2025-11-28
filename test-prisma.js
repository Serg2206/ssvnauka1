const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Выводим доступные модели
console.log("Доступные модели Prisma:");
console.log(Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$')));
