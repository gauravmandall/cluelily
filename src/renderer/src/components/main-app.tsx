import { useRef, useState } from 'react'
import ScreenshotsView from './screenshots-view'

interface MainAppProps {
  currentLanguage: string
  setLanguage: (language: string) => void
}

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
const MainApp: React.FC<MainAppProps> = ({ currentLanguage, setLanguage }) => {
  const [view, setView] = useState<'queue' | 'solutions' | 'debug'>('queue')
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="min-h-0">
      {view === 'queue' ? (
        <ScreenshotsView
          setView={setView}
          currentLanguage={currentLanguage}
          setLanguage={setLanguage}
        />
      ) : view === 'solutions' ? (
        <>Screnshots solutions view</>
      ) : null}
    </div>
  )
}

export default MainApp
