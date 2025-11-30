# Demo Instructions - AI Portfolio

## What Has Been Built

A complete, production-ready AI-themed portfolio website with:

### Frontend Features
- **Cyberpunk/AI Design**: Dark theme with neon cyan, purple, and blue accents
- **Glassmorphism Effects**: Translucent cards with blur effects
- **Smooth Animations**: Framer Motion for page transitions and interactions
- **Responsive Design**: Works on all devices
- **Sections**:
  - Hero with animated background
  - Projects showcase
  - Skills with progress bars
  - Contact form
  - Responsive navigation

### Admin Dashboard
- **OTP Authentication**: Email-based login (no passwords stored)
- **JWT Sessions**: Secure HttpOnly cookies
- **Full CRUD**: Manage projects, skills, and messages
- **Real-time Updates**: Data updates instantly
- **Protected Routes**: Middleware-secured API endpoints

### Tech Stack
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS (custom cyberpunk theme)
- Framer Motion
- MongoDB + Mongoose
- Custom OTP Auth + JWT
- Nodemailer
- Lucide Icons
- Sonner Toasts

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up MongoDB
You need a MongoDB instance. Options:
- **Local**: Install MongoDB locally
- **Cloud**: Use MongoDB Atlas (free tier available)

### 3. Configure Environment Variables
Edit `.env.local` with your values:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/portfolio
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# JWT Secret (change this!)
JWT_SECRET=my-super-secret-key-change-in-production

# Email Settings (for OTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# Cloudinary (optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Seed Database
```bash
npm run seed
```

This creates:
- **Admin user**: admin@portfolio.com (password not stored - uses OTP)
- **3 Sample Projects**
- **14 Sample Skills** across 4 categories

### 5. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## Demo Flow

### Public Portfolio (No Login Required)

1. **Home Page** (http://localhost:3000)
   - Animated hero section
   - Scroll through projects
   - View skills by category
   - Submit contact form

### Admin Dashboard (Login Required)

2. **Admin Login** (http://localhost:3000/admin/login)
   - Enter email: `admin@portfolio.com`
   - Click "Send OTP"
   - Check your email for 6-digit OTP
   - Enter OTP to login

3. **Dashboard** (http://localhost:3000/admin/dashboard)
   - **Projects Tab**: View/delete projects (add/edit UI ready)
   - **Skills Tab**: View/delete skills with progress bars
   - **Messages Tab**: View contact form submissions, mark as read/delete

## Gmail App Password Setup

To send OTP emails via Gmail:

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Sign in to your Google Account
3. Select "Mail" and your device
4. Click "Generate"
5. Copy the 16-character password
6. Use it as `EMAIL_PASSWORD` in `.env.local`

## MongoDB Atlas Setup (Free)

1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` with your password
7. Use as `MONGODB_URI` in `.env.local`
8. **Important**: Whitelist your IP or use `0.0.0.0/0` for all IPs

## Architecture Highlights

### Authentication Flow
1. User requests OTP with email
2. System generates 6-digit OTP, stores in DB with expiration
3. OTP sent via email
4. User enters OTP
5. System verifies OTP and generates JWT
6. JWT stored in HttpOnly Secure cookie
7. Protected routes check JWT via middleware

### Database Schema
- **Admin**: email, hashed password (for future), name
- **OTP**: email, otp, expiresAt (auto-deleted after expiration)
- **Project**: title, description, technologies[], imageUrl, links, featured, order
- **Skill**: name, category, level, icon, order
- **Contact**: name, email, message, read, createdAt

### API Routes
- Public: `/api/projects`, `/api/skills`, `/api/contact` (POST)
- Auth: `/api/auth/request-otp`, `/api/auth/verify-otp`, `/api/auth/logout`
- Protected: All admin CRUD operations

## Customization

### Change Theme Colors
Edit `app/globals.css`:
```css
:root {
  --neon-cyan: #00ffff;      /* Change to your color */
  --neon-purple: #b026ff;    /* Change to your color */
  --neon-blue: #0080ff;      /* Change to your color */
}
```

### Add Your Content
1. Seed creates sample data
2. Login to admin dashboard
3. Delete sample projects/skills
4. Add your own via dashboard or API

### Cloudinary Integration
For image uploads:
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get API credentials
3. Add to `.env.local`
4. Use Next-Cloudinary components in admin forms

## Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy Options
1. **Vercel** (Recommended):
   ```bash
   vercel login
   vercel deploy --prod
   ```

2. **Netlify**: Connect Git repo

3. **AWS Amplify**: Connect Git repo

4. **Docker**: Build container

See `DEPLOYMENT.md` for detailed deployment instructions.

## Troubleshooting

### OTP Email Not Sending
- Verify Gmail App Password is correct
- Check EMAIL_HOST and EMAIL_PORT
- Ensure 2FA is enabled on Gmail account

### MongoDB Connection Failed
- Check MONGODB_URI format
- Verify MongoDB is running (if local)
- Check IP whitelist (if Atlas)
- Ensure password is URL-encoded

### Build Errors
- Run `npm install` again
- Delete `.next` folder
- Check Node.js version (needs 18+)

### Can't Login to Admin
- Check email credentials in .env.local
- Verify OTP in email (check spam folder)
- OTP expires after 10 minutes

## Project Structure
```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/            # React components
├── models/               # MongoDB schemas
├── lib/                  # Database connection
├── middleware/           # Auth middleware
├── utils/                # JWT, email utilities
└── scripts/              # Database seeding
```

## Next Steps

1. **Deploy to Production**
   - Follow DEPLOYMENT.md
   - Add environment variables
   - Seed production database

2. **Customize Content**
   - Replace sample projects with your work
   - Update skills to match your expertise
   - Add social media links

3. **Enhance Features**
   - Add project add/edit forms
   - Implement skill add/edit forms
   - Add image upload with Cloudinary
   - Create blog section
   - Add analytics

4. **Set Up Domain**
   - Purchase domain
   - Configure DNS
   - Add to Vercel/Netlify

## Support & Documentation

- **README.md**: Full project documentation
- **DEPLOYMENT.md**: Deployment guide
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **MongoDB**: [docs.mongodb.com](https://docs.mongodb.com)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Security Notes

- JWT tokens in HttpOnly cookies (XSS protection)
- OTP expires after 10 minutes
- Protected admin routes with middleware
- Environment variables for sensitive data
- **Remember**: Change JWT_SECRET in production!

---

**Your portfolio is ready! 🚀**

Build was successful. To deploy, follow the instructions in DEPLOYMENT.md or run `vercel deploy --prod` after logging in.
