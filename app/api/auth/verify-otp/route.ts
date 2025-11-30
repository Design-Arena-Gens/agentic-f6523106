import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Admin from '@/models/Admin';
import OTP from '@/models/OTP';
import { signToken } from '@/utils/jwt';

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    await connectDB();

    // Find OTP
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      otp,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
    }

    // Find admin
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    // Delete used OTP
    await OTP.deleteMany({ email: email.toLowerCase() });

    // Generate JWT token
    const token = signToken({
      id: admin._id,
      email: admin.email,
      name: admin.name,
    });

    // Set cookie
    const response = NextResponse.json({
      message: 'Login successful',
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({
      error: 'Failed to verify OTP',
      details: error.message
    }, { status: 500 });
  }
}
