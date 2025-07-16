#!/bin/bash
echo "🏗️ Custom build script running"

echo "📦 Installing dependencies..."
npm install

echo "🧠 Installing Puppeteer Chromium..."
npx puppeteer install

echo "✅ Build script completed"
