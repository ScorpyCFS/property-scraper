#!/bin/bash
set -e  # Exit immediately if anything fails

echo "🏗️ Custom build script running"

echo "📦 Installing dependencies..."
npm install

echo "🧠 Installing Puppeteer Chromium..."
npx puppeteer browsers install chrome

echo "✅ Build script completed — exiting now"
exit 0
