# Building cluelily Without Apple Developer Account

This guide explains how to build and release cluelily without needing an Apple Developer account.

## Current Setup

The GitHub workflow has been configured to handle missing Apple Developer credentials gracefully:

- **Windows builds**: ✅ Work perfectly without any additional setup
- **Linux builds**: ✅ Work perfectly without any additional setup  
- **macOS builds**: ⚠️ Build successfully but apps won't be signed/notarized

## What This Means

### For Windows and Linux Users
- Full functionality with signed/verified installers
- Automatic updates will work
- No security warnings

### For macOS Users
- App builds successfully and works fully
- Users will see a security warning on first launch
- They need to right-click → Open to bypass the warning
- No automatic updates (would require signing)

## How to Release

1. **Update version**:
   ```bash
   npm version patch  # or minor/major
   ```

2. **Create and push tag**:
   ```bash
   git tag v1.0.9
   git push origin v1.0.9
   ```

3. **Monitor the build**:
   - Go to Actions tab: https://github.com/gauravmandall/cluelily/actions
   - The workflow will build for all platforms
   - Mac build may show warnings but will complete
   - Releases will be created automatically

## Build Output

The workflow creates these files:

### Windows
- `cluelily-1.0.8-win-x64-setup.exe` - Installer for 64-bit Windows
- `cluelily-1.0.8-win-ia32-setup.exe` - Installer for 32-bit Windows  
- `cluelily-1.0.8-win-x64-portable.exe` - Portable version (64-bit)
- `cluelily-1.0.8-win-ia32-portable.exe` - Portable version (32-bit)

### Linux
- `cluelily-1.0.8-linux-x64.AppImage` - Universal Linux app
- `cluelily-1.0.8-linux-arm64.AppImage` - ARM64 Linux app
- `cluelily-1.0.8-linux-x64.deb` - Debian package
- `cluelily-1.0.8-linux-arm64.deb` - ARM64 Debian package
- `cluelily-1.0.8-linux-x64.snap` - Snap package
- `cluelily-1.0.8-linux-arm64.snap` - ARM64 Snap package

### macOS (Unsigned)
- `cluelily-1.0.8-mac-x64.dmg` - Intel Mac installer
- `cluelily-1.0.8-mac-arm64.dmg` - Apple Silicon Mac installer
- `cluelily-1.0.8-mac-x64.zip` - Intel Mac zip
- `cluelily-1.0.8-mac-arm64.zip` - Apple Silicon Mac zip

## Testing Locally

You can test builds locally:

```bash
# Build for your current platform
pnpm run build:win     # Windows
pnpm run build:linux   # Linux  
pnpm run build:mac     # macOS

# Test without building installers
pnpm run build:unpack
```

## Future: Adding Apple Developer Account

If you later get an Apple Developer account, you can:

1. Add these GitHub secrets:
   - `APPLE_ID` - Your Apple ID
   - `APPLE_APP_PASSWORD` - App-specific password
   - `APPLE_TEAM_ID` - Your team ID
   - `MAC_CERTIFICATE` - Your certificate (base64 encoded)
   - `MAC_CERTIFICATE_PASSWORD` - Certificate password

2. Update the workflow environment variables to enable signing:
   ```yaml
   CSC_IDENTITY_AUTO_DISCOVERY: true
   SKIP_NOTARIZATION: false
   ```

3. Mac apps will then be signed and notarized automatically.

## Troubleshooting

- **Workflow fails**: Check the Actions tab for detailed logs
- **Mac build warnings**: These are normal without developer credentials
- **Can't download Mac app**: Make sure you're using the direct download links from the GitHub releases page
- **Mac security warning**: This is expected - right-click the app and select "Open"

## Support

The app works identically on all platforms. The only difference is the installation experience on macOS without code signing. 