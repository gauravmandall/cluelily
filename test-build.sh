#!/bin/bash

echo "Testing Electron Builder Configuration..."

# Test builds locally without publishing
echo "Building for macOS (current platform)..."
pnpm run build:mac --publish=never

echo "Building for Windows (cross-platform)..."
pnpm run build:win --publish=never

echo "Build complete! Check the dist/ folder for platform-specific artifacts."
echo "Expected artifacts:"
echo "macOS:"
echo "- cluelily-1.0.7-mac-x64.dmg"
echo "- cluelily-1.0.7-mac-arm64.dmg"
echo "- cluelily-1.0.7-mac-x64.zip"
echo "- cluelily-1.0.7-mac-arm64.zip"
echo "Windows:"
echo "- cluelily-1.0.7-win-x64-setup.exe"
echo "- cluelily-1.0.7-win-ia32-setup.exe"
echo "- cluelily-1.0.7-win-x64-portable.exe"
echo "- cluelily-1.0.7-win-ia32-portable.exe"

echo ""
echo "Listing actual platform-specific artifacts:"
ls -la dist/ | grep -E '\.(dmg|zip|exe|AppImage|snap|deb)$'
