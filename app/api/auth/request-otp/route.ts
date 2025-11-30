import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Admin from '@/models/Admin';
import OTP from '@/models/OTP';
import { sendOTPEmail } from '@/utils/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectDB();

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete any existing OTPs for this email
    await OTP.deleteMany({ email: email.toLowerCase() });

    // Create new OTP
    await OTP.create({
      email: email.toLowerCase(),
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    // Send OTP via email
    await sendOTPEmail(email, otp);

    return NextResponse.json({
      message: 'OTP sent successfully',
      success: true
    });
  } catch (error: any) {
    console.error('Request OTP error:', error);
    return NextResponse.json({
      error: 'Failed to send OTP',
      details: error.message
    }, { status: 500 });
  }
}
