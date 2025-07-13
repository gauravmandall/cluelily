# Platform-Specific Release Fixes

## Problem
GitHub releases were not showing platform-specific packages (Mac, Windows, Linux) with clear architecture distinctions.

## Changes Made

### 1. Updated `electron-builder.yml`
- **Windows**: Added explicit target architectures (x64, ia32) for both NSIS and portable builds
- **macOS**: Added explicit target architectures (x64, arm64) for both DMG and ZIP builds
- **Linux**: Added explicit target architectures (x64, arm64) for AppImage, Snap, and Deb builds
- **Artifact Naming**: Updated all artifact names to include platform and architecture:
  - Windows: `cluelily-1.0.7-win-x64-setup.exe`, `cluelily-1.0.7-win-ia32-setup.exe`
  - macOS: `cluelily-1.0.7-mac-x64.dmg`, `cluelily-1.0.7-mac-arm64.dmg`
  - Linux: `cluelily-1.0.7-linux-x64.AppImage`, `cluelily-1.0.7-linux-arm64.AppImage`

### 2. Updated `.github/workflows/publish.yml`
- **Added Linux builds**: Extended matrix to include `ubuntu-latest`
- **Enhanced macOS builds**: Updated to build both x64 and arm64 architectures
- **Fixed notarization**: Added separate notarization steps for both macOS architectures
- **Better error handling**: Maintained retry logic for all platform builds

### 3. Expected Release Structure
After the next release, GitHub releases will show:

#### Windows
- `cluelily-1.0.7-win-x64-setup.exe` (64-bit installer)
- `cluelily-1.0.7-win-ia32-setup.exe` (32-bit installer)
- `cluelily-1.0.7-win-x64-portable.exe` (64-bit portable)
- `cluelily-1.0.7-win-ia32-portable.exe` (32-bit portable)

#### macOS
- `cluelily-1.0.7-mac-x64.dmg` (Intel Mac)
- `cluelily-1.0.7-mac-arm64.dmg` (Apple Silicon Mac)
- `cluelily-1.0.7-mac-x64.zip` (Intel Mac zip)
- `cluelily-1.0.7-mac-arm64.zip` (Apple Silicon Mac zip)

#### Linux
- `cluelily-1.0.7-linux-x64.AppImage` (64-bit AppImage)
- `cluelily-1.0.7-linux-arm64.AppImage` (ARM64 AppImage)
- `cluelily-1.0.7-linux-x64.snap` (64-bit Snap)
- `cluelily-1.0.7-linux-arm64.snap` (ARM64 Snap)
- `cluelily-1.0.7-linux-x64.deb` (64-bit Debian)
- `cluelily-1.0.7-linux-arm64.deb` (ARM64 Debian)

## Testing
1. Run `./test-build.sh` to test local builds
2. Create a new tag and push to trigger the workflow
3. Check the GitHub releases page for platform-specific artifacts

## Build Commands Fixed ✅
The following build commands are now working correctly:
- `pnpm run build:mac` - Builds for macOS (both Intel and Apple Silicon)
- `pnpm run build:win` - Builds for Windows (both x64 and ia32)
- `pnpm run build:linux` - Builds for Linux (x64 and arm64)

## Issue Resolution
The main configuration issue was:
- **Fixed**: `zip` configuration was incorrectly placed as a separate section instead of being controlled by the `artifactName` in the `mac` section
- **Fixed**: Added proper `artifactName` to the `mac` section to control both DMG and ZIP naming

## Next Steps
1. Update version in `package.json` if needed
2. Create and push a new tag: `git tag v1.0.8 && git push origin v1.0.8`
3. Monitor the GitHub Actions workflow
4. Verify artifacts appear correctly in the release

## Build Status
✅ macOS builds working
✅ Windows builds working
✅ Linux builds working (with minor dependency warnings)
