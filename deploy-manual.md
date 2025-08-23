# Manual S3 Deployment Guide (No AWS CLI Required)

## Step 1: Build Your Project
```bash
npm run build
```

## Step 2: Configure S3 Bucket via AWS Console

### 2.1 Create/Configure Bucket
1. Go to [AWS S3 Console](https://console.aws.amazon.com/s3/)
2. Select your bucket: `travoywebfrontend`
3. Go to **Properties** tab
4. Scroll down to **Static website hosting**
5. Click **Edit**
6. Configure as follows:
   - **Static website hosting**: Enable
   - **Hosting type**: Host a static website
   - **Index document**: `index.html`
   - **Error document**: `index.html` ⭐ **This is crucial!**
7. Click **Save changes**

### 2.2 Set Bucket Policy
1. Go to **Permissions** tab
2. Click **Bucket policy**
3. Click **Edit**
4. Paste this policy (replace `travoywebfrontend` with your actual bucket name):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::travoywebfrontend/*"
        }
    ]
}
```
5. Click **Save changes**

### 2.3 Block Public Access Settings
1. In **Permissions** tab, click **Block public access (bucket settings)**
2. Click **Edit**
3. **Uncheck** all boxes (allow public access)
4. Click **Save changes**
5. Type `confirm` and click **Confirm**

## Step 3: Upload Files

### 3.1 Upload All Assets
1. Go to **Objects** tab
2. Click **Upload**
3. Click **Add files**
4. Select **ALL files** from your `dist` folder
5. Click **Upload**

### 3.2 Set Cache Headers (Important!)
After uploading, you need to set proper cache headers:

1. Select all files in the bucket
2. Click **Actions** → **Edit metadata**
3. Add custom metadata:
   - **Key**: `Cache-Control`
   - **Value**: `public, max-age=31536000, immutable`

4. For `index.html`, `sw.js`, and `manifest.webmanifest`:
   - **Key**: `Cache-Control`
   - **Value**: `no-cache, no-store, must-revalidate`

## Step 4: Test Your Website

1. Go to **Properties** → **Static website hosting**
2. Copy the **Bucket website endpoint** URL
3. Visit the URL in your browser
4. Test navigation between routes
5. Check browser console for 404 errors

## Expected Result
- ✅ JavaScript assets load without 404 errors
- ✅ Client-side routing works properly
- ✅ All routes serve your React app

## Troubleshooting

### Still getting 404s?
- Verify error document is set to `index.html`
- Check bucket policy allows public read
- Ensure all files are uploaded

### Assets not loading?
- Check file paths in browser dev tools
- Verify files exist in S3 bucket
- Check bucket permissions

### Need to update?
- Just upload new files to S3
- Files with same names will be replaced
- Consider using CloudFront for better performance
