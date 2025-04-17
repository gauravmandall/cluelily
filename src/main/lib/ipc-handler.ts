import { BrowserWindow, ipcMain } from 'electron'
import { configManager } from './config-manager'

export interface IIPCHandler {
  getMainWindow: () => BrowserWindow | null
  takeScreenshot: () => Promise<string>
  getImagePreview: (filePath: string) => Promise<string>
  clearQueues: () => void
  setView: (view: 'queue' | 'solutions' | 'debug') => void
  getView: () => 'queue' | 'solutions' | 'debug'
  getScreenshotQueue: () => string[]
  getExtraScreenshotQueue: () => string[]
  moveWindowLeft: () => void
  moveWindowRight: () => void
  moveWindowUp: () => void
  moveWindowDown: () => void
  toggleMainWindow: () => void
  isVisible: () => boolean
  deleteScreenshot: (path: string) => Promise<{ success: boolean; error?: string }>
}

export function initializeIpcHandler(deps: IIPCHandler): void {
  ipcMain.handle('get-config', () => {
    return configManager.loadConfig()
  })

  ipcMain.handle('update-config', (_event, updates) => {
    return configManager.updateConfig(updates)
  })

  ipcMain.handle('check-api-key', () => {
    return configManager.hasApiKey()
  })

  ipcMain.handle('validate-api-key', async (_event, apiKey) => {
    if (!configManager.isValidApiKeyFormat(apiKey)) {
      return {
        valid: false,
        error: 'Invalid API key format'
      }
    }

    const result = await configManager.testApiKey(apiKey)
    return result
  })

  ipcMain.handle('get-screenshots', async () => {
    try {
      let previews: { path: string; preview: string }[] = []
      const currentView = deps.getView()
      console.log('currentView', currentView)

      if (currentView === 'queue') {
        const queue = deps.getScreenshotQueue()
        previews = await Promise.all(
          queue.map(async (path) => {
            const preview = await deps.getImagePreview(path)
            return { path, preview }
          })
        )
      } else {
        const queue = deps.getExtraScreenshotQueue()
        previews = await Promise.all(
          queue.map(async (path) => {
            const preview = await deps.getImagePreview(path)
            return { path, preview }
          })
        )
      }

      return previews
    } catch (error) {
      console.error('Error getting screenshots:', error)
      throw error
    }
  })
  ipcMain.handle('delete-screenshot', async (event, path: string) => {
    return deps.deleteScreenshot(path)
  })
}
