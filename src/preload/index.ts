import { contextBridge, ipcRenderer } from 'electron'

const electronAPI = {
  getConfig: () => ipcRenderer.invoke('get-config'),
  updateConfig: (config: {
    apiKey?: string
    apiProvider?: 'openai' | 'gemini'
    extractionModel?: string
    solutionModel?: string
    debuggingModel?: string
    language?: string
  }) => ipcRenderer.invoke('update-config', config),
  checkApiKey: () => ipcRenderer.invoke('check-api-key'),
  validateApiKey: (apiKey: string) => ipcRenderer.invoke('validate-api-key', apiKey),
  getScreenshots: () => ipcRenderer.invoke('get-screenshots'),
  deleteScreenshot: (path: string) => ipcRenderer.invoke('delete-screenshot', path),
  toggleMainWindow: async () => {
    console.log('toggleMainWindow called from preload')
    try {
      const result = await ipcRenderer.invoke('toggle-main-window')
      return result
    } catch (error) {
      console.error('Error toggling main window:', error)
      throw error
    }
  },
  onScreenshotTaken: (callback: (data: { path: string; preview: string }) => void) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscription = (_: any, data: { path: string; preview: string }) => callback(data)
    ipcRenderer.on('screenshot-taken', subscription)
    return () => ipcRenderer.removeListener('screenshot-taken', subscription)
  },
  getPlatform: () => process.platform,
  triggerScreenshot: () => ipcRenderer.invoke('trigger-screenshot'),
  onDeleteLastScreenshot: (callback: () => void) => {
    const subscription = () => callback()
    ipcRenderer.on('screenshot-deleted', subscription)
    return () => ipcRenderer.removeListener('screenshot-deleted', subscription)
  },
  deleteLastScreenshot: () => ipcRenderer.invoke('delete-last-screenshot'),
  openSettingsPortal: () => ipcRenderer.invoke('open-settings-portal'),
  onShowSettings: (callback: () => void) => {
    const subscription = () => callback()
    ipcRenderer.on('show-settings-dialog', subscription)
    return () => ipcRenderer.removeListener('show-settings-dialog', subscription)
  }
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
