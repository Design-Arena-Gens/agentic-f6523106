# Deployment Guide

## Build Successful ✓

The Next.js application has been successfully built and is ready for deployment.

## Deploy to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI if not already installed:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy to production:
```bash
vercel deploy --prod
```

### Option 2: Using Vercel Dashboard

1. Visit [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Secret key for JWT tokens
   - `EMAIL_HOST` - SMTP host (e.g., smtp.gmail.com)
   - `EMAIL_PORT` - SMTP port (e.g., 587)
   - `EMAIL_USER` - Email address for sending OTPs
   - `EMAIL_PASSWORD` - Email password or app password
   - `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
   - `CLOUDINARY_API_KEY` - Cloudinary API key
   - `CLOUDINARY_API_SECRET` - Cloudinary API secret
5. Click "Deploy"

## Environment Variables Required

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## Post-Deployment Steps

1. **Set up MongoDB Atlas** (if using cloud MongoDB):
   - Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Whitelist Vercel's IP addresses or use `0.0.0.0/0` for all IPs
   - Get connection string and add to environment variables

2. **Configure Email**:
   - For Gmail, create an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Use the App Password as `EMAIL_PASSWORD`

3. **Seed Database**:
   ```bash
   npm run seed
   ```
   This creates:
   - Admin user: admin@portfolio.com / admin123
   - Sample projects
   - Sample skills

4. **Test Admin Login**:
   - Visit `/admin/login`
   - Enter admin email
   - Check email for OTP
   - Login to dashboard

## Alternative Deployment Platforms

### AWS Amplify

1. Connect Git repository
2. Build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Add environment variables
4. Deploy

### Netlify

1. Install Netlify plugin for Next.js:
```bash
npm install -D @netlify/plugin-nextjs
```

2. Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

3. Deploy via Netlify CLI or dashboard

### Docker

Build and run with Docker:

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env.local portfolio
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure IP whitelist includes your deployment platform
- Check connection string format
- Verify username/password are URL-encoded

### Email Not Sending
- Verify SMTP credentials
- Check firewall/security settings
- For Gmail, ensure "Less secure app access" is enabled or use App Password

### Build Failures
- Check all environment variables are set
- Ensure Node.js version is 18+
- Clear `.next` folder and rebuild

## Monitoring

After deployment:
- Test all pages load correctly
- Verify API endpoints respond
- Check admin login flow
- Test contact form submission
- Monitor logs for errors

## Security Checklist

- ✓ JWT tokens in HttpOnly cookies
- ✓ OTP expiration (10 minutes)
- ✓ Protected admin routes
- ✓ Environment variables secured
- ✓ CORS configured
- ⚠️ Update JWT_SECRET in production
- ⚠️ Use strong MongoDB password
- ⚠️ Enable MongoDB IP whitelist

## Production URL

After deployment, your site will be available at:
- Vercel: `https://agentic-f6523106.vercel.app` (or custom domain)
- AWS Amplify: Auto-generated URL or custom domain
- Netlify: Auto-generated URL or custom domain

## Need Help?

- Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- MongoDB Atlas docs: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
