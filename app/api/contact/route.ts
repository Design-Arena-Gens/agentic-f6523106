import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Contact from '@/models/Contact';
import { authMiddleware } from '@/middleware/auth';

export async function GET(request: NextRequest) {
  const authResult = await authMiddleware(request);
  if (authResult instanceof NextResponse) return authResult;

  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectDB();
    const contact = await Contact.create(body);
    return NextResponse.json(contact, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
