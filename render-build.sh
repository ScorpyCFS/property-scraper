#!/bin/bash
echo "🏗️ Skipping Puppeteer Chromium install"
PUPPETEER_SKIP_DOWNLOAD=true npm install

echo "📦 Installing dependencies..."
npm install

echo "🧠 Installing Puppeteer Chromium..."
npx puppeteer install

echo "✅ Build script completed"
