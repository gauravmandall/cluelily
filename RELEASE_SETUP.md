# Release Setup Guide

This guide explains how to set up GitHub secrets for automated releases of cluelily.

## Required GitHub Secrets

Go to your repository settings > Secrets and variables > Actions, then add these secrets:

### For macOS Signing and Notarization

1. **APPLE_ID** - Your Apple ID email address
2. **APPLE_APP_PASSWORD** - An app-specific password for your Apple ID
   - Generate this at: https://appleid.apple.com/account/manage
   - Go to "Sign-In and Security" > "App-Specific Passwords"
3. **APPLE_TEAM_ID** - Your Apple Developer Team ID
   - Found in Apple Developer Console under "Membership"
4. **MAC_CERTIFICATE** - Your Developer ID Application certificate (base64 encoded)
   - Export from Keychain Access as .p12 file
   - Convert to base64: `base64 -i certificate.p12 | pbcopy`
5. **MAC_CERTIFICATE_PASSWORD** - Password for the certificate

### Automatic Secrets

These are automatically provided by GitHub:

- **GITHUB_TOKEN** - Used for creating releases (automatically available)

## Setting Up Apple Developer Certificate

1. **Create Certificate Signing Request (CSR)**:
   - Open Keychain Access
   - Go to Keychain Access > Certificate Assistant > Request a Certificate From a Certificate Authority
   - Fill in your email and name, select "Saved to disk"

2. **Create Developer ID Application Certificate**:
   - Go to Apple Developer Console > Certificates, Identifiers & Profiles
   - Click "+" to create new certificate
   - Select "Developer ID Application"
   - Upload your CSR file
   - Download the certificate and install it in Keychain Access

3. **Export Certificate for GitHub**:
   - In Keychain Access, find your "Developer ID Application" certificate
   - Right-click and select "Export"
   - Choose .p12 format and set a password
   - Convert to base64: `base64 -i certificate.p12 | pbcopy`
   - Paste the base64 string as the MAC_CERTIFICATE secret

## Creating a Release

1. **Update version in package.json**:
   ```bash
   npm version patch  # or minor/major
   ```

2. **Create and push a git tag**:
   ```bash
   git tag v1.0.8
   git push origin v1.0.8
   ```

3. **Monitor the workflow**:
   - Go to Actions tab in your GitHub repository
   - Watch the "Build and Publish cluelily" workflow
   - It will build for Linux, Windows, and macOS
   - Releases will be created automatically at: https://github.com/gauravmandall/cluelily/releases

## Supported Platforms

The workflow builds for:

- **Linux**: AppImage, .deb, and Snap packages
- **Windows**: NSIS installer (.exe)
- **macOS**: DMG and ZIP files (signed and notarized)

## Troubleshooting

- **Notarization fails**: Check that your Apple ID has 2FA enabled and you're using an app-specific password
- **Certificate issues**: Ensure the certificate is valid and the password is correct
- **Linux build fails**: The workflow installs required system dependencies automatically
- **Build timeout**: The workflow has retry logic and generous timeouts

## Manual Testing

You can test builds locally:

```bash
# Build for current platform
pnpm run build:linux   # or build:win, build:mac

# Test without publishing
pnpm run build:unpack
```