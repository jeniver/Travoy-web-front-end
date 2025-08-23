# S3 Deployment Guide - Fixing 404 Errors

## Problem
You're getting a 404 error for JavaScript assets when deploying your React app to S3:
```
http://travoywebfrontend.s3-website.ap-south-1.amazonaws.com/assets/index-C3IlRYw9.js net::ERR_ABORTED 404 (Not Found)
```

## Root Cause
This happens because S3 static website hosting doesn't handle client-side routing properly. When someone visits a route like `/about`, S3 looks for a file at that path instead of serving your `index.html` file.

## Solutions

### Solution 1: Configure S3 Bucket for SPA (Recommended)

1. **Use the PowerShell deployment script:**
   ```powershell
   .\deploy-s3.ps1 -BucketName "your-bucket-name"
   ```

2. **Or manually configure:**
   - Set bucket policy for public read access
   - Configure static website hosting with error document = `index.html`
   - This ensures all routes serve your main HTML file

### Solution 2: Use Relative Paths (Alternative)

1. **Update Vite config** (already done):
   - Changed `base: '/'` to `base: './'`
   - Updated PWA paths to relative

2. **Rebuild and redeploy:**
   ```bash
   npm run build
   # Then deploy to S3
   ```

## Manual S3 Configuration Steps

### 1. Create Bucket Policy
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
    ]
}
```

### 2. Configure Website Hosting
- Index document: `index.html`
- Error document: `index.html` (This is the key!)

### 3. Set CORS (if needed)
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

## Testing Your Fix

1. **Deploy using the script:**
   ```powershell
   .\deploy-s3.ps1 -BucketName "travoywebfrontend"
   ```

2. **Test the website:**
   - Visit the root URL
   - Navigate to different routes
   - Check browser console for 404 errors

3. **Verify assets load:**
   - All JavaScript files should load without 404 errors
   - Client-side routing should work properly

## Additional Recommendations

### Use CloudFront
- Provides HTTPS
- Better performance
- Global CDN distribution

### Set Proper Cache Headers
- Static assets: `max-age=31536000, immutable`
- HTML files: `no-cache, no-store, must-revalidate`
- Service workers: `no-cache`

### Monitor Performance
- Use browser dev tools to check asset loading
- Monitor CloudWatch metrics if using CloudFront

## Troubleshooting

### Still getting 404s?
1. Check bucket policy allows public read
2. Verify error document is set to `index.html`
3. Ensure all files are uploaded to S3
4. Check file permissions

### Assets not loading?
1. Verify asset paths in built HTML
2. Check if assets exist in S3 bucket
3. Ensure proper content-type headers

### Routing not working?
1. Confirm error document is `index.html`
2. Test with different routes
3. Check browser console for errors
