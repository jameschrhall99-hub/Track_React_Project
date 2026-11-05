import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'

import App from './App.tsx'
import SetupError from './components/setup-error.tsx'
import { readSupabaseConfig } from './lib/env.ts'

const root = createRoot(document.getElementById('root')!)

const configResult = readSupabaseConfig()

if (!configResult.ok) {
  root.render(
    <StrictMode>
      <SetupError issues={configResult.issues} />
    </StrictMode>,
  )
} else {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}