import { ToastProvider } from './providers/toast-provider'
import { QueryProvider } from './providers/query-provider'
import { WelcomeScreen } from './components/welcome-screen'
import { useCallback, useEffect, useState } from 'react'
import { SettingsDialog } from './components/settings-dialog'
import MainApp from './components/main-app'

interface AppConfig {
  apiKey?: string
  apiProvider?: 'openai' | 'gemini'
  extractionModel?: string
  solutionModel?: string
  debuggingModel?: string
  language?: string
}

function App(): React.JSX.Element {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('python')

  const handleOpenSettings = useCallback(() => {
    console.log('open settings')
    setIsSettingsOpen(true)
    console.log('isSettingsOpen', isSettingsOpen)
  }, [])

  const handleCloseSettings = useCallback((open: boolean) => {
    setIsSettingsOpen(open)
  }, [])

  const markInitialized = useCallback(() => {
    setIsInitialized(true)
    window.__IS_INITIALIZED__ = true
  }, [])

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const config = (await window.electronAPI.getConfig()) as AppConfig

        if (config?.language) {
          setCurrentLanguage(config.language)
        }

        markInitialized()
      } catch (error) {
        console.error('Error initializing app:', error)
        markInitialized()
      }
    }
    initializeApp()

    return () => {
      window.__IS_INITIALIZED__ = false
      setIsInitialized(false)
    }
  }, [markInitialized])

  const handleLanguageChange = useCallback((language: string) => {
    setCurrentLanguage(language)
    window.__LANGUAGE__ = language
  }, [])

  useEffect(() => {
    const unsubscribeSettings = window.electronAPI.onShowSettings(() => {
      setIsSettingsOpen(true)
    })

    return () => {
      unsubscribeSettings()
    }
  }, [])

  return (
    <QueryProvider>
      <ToastProvider>
        <div className="relative">
          {isInitialized ? (
            <MainApp currentLanguage={currentLanguage} setLanguage={handleLanguageChange} />
          ) : (
            <WelcomeScreen onOpenSettings={handleOpenSettings} />
          )}
        </div>
        <SettingsDialog open={isSettingsOpen} onOpenChange={handleCloseSettings} />
      </ToastProvider>
    </QueryProvider>
  )
}

export default App
