
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    console.log('🌱 Добавление новых пользователей...');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const surgeonPassword = await bcrypt.hash('surgeon123', 10);
    const studentPassword = await bcrypt.hash('student123', 10);

    const results = [];

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
      results.push('✅ Администратор создан: admin@ssvnauka.com / admin123');
    } else {
      // Обновляем пароль существующего пользователя
      await prisma.user.update({
        where: { email: 'admin@ssvnauka.com' },
        data: { password: adminPassword }
      });
      results.push('✅ Пароль администратора обновлен: admin@ssvnauka.com / admin123');
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
      results.push('✅ Хирург создан: surgeon@hospital.com / surgeon123');
    } else {
      await prisma.user.update({
        where: { email: 'surgeon@hospital.com' },
        data: { password: surgeonPassword }
      });
      results.push('✅ Пароль хирурга обновлен: surgeon@hospital.com / surgeon123');
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
      results.push('✅ Студент создан: student@meduni.com / student123');
    } else {
      await prisma.user.update({
        where: { email: 'student@meduni.com' },
        data: { password: studentPassword }
      });
      results.push('✅ Пароль студента обновлен: student@meduni.com / student123');
    }

    return NextResponse.json({ 
      success: true,
      message: '🎉 Пользователи успешно созданы/обновлены!',
      results 
    });

  } catch (error) {
    console.error('❌ Ошибка:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Неизвестная ошибка' 
    }, { status: 500 });
  }
}
