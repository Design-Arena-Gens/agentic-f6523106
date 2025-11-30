import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendOTPEmail(email: string, otp: string) {
  const mailOptions = {
    from: `"Portfolio Admin" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Admin Login OTP',
    html: `
      <div style="background: #000; color: #fff; padding: 40px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background: rgba(15, 15, 25, 0.9); padding: 30px; border: 1px solid #00ffff; border-radius: 10px;">
          <h1 style="color: #00ffff; text-shadow: 0 0 10px rgba(0, 255, 255, 0.8); text-align: center;">Admin Login OTP</h1>
          <p style="font-size: 16px; margin: 20px 0;">Your one-time password for admin login is:</p>
          <div style="background: #000; border: 2px solid #b026ff; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #00ffff; letter-spacing: 8px;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #aaa; margin-top: 20px;">This OTP will expire in 10 minutes.</p>
          <p style="font-size: 14px; color: #aaa;">If you didn't request this, please ignore this email.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}
