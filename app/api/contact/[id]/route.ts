import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Contact from '@/models/Contact';
import { authMiddleware } from '@/middleware/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authMiddleware(request);
  if (authResult instanceof NextResponse) return authResult;

  const { id } = await params;

  try {
    await connectDB();
    const contact = await Contact.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    return NextResponse.json(contact);
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
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Contact deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
