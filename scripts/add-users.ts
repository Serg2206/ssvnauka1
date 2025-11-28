
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Добавление новых пользователей...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const surgeonPassword = await bcrypt.hash('surgeon123', 10);
  const studentPassword = await bcrypt.hash('student123', 10);

  // Проверяем и создаем админа
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@ssvnauka.com' }
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: 'admin@ssvnauka.com',
        password: adminPassword,
        name: 'Администратор Системы',
        role: "ADMIN",
      },
    });
    console.log('✅ Администратор создан: admin@ssvnauka.com / admin123');
  } else {
    console.log('ℹ️  Администратор уже существует');
  }

  // Проверяем и создаем хирурга
  const existingSurgeon = await prisma.user.findUnique({
    where: { email: 'surgeon@hospital.com' }
  });

  if (!existingSurgeon) {
    await prisma.user.create({
      data: {
        email: 'surgeon@hospital.com',
        password: surgeonPassword,
        name: 'Хирург-практик',
        role: "SURGEON",
      },
    });
    console.log('✅ Хирург создан: surgeon@hospital.com / surgeon123');
  } else {
    console.log('ℹ️  Хирург уже существует');
  }

  // Проверяем и создаем студента
  const existingStudent = await prisma.user.findUnique({
    where: { email: 'student@meduni.com' }
  });

  if (!existingStudent) {
    await prisma.user.create({
      data: {
        email: 'student@meduni.com',
        password: studentPassword,
        name: 'Студент-медик',
        role: "STUDENT",
      },
    });
    console.log('✅ Студент создан: student@meduni.com / student123');
  } else {
    console.log('ℹ️  Студент уже существует');
  }

  console.log('\n🎉 Готово!');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
