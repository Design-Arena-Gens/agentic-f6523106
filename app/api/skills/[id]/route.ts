import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Skill from '@/models/Skill';
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
    const skill = await Skill.findByIdAndUpdate(id, body, { new: true });
    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }
    return NextResponse.json(skill);
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
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Skill deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
