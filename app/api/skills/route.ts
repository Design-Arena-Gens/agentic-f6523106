import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Skill from '@/models/Skill';
import { authMiddleware } from '@/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    return NextResponse.json(skills);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResult = await authMiddleware(request);
  if (authResult instanceof NextResponse) return authResult;

  try {
    const body = await request.json();
    await connectDB();
    const skill = await Skill.create(body);
    return NextResponse.json(skill, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
