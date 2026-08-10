import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from './components/LandingPage'
import { Widget } from './components/Widget'
import './styles/widget.css'
import './styles/landing.css'

function isTauriRuntime() {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window
}

function AppShell() {
  if (isTauriRuntime()) {
    document.body.classList.add('is-tauri')
    return (
      <div className="app-stage">
        <Widget />
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/app"
        element={
          <div className="app-stage app-stage-solo">
            <Link className="back-home" to="/">
              ← Back
            </Link>
            <Widget />
          </div>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return <AppShell />
}
