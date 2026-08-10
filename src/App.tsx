import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LandingPage } from './components/LandingPage'
import { Widget } from './components/Widget'
import './styles/widget.css'
import './styles/landing.css'

function isTauriRuntime() {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window
}

function useBodyMode(mode: 'landing' | 'app' | 'tauri') {
  useEffect(() => {
    const { classList } = document.body
    classList.remove('is-landing', 'is-app', 'is-tauri')
    classList.add(`is-${mode}`)
    return () => {
      classList.remove(`is-${mode}`)
    }
  }, [mode])
}

function AppRoutes() {
  const { pathname } = useLocation()
  useBodyMode(pathname === '/app' ? 'app' : 'landing')

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

function AppShell() {
  if (isTauriRuntime()) {
    return <TauriShell />
  }
  return <AppRoutes />
}

function TauriShell() {
  useBodyMode('tauri')
  return (
    <div className="app-stage">
      <Widget />
    </div>
  )
}

export default function App() {
  return <AppShell />
}
