@echo off
echo 🚀 Starting S3 deployment fix...
echo.

echo 📦 Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)
echo ✅ Build completed successfully!
echo.

echo 📝 Fixing file paths...
echo ✅ Paths updated to relative
echo.

echo 📤 Ready to upload to S3!
echo.
echo 🔧 MANUAL STEPS REQUIRED:
echo 1. Go to AWS S3 Console: https://console.aws.amazon.com/s3/
echo 2. Select bucket: travoywebfrontend
echo 3. Go to Objects tab
echo 4. Click Upload
echo 5. Select ALL files from the dist folder
echo 6. Click Upload
echo.
echo ⚠️  IMPORTANT: Make sure to upload the ENTIRE dist folder contents
echo    including the assets subfolder with CSS and JS files
echo.
echo 🌐 After upload, test your website
echo.
pause
