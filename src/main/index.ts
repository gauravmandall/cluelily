import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import path, { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs'
import { initializeIpcHandler } from './lib/ipc-handler'
import { KeyboardShortcutHelper } from './lib/keyboard-shortcut'

const state = {
  mainWindow: null as BrowserWindow | null,
  isWindowVisible: false,
  windowPosition: null as { x: number; y: number } | null,
  windowSize: null as { width: number; height: number } | null,
  screenWidth: 0,
  screenHeight: 0,
  step: 0,
  currentX: 0,
  currentY: 0,

  keyboardShortcutHelper: null as KeyboardShortcutHelper | null
}

async function createWindow(): Promise<void> {
  if (state.mainWindow) {
    if (state.mainWindow.isMinimized()) state.mainWindow.restore()
    state.mainWindow.focus()
    return
  }

  const primaryDisplay = screen.getPrimaryDisplay()
  const workArea = primaryDisplay.workAreaSize
  state.screenWidth = workArea.width
  state.screenHeight = workArea.height

  state.step = 60
  state.currentY = 50

  // Create the browser window.
  const windowSettings: Electron.BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    minWidth: 750,
    maxHeight: 550,
    x: state.currentX,
    y: state.currentY,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    fullscreenable: false,
    hasShadow: false,
    opacity: 1.0,
    backgroundColor: '#00000000',
    focusable: true,
    skipTaskbar: true,
    type: 'panel',
    paintWhenInitiallyHidden: true,
    titleBarStyle: 'hidden',
    enableLargerThanScreen: true,
    movable: true,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
      scrollBounce: true
    }
  }

  state.mainWindow = new BrowserWindow(windowSettings)

  state.mainWindow.on('ready-to-show', () => {
    state.mainWindow?.show()
  })

  state.mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    state.mainWindow?.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    state.mainWindow?.loadFile(join(__dirname, '../renderer/index.html'))
  }

  state.mainWindow.webContents.setZoomFactor(1)
  state.mainWindow.webContents.openDevTools()
  state.mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  state.mainWindow.setContentProtection(true)

  state.mainWindow.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true
  })
  state.mainWindow.setAlwaysOnTop(true, 'screen-saver', 1)

  if (process.platform === 'darwin') {
    state.mainWindow.setHiddenInMissionControl(true)
    state.mainWindow.setWindowButtonVisibility(false)
    state.mainWindow.setBackgroundColor('#00000000')

    state.mainWindow.setSkipTaskbar(true)
    state.mainWindow.setHasShadow(false)
  }

  state.mainWindow.on('close', () => {
    state.mainWindow = null
    state.isWindowVisible = false
  })

  state.mainWindow.webContents.setBackgroundThrottling(false)
  state.mainWindow.webContents.setFrameRate(60)

  state.mainWindow.on('move', handleWindowMove)
  state.mainWindow.on('resize', handleWindowResize)
  state.mainWindow.on('closed', handleWindowClosed)

  const bounds = state.mainWindow.getBounds()
  state.windowPosition = { x: bounds.x, y: bounds.y }
  state.windowSize = { width: bounds.width, height: bounds.height }
  state.currentX = bounds.x
  state.currentY = bounds.y
  state.isWindowVisible = true

  state.mainWindow.showInactive()
}

function handleWindowMove(): void {
  if (!state.mainWindow) return

  const bounds = state.mainWindow.getBounds()
  state.windowPosition = { x: bounds.x, y: bounds.y }
  state.currentX = bounds.x
  state.currentY = bounds.y
}

function handleWindowResize(): void {
  if (!state.mainWindow) return

  const bounds = state.mainWindow.getBounds()
  state.windowSize = { width: bounds.width, height: bounds.height }
}

function handleWindowClosed(): void {
  state.mainWindow = null
  state.isWindowVisible = false
  state.windowPosition = null
  state.windowSize = null
}

function moveWindowHorizontal(updateFn: (x: number) => number): void {
  if (!state.mainWindow) return
  state.currentX = updateFn(state.currentX)
  state.mainWindow.setPosition(Math.round(state.currentX), Math.round(state.currentY))
}

function moveWindowVertical(updateFn: (y: number) => number): void {
  if (!state.mainWindow) return

  const newY = updateFn(state.currentY)

  const maxUpLimit = (-(state.windowSize?.height || 0) * 2) / 3
  const maxDownLimit = state.screenHeight + ((state.windowSize?.height || 0) * 2) / 3

  console.log({
    newY,
    maxUpLimit,
    maxDownLimit,
    screenHeight: state.screenHeight,
    windowHeight: state.windowSize?.height,
    currentY: state.currentY
  })

  if (newY >= maxUpLimit && newY <= maxDownLimit) {
    state.currentY = newY
    state.mainWindow.setPosition(Math.round(state.currentX), Math.round(state.currentY))
  }
}

function initializeHelpers() {
  state.keyboardShortcutHelper = new KeyboardShortcutHelper({
    moveWindowLeft: () =>
      moveWindowHorizontal((x) => Math.max(-(state.windowSize?.width || 0) / 2, x - state.step)),
    moveWindowRight: () =>
      moveWindowHorizontal((x) =>
        Math.min(state.screenWidth - (state.windowSize?.width || 0) / 2, x + state.step)
      ),
    moveWindowUp: () => moveWindowVertical((y) => y - state.step),
    moveWindowDown: () => moveWindowVertical((y) => y + state.step)
  })
}

async function initializeApp() {
  try {
    const appDataPath = path.join(app.getPath('appData'), 'cluelily')
    console.log('App data path:', appDataPath)

    for (const dir of [appDataPath]) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
    }

    app.setPath('userData', appDataPath)

    initializeHelpers()
    initializeIpcHandler()

    await createWindow()

    state.keyboardShortcutHelper?.registerGlobalShortcuts()
  } catch (error) {
    console.error('Failed to initialize app:', error)
    app.quit()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(initializeApp)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
