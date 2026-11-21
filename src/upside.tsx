import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UpsideOfDownPage } from './pages/UpsideOfDownPage'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UpsideOfDownPage />
  </StrictMode>,
)
