import { BrowserWindow, globalShortcut } from 'electron'

export interface IKeyboardShortcutHelper {
  moveWindowLeft: () => void
  moveWindowRight: () => void
  moveWindowUp: () => void
  moveWindowDown: () => void
  toggleMainWindow: () => void
  isVisible: () => boolean
  getMainWindow: () => BrowserWindow | null
  takeScreenshot: () => Promise<string>
  getImagePreview: (filePath: string) => Promise<string>
  clearQueues: () => void
  setView: (view: 'queue' | 'solutions' | 'debug') => void
}

export class KeyboardShortcutHelper {
  private deps: IKeyboardShortcutHelper

  constructor(deps: IKeyboardShortcutHelper) {
    this.deps = deps
  }

  public registerGlobalShortcuts(): void {
    globalShortcut.register('CommandOrControl+Left', () => {
      console.log('moveWindowLeft')
      this.deps.moveWindowLeft()
    })
    globalShortcut.register('CommandOrControl+Right', () => {
      console.log('moveWindowRight')
      this.deps.moveWindowRight()
    })
    globalShortcut.register('CommandOrControl+Up', () => {
      console.log('moveWindowUp')
      this.deps.moveWindowUp()
    })
    globalShortcut.register('CommandOrControl+Down', () => {
      console.log('moveWindowDown')
      this.deps.moveWindowDown()
    })
    globalShortcut.register('CommandOrControl+B', () => {
      console.log('toggleMainWindow')
      this.deps.toggleMainWindow()
    })
    globalShortcut.register('CommandOrControl+H', async () => {
      const mainWindow = this.deps.getMainWindow()
      if (mainWindow) {
        console.log('taking screenshot')
        try {
          const screenshotPath = await this.deps.takeScreenshot()
          const preview = await this.deps.getImagePreview(screenshotPath)
          console.log('screenshot taken', screenshotPath, preview)
          mainWindow.webContents.send('screenshot-taken', {
            path: screenshotPath,
            preview
          })
        } catch (error) {
          console.error('Failed to take screenshot:', error)
        }
      }
    })
  }
}
