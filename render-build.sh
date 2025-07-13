#!/bin/bash
echo "🏗️ Custom build script running"

# Fix Puppeteer missing Chromium
npm install
npx puppeteer install
