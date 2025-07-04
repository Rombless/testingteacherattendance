#!/bin/bash

# Teacher Attendance System - Deploy Script
# This script builds and deploys the app to GitHub Pages

echo "🚀 Starting deployment of Teacher Attendance System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Built files are ready in the dist/ directory"
    echo ""
    echo "🌐 To deploy to GitHub Pages:"
    echo "   1. Push all files to your GitHub repository"
    echo "   2. Go to repository Settings → Pages"
    echo "   3. Select 'Deploy from a branch'"
    echo "   4. Choose 'main' branch and '/ (root)' folder"
    echo "   5. Your app will be live at: https://yourusername.github.io/your-repo-name"
    echo ""
    echo "🎉 Deployment preparation complete!"
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi
