import { useEffect, useRef } from 'react'
import ScreenshotQueue from './queue/screenshot-queue'
import { useQuery } from '@tanstack/react-query'
import { useToast } from '../providers/toast-context'
export interface Screenshot {
  path: string
  preview: string
}

async function fetchScreenshots(): Promise<Screenshot[]> {
  try {
    const existing = await window.electronAPI.getScreenshots()
    return existing
  } catch (error) {
    console.error('Error fetching screenshots:', error)
    throw error
  }
}

interface ScreenshotsViewProps {
  setView: (view: 'queue' | 'solutions' | 'debug') => void
  currentLanguage: string
  setLanguage: (language: string) => void
}

const ScreenshotsView: React.FC<ScreenshotsViewProps> = ({
  setView,
  currentLanguage,
  setLanguage
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { showToast } = useToast()

  const {
    data: screenshots = [],
    isLoading,
    refetch
  } = useQuery<Screenshot[]>({
    queryKey: ['screenshots'],
    queryFn: fetchScreenshots,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false
  })

  console.log('screenshots', screenshots)

  useEffect(() => {
    const cleanupFunctions = [window.electronAPI.onScreenshotTaken(() => refetch())]
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup())
    }
  }, [screenshots])

  const handleDeleteScreenshot = async (index: number) => {
    const screenshotToDelete = screenshots[index]
    try {
      const response = await window.electronAPI.deleteScreenshot(screenshotToDelete.path)
      if (response.success) {
        refetch()
      } else {
        console.error('Error deleting screenshot:', response.error)
        showToast('Error', response.error || 'Failed to delete screenshot', 'error')
      }
    } catch (error) {
      console.error('Error deleting screenshot:', error)
    }
  }

  return (
    <div ref={contentRef} className={`bg-transparent w-1/2`}>
      <div className="px-4 py-3">
        <div className="space-y-3 w-fit">
          <ScreenshotQueue
            screenshots={screenshots}
            isLoading={isLoading}
            onDeleteScreenshot={handleDeleteScreenshot}
          />
        </div>
      </div>
    </div>
  )
}

export default ScreenshotsView
