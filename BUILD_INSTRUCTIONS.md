# Build Instructions for cluelily

## Automated Releases (Recommended)

The easiest way to create releases is using GitHub Actions:

1. **Update the version** in `package.json`:
   ```bash
   npm version patch  # or minor/major
   ```

2. **Create and push a git tag**:
   ```bash
   git tag v1.0.9
   git push origin v1.0.9
   ```

3. **GitHub Actions will automatically**:
   - Build for Windows (NSIS installer)
   - Build for Linux (AppImage, .deb, and Snap packages)
   - Create a GitHub release with all packages
   - Upload artifacts for download

## Manual Building

You can also build locally for testing:

```bash
# Install dependencies
pnpm install

# Build for your current platform
pnpm run build

# Build for specific platforms
pnpm run build:win     # Windows
pnpm run build:linux   # Linux

# Build without packaging (for testing)
pnpm run build:unpack
```

## Supported Platforms

- **Windows**: NSIS installer (.exe)
- **Linux**: AppImage, .deb, and Snap packages

## Note about macOS

macOS builds are not currently supported because they require:
- Apple Developer Account ($99/year)
- Code signing certificates
- Notarization process

If you get an Apple Developer Account in the future, you can add macOS builds back to the workflow.

## Troubleshooting

- **Windows build fails**: Make sure you have the latest Node.js and pnpm installed
- **Linux build fails**: The GitHub runner automatically installs system dependencies
- **Release not created**: Check the Actions tab for detailed error logs

## File Structure

- `.github/workflows/publish.yml` - GitHub Actions workflow
- `electron-builder.yml` - Build configuration
- `package.json` - Contains build scripts
- `build/` - Icons and other build resources 