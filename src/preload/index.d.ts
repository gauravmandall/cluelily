export interface ElectronAPI {
  getConfig: () => Promise<{
    apiKey?: string
    apiProvider?: 'openai' | 'gemini'
    extractionModel?: string
    solutionModel?: string
    debuggingModel?: string
    language?: string
  }>
  updateConfig: (config: {
    apiKey?: string
    apiProvider?: 'openai' | 'gemini'
    extractionModel?: string
    solutionModel?: string
    debuggingModel?: string
    language?: string
  }) => Promise<boolean>
  checkApiKey: () => Promise<boolean>
  validateApiKey: (apiKey: string) => Promise<{
    valid: boolean
    error?: string
  }>
  getScreenshots: () => Promise<{ path: string; preview: string }[]>
  deleteScreenshot: (path: string) => Promise<{ success: boolean; error?: string }>
  onScreenshotTaken: (callback: (data: { path: string; preview: string }) => void) => () => void
  toggleMainWindow: () => Promise<{ success: boolean; error?: string }>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
