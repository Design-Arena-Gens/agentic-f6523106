import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    admin: {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    },
  });
}
