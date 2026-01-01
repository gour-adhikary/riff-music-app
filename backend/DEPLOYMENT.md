# Deploying Riff Backend to Koyeb

This guide explains how to deploy the Spring Boot backend to Koyeb.

## Prerequisites

1. **Koyeb Account**: Sign up at [koyeb.com](https://www.koyeb.com/)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Docker**: The Dockerfile is already configured

## Deployment Steps

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add Dockerfile for Koyeb deployment"
   git push origin main
   ```

2. **Create a new app on Koyeb**:
   - Go to [Koyeb Dashboard](https://app.koyeb.com/)
   - Click "Create App"
   - Select "GitHub" as the deployment method
   - Connect your GitHub account and select your repository
   - Select the `backend` directory as the build context

3. **Configure the deployment**:
   - **Builder**: Docker
   - **Dockerfile path**: `backend/Dockerfile`
   - **Port**: 8080
   - **Instance type**: Choose based on your needs (Free tier available)
   - **Region**: Select closest to your users

4. **Environment Variables** (if needed):
   - Click "Advanced" → "Environment variables"
   - Add any custom variables (currently none required for H2 database)

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build and deployment to complete (~3-5 minutes)

### Option 2: Deploy from Docker Hub

1. **Build and push Docker image**:
   ```bash
   cd backend
   docker build -t yourusername/riff-backend:latest .
   docker push yourusername/riff-backend:latest
   ```

2. **Deploy on Koyeb**:
   - Select "Docker" as deployment method
   - Enter your Docker image: `yourusername/riff-backend:latest`
   - Configure port: 8080
   - Deploy

## Post-Deployment

### Get your backend URL
After deployment, Koyeb will provide a URL like:
```
https://your-app-name.koyeb.app
```

### Update Frontend Configuration
Update your frontend to use the deployed backend URL:

**File**: `frontend/src/services/songService.js`
```javascript
const API_BASE_URL = 'https://your-app-name.koyeb.app/api';
```

### Test the Deployment
Visit these URLs to verify:
- Health check: `https://your-app-name.koyeb.app/actuator/health`
- API endpoint: `https://your-app-name.koyeb.app/api/songs`

## Important Notes

### Database Persistence
⚠️ **Current Setup**: Using H2 in-memory database
- Data will be lost on restart
- For production, consider:
  - PostgreSQL (Koyeb offers managed databases)
  - MySQL
  - MongoDB

### CORS Configuration
The backend is configured to allow requests from:
- `http://localhost:5173` (local development)
- `http://localhost:3000` (alternative local port)

**For production**, update `application.properties`:
```properties
spring.web.cors.allowed-origins=https://your-frontend-domain.com,http://localhost:5173
```

### Scaling
- Koyeb auto-scales based on traffic
- Free tier: 1 instance, limited resources
- Paid tiers: Multiple instances, more resources

## Troubleshooting

### Build Fails
- Check Dockerfile syntax
- Ensure `pom.xml` is valid
- Check Koyeb build logs

### App Crashes
- Check application logs in Koyeb dashboard
- Verify port 8080 is exposed
- Check Java version compatibility (requires Java 17)

### CORS Errors
- Update `allowed-origins` in `application.properties`
- Redeploy after changes

## Local Docker Testing

Test the Docker image locally before deploying:

```bash
# Build the image
cd backend
docker build -t riff-backend .

# Run the container
docker run -p 8080:8080 riff-backend

# Test the API
curl http://localhost:8080/api/songs
```

## Resources

- [Koyeb Documentation](https://www.koyeb.com/docs)
- [Koyeb Docker Deployment Guide](https://www.koyeb.com/docs/deploy/docker)
- [Spring Boot Docker Guide](https://spring.io/guides/topicals/spring-boot-docker)
