
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

// GET - получить все закладки пользователя
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: user.id },
      include: {
        course: true,
        video: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - добавить закладку
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { courseId, videoId } = body;

    if (!courseId && !videoId) {
      return NextResponse.json({ error: 'Either courseId or videoId is required' }, { status: 400 });
    }

    // Проверить, не существует ли уже закладка
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId: user.id,
        ...(courseId && { courseId }),
        ...(videoId && { videoId }),
      },
    });

    if (existingBookmark) {
      return NextResponse.json({ error: 'Bookmark already exists' }, { status: 400 });
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        userId: user.id,
        ...(courseId && { courseId }),
        ...(videoId && { videoId }),
      },
      include: {
        course: true,
        video: true,
      },
    });

    return NextResponse.json(bookmark, { status: 201 });
  } catch (error) {
    console.error('Error creating bookmark:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - удалить закладку
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const bookmarkId = searchParams.get('id');
    const courseId = searchParams.get('courseId');
    const videoId = searchParams.get('videoId');

    if (!bookmarkId && !courseId && !videoId) {
      return NextResponse.json({ error: 'id, courseId, or videoId is required' }, { status: 400 });
    }

    if (bookmarkId) {
      await prisma.bookmark.delete({
        where: { 
          id: bookmarkId,
          userId: user.id,
        },
      });
    } else {
      await prisma.bookmark.deleteMany({
        where: {
          userId: user.id,
          ...(courseId && { courseId }),
          ...(videoId && { videoId }),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
