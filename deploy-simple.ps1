# Simple S3 Deployment Script
param(
    [string]$BucketName = "travoywebfrontend",
    [string]$Region = "ap-south-1"
)

Write-Host "🚀 Starting deployment to bucket: $BucketName" -ForegroundColor Green

# Check if AWS CLI is available
try {
    $awsVersion = aws --version 2>$null
    if ($awsVersion) {
        Write-Host "✅ AWS CLI found: $awsVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ AWS CLI not found. Please restart your terminal or install AWS CLI." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ AWS CLI not found. Please restart your terminal or install AWS CLI." -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Configure bucket for static website hosting
Write-Host "🌐 Configuring bucket for static website hosting..." -ForegroundColor Yellow
aws s3api put-bucket-website --bucket $BucketName --website-configuration file://s3-website-config.json

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Website hosting configured!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Website hosting configuration failed. You may need to configure this manually." -ForegroundColor Yellow
}

# Apply bucket policy
Write-Host "🔓 Applying bucket policy..." -ForegroundColor Yellow
aws s3api put-bucket-policy --bucket $BucketName --policy file://s3-bucket-policy.json

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Bucket policy applied!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Bucket policy application failed. You may need to configure this manually." -ForegroundColor Yellow
}

# Upload all files
Write-Host "📤 Uploading files to S3..." -ForegroundColor Yellow
aws s3 sync dist s3://$BucketName/ --delete

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Files uploaded successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ File upload failed!" -ForegroundColor Red
    exit 1
}

# Get website endpoint
Write-Host "🌐 Getting website endpoint..." -ForegroundColor Yellow
$websiteUrl = aws s3api get-bucket-website --bucket $BucketName --query 'Website.Endpoint' --output text 2>$null

if ($websiteUrl) {
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host "🌐 Your website is available at: http://$websiteUrl" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  Deployment completed, but couldn't get website URL." -ForegroundColor Yellow
    Write-Host "🌐 Check your S3 bucket properties for the website endpoint." -ForegroundColor Cyan
}

Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Visit your website URL" -ForegroundColor White
Write-Host "   2. Test navigation between routes" -ForegroundColor White
Write-Host "   3. Check browser console for any errors" -ForegroundColor White
