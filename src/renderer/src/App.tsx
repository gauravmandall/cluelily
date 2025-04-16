import { ToastProvider } from './providers/toast-provider'
import { QueryProvider } from './providers/query-provider'
import { useToast } from './providers/toast-context'

function ToastExample(): React.JSX.Element {
  const { showToast } = useToast()

  return (
    <>
      <h1 className="text-3xl font-bold underline text-blue-500">Hello World</h1>

      <div className="flex gap-2">
        <button onClick={() => showToast('Hello', 'World', 'success')}>Show Toast</button>
        <button onClick={() => showToast('Hello', 'World', 'error')}>Show Error Toast</button>
        <button onClick={() => showToast('Hello', 'World', 'neutral')}>Show Neutral Toast</button>
      </div>
    </>
  )
}

function App(): React.JSX.Element {
  return (
    <QueryProvider>
      <ToastProvider>
        <ToastExample />
      </ToastProvider>
    </QueryProvider>
  )
}

export default App
