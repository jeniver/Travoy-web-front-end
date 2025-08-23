# S3 Deployment Script for SPA
# Make sure you have AWS CLI configured with appropriate credentials

param(
    [Parameter(Mandatory=$true)]
    [string]$BucketName,
    
    [string]$Region = "ap-south-1"
)

Write-Host "🚀 Starting S3 deployment for bucket: $BucketName" -ForegroundColor Green

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Create S3 bucket if it doesn't exist
Write-Host "🪣 Creating S3 bucket if it doesn't exist..." -ForegroundColor Yellow
aws s3api create-bucket --bucket $BucketName --region $Region --create-bucket-configuration LocationConstraint=$Region 2>$null

# Configure bucket for static website hosting
Write-Host "🌐 Configuring bucket for static website hosting..." -ForegroundColor Yellow
aws s3api put-bucket-website --bucket $BucketName --website-configuration file://s3-website-config.json

# Apply bucket policy for public read access
Write-Host "🔓 Applying bucket policy..." -ForegroundColor Yellow
$policy = Get-Content s3-bucket-policy.json -Raw | ForEach-Object { $_ -replace "YOUR_BUCKET_NAME", $BucketName }
$policy | aws s3api put-bucket-policy --bucket $BucketName --policy stdin

# Sync all files except index.html (to set proper cache headers)
Write-Host "📤 Syncing assets with cache headers..." -ForegroundColor Yellow
aws s3 sync dist s3://$BucketName/ --delete --cache-control 'public, max-age=31536000, immutable' --exclude index.html

# Upload index.html with no-cache headers
Write-Host "📄 Uploading index.html..." -ForegroundColor Yellow
aws s3 cp dist/index.html s3://$BucketName/index.html --cache-control 'no-cache, no-store, must-revalidate' --content-type 'text/html'

# Upload service worker and manifest with no-cache headers
Write-Host "🔧 Uploading service worker and manifest..." -ForegroundColor Yellow
aws s3 cp dist/sw.js s3://$BucketName/sw.js --cache-control 'no-cache' --content-type 'application/javascript'
aws s3 cp dist/manifest.webmanifest s3://$BucketName/manifest.webmanifest --cache-control 'no-cache' --content-type 'application/manifest+json'

# Get the website endpoint
$websiteUrl = aws s3api get-bucket-website --bucket $BucketName --query 'Website.Endpoint' --output text

Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
Write-Host "🌐 Your website is available at: http://$websiteUrl" -ForegroundColor Cyan
Write-Host "📝 Remember to configure CloudFront for HTTPS and better performance" -ForegroundColor Yellow
