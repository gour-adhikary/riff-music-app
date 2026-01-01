# Deploying Riff Frontend to Vercel

This guide explains how to deploy the React frontend to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com/)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Koyeb Backend URL**: Your deployed backend URL (e.g., `https://your-app.koyeb.app`)

## Quick Deployment Steps

### 1. Update Environment Variables

**Important**: Replace `your-koyeb-app-name` with your actual Koyeb app name in:

**File**: `frontend/.env.production`
```env
VITE_API_BASE_URL=https://your-actual-koyeb-app.koyeb.app/api
```

### 2. Update Backend CORS

The backend has been configured to allow requests from Vercel domains (`https://*.vercel.app`).

After you get your Vercel URL, you can optionally update `backend/src/main/resources/application.properties` to be more specific:
```properties
spring.web.cors.allowed-origins=http://localhost:5173,https://your-app.vercel.app
```

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"

2. **Import from GitHub**:
   - Connect your GitHub account
   - Select your `riff-music-app` repository
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add variable:
     - **Name**: `VITE_API_BASE_URL`
     - **Value**: `https://your-koyeb-app.koyeb.app/api`
   - Click "Add"

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (~2-3 minutes)

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? riff-music-app
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add VITE_API_BASE_URL production
# Enter: https://your-koyeb-app.koyeb.app/api

# Deploy to production
vercel --prod
```

## Post-Deployment

### Get Your Frontend URL
After deployment, Vercel will provide a URL like:
```
https://riff-music-app.vercel.app
```

### Test the Deployment
1. Visit your Vercel URL
2. Check if songs load from the backend
3. Test playing a song
4. Verify all player controls work

### Update Backend CORS (Optional)
For better security, update the backend to allow only your specific Vercel domain:

**File**: `backend/src/main/resources/application.properties`
```properties
spring.web.cors.allowed-origins=http://localhost:5173,https://riff-music-app.vercel.app
```

Then redeploy the backend on Koyeb.

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:
- **Push to `main`**: Deploys to production
- **Push to other branches**: Creates preview deployments

## Environment Variables

### Development (Local)
Uses `http://localhost:8080/api` automatically

### Production (Vercel)
Uses `VITE_API_BASE_URL` environment variable

To update:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Update `VITE_API_BASE_URL`
5. Redeploy

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `riff.yourdomain.com`)
3. Follow DNS configuration instructions
4. Update backend CORS to include your custom domain

## Troubleshooting

### Songs Not Loading
- Check browser console for CORS errors
- Verify `VITE_API_BASE_URL` is set correctly
- Ensure backend CORS allows your Vercel domain
- Check if backend is running on Koyeb

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure `npm run build` works locally

### 404 on Refresh
- Already handled by `vercel.json` rewrites
- If issue persists, check `vercel.json` is in `frontend/` directory

## Files Created

- `frontend/vercel.json` - Vercel configuration
- `frontend/.env.production` - Production environment variables
- `frontend/VERCEL_DEPLOYMENT.md` - This guide

## Summary

1. ✅ Update `.env.production` with your Koyeb URL
2. ✅ Deploy to Vercel via dashboard or CLI
3. ✅ Add `VITE_API_BASE_URL` environment variable
4. ✅ Test the deployment
5. ✅ (Optional) Update backend CORS with specific Vercel URL

Your app is now live! 🎉
