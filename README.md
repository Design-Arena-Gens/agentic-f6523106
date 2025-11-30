# AI Portfolio - Modern Full-Stack Portfolio with Admin Dashboard

A high-performance, AI-themed portfolio website built with Next.js 14, TypeScript, and MongoDB featuring a fully functional admin dashboard with OTP authentication.

## Features

### Frontend
- Cyberpunk/AI-themed design with glassmorphism effects
- Smooth animations with Framer Motion
- Responsive design optimized for all devices
- Neon accents (cyan, purple, blue) with glowing effects
- Interactive sections: Hero, Projects, Skills, Contact

### Admin Dashboard
- Custom OTP authentication via email (no NextAuth)
- JWT-based session management with HttpOnly cookies
- Full CRUD operations for:
  - Projects management
  - Skills management
  - Contact messages inbox
- Real-time data updates
- Secure API routes with middleware protection

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Animations**: Framer Motion
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Custom OTP system with JWT
- **Email**: Nodemailer
- **Icons**: Lucide React
- **Notifications**: Sonner toasts
- **Media**: Cloudinary integration ready

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or cloud)
- Email service credentials (Gmail, etc.)

### Installation

1. Clone and install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key-change-in-production
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Seed the database:
```bash
npm run seed
```
This creates:
- Admin user: `admin@portfolio.com` / `admin123`
- Sample projects
- Sample skills

4. Start development server:
```bash
npm run dev
```

Visit http://localhost:3000

### Admin Access
1. Navigate to `/admin/login`
2. Enter admin email
3. Receive 6-digit OTP via email
4. Enter OTP to access dashboard

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── projects/     # Projects CRUD
│   │   ├── skills/       # Skills CRUD
│   │   └── contact/      # Contact messages
│   ├── admin/            # Admin dashboard pages
│   │   ├── login/
│   │   └── dashboard/
│   └── page.tsx          # Main portfolio page
├── components/           # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── models/              # Mongoose schemas
│   ├── Admin.ts
│   ├── OTP.ts
│   ├── Project.ts
│   ├── Skill.ts
│   └── Contact.ts
├── lib/                 # Utilities
│   ├── db.ts           # MongoDB connection
│   └── cn.ts           # Class name utility
├── middleware/          # Auth middleware
├── utils/              # Helper functions
│   ├── jwt.ts
│   └── email.ts
└── scripts/
    └── seed.ts         # Database seeding
```

## API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get all skills
- `POST /api/contact` - Submit contact form

### Authentication
- `POST /api/auth/request-otp` - Request OTP
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/check` - Check auth status

### Protected Endpoints (Admin only)
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- `POST /api/skills` - Create skill
- `PUT /api/skills/[id]` - Update skill
- `DELETE /api/skills/[id]` - Delete skill
- `GET /api/contact` - Get all messages
- `PATCH /api/contact/[id]` - Mark message as read
- `DELETE /api/contact/[id]` - Delete message

## Deployment

### Vercel (Recommended)
```bash
vercel deploy --prod
```

### AWS Amplify
1. Connect your Git repository
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Add environment variables
4. Deploy

## Security Features
- JWT tokens stored in HttpOnly Secure cookies
- OTP expires after 10 minutes
- MongoDB TTL index for auto-cleanup of expired OTPs
- Protected API routes with middleware
- Input validation with Zod (ready to integrate)
- CORS and security headers configured

## Customization

### Theme Colors
Edit `app/globals.css`:
```css
:root {
  --neon-cyan: #00ffff;
  --neon-purple: #b026ff;
  --neon-blue: #0080ff;
}
```

### Email Templates
Customize in `utils/email.ts`

### Admin User
Create additional admins via MongoDB or extend the seed script

## License
MIT

## Support
For issues and questions, please open a GitHub issue.
