import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { authMiddleware } from '@/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(projects);
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
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
