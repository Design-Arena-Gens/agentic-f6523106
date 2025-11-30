import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { authMiddleware } from '@/middleware/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authMiddleware(request);
  if (authResult instanceof NextResponse) return authResult;

  const { id } = await params;

  try {
    const body = await request.json();
    await connectDB();
    const project = await Project.findByIdAndUpdate(id, body, { new: true });
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authMiddleware(request);
  if (authResult instanceof NextResponse) return authResult;

  const { id } = await params;

  try {
    await connectDB();
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
