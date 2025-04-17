import { BrowserWindow } from 'electron'
import { ScreenshotManager } from './screenshot-manager'
import { state } from '../index'
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { configManager } from './config-manager'

export interface IProcessingManager {
  getMainWindow: () => BrowserWindow | null
  getScreenshotManager: () => ScreenshotManager
  getView: () => 'queue' | 'solutions' | 'debug'
  setView: (view: 'queue' | 'solutions' | 'debug') => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProblemInfo: () => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setProblemInfo: (problemInfo: any) => void
  getScreenshotQueue: () => string[]
  getExtraScreenshotQueue: () => string[]
  clearQueues: () => void
  takeScreenshot: () => Promise<string>
  getImagePreview: (path: string) => Promise<string>
  deleteScreenshot: (path: string) => Promise<{ success: boolean; error?: string }>
  setHasDebugged: (hasDebugged: boolean) => void
  getHasDebugged: () => boolean
  PROCESSING_EVENTS: typeof state.PROCESSING_EVENTS
}

export class ProcessingManager {
  private deps: IProcessingManager
  private screenshotManager: ScreenshotManager
  private openaiClient: OpenAI | null = null
  private geminiClient: GoogleGenerativeAI | null = null

  private currentProcessingAbortController: AbortController | null = null
  private currentExtraProcessingAbortController: AbortController | null = null

  constructor(deps: IProcessingManager) {
    this.deps = deps
    this.screenshotManager = deps.getScreenshotManager()

    this.initializeAiClient()
  }

  private initializeAiClient(): void {
    try {
      const config = configManager.loadConfig()

      if (config.apiProvider === 'openai') {
        if (config.apiKey) {
          this.openaiClient = new OpenAI({
            apiKey: config.apiKey,
            timeout: 60000,
            maxRetries: 2
          })
          this.geminiClient = null
          console.log('OpenAI client initialized successfully')
        } else {
          this.openaiClient = null
          this.geminiClient = null
          console.log('OpenAI client not initialized: No API key provided')
        }
      } else if (config.apiProvider === 'gemini') {
        this.openaiClient = null
        if (config.apiKey) {
          this.geminiClient = new GoogleGenerativeAI(config.apiKey)
          console.log('Gemini client initialized successfully')
        } else {
          this.openaiClient = null
          this.geminiClient = null
          console.log('Gemini client not initialized: No API key provided')
        }
      }
    } catch (error) {
      console.error('Error initializing AI client:', error)
      this.openaiClient = null
      this.geminiClient = null
    }
  }
}
