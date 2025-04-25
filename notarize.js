import fs from 'fs'
import { notarize } from '@electron/notarize'

// Get configuration from environment variables
const appBundleId = process.env.APP_BUNDLE_ID
const appPath = process.env.APP_PATH
const appleId = process.env.APPLE_ID
const appleIdPassword = process.env.APPLE_APP_SPECIFIC_PASSWORD
const teamId = process.env.APPLE_TEAM_ID

async function notarizeApp() {
  console.log('--- Starting notarize.js Script ---')

  if (process.platform !== 'darwin') {
    console.log('Not on macOS, skipping notarization.')
    return
  }

  console.log(`App Path: ${appPath}`)
  console.log(`App Bundle ID: ${appBundleId}`)
  console.log(`Apple ID: ${appleId ? '******' : 'Not Set'}`)
  console.log(`Team ID: ${teamId ? teamId : 'Not Set'}`)

  if (!appBundleId) throw new Error('APP_BUNDLE_ID environment variable not set')
  if (!appPath) throw new Error('APP_PATH environment variable not set')
  if (!appleId) throw new Error('APPLE_ID environment variable not set')
  if (!appleIdPassword) throw new Error('APPLE_APP_SPECIFIC_PASSWORD environment variable not set')
  if (!teamId) throw new Error('APPLE_TEAM_ID environment variable not set')

  if (!fs.existsSync(appPath)) {
    console.error(`Error: App path does not exist: ${appPath}`)
    throw new Error(`App path not found: ${appPath}`)
  }

  const notarizeOptions = {
    appBundleId: appBundleId,
    appPath: appPath,
    appleId: appleId,
    appleIdPassword: appleIdPassword,
    teamId: teamId
  }

  console.log('Attempting to call notarize function...')
  try {
    await notarize(notarizeOptions)
    console.log(`--- Notarization Successful for ${appPath} ---`)
  } catch (error) {
    console.error('--- Notarization Failed ---')
    console.error(error)
    // Check if the error is due to the app already being notarized
    if (error.message && error.message.includes('Package already notarized')) {
      console.log('Warning: App seems to be already notarized. Continuing...')
    } else {
      throw error // Re-throw the error to fail the script
    }
  }
}

notarizeApp().catch((err) => {
  console.error('--- Error executing notarizeApp ---')
  console.error(err)
  process.exit(1)
})
