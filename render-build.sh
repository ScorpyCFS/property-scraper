#!/bin/bash
set -e  # Exit immediately if any command fails

echo "🏗️ Custom build script running"

echo "📦 Installing dependencies..."
npm install

echo "🧠 Installing Puppeteer Chromium..."
npx puppeteer browsers install chrome

echo "✅ Puppeteer install finished. Build script done."
exit 0
