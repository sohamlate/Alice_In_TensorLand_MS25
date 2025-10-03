import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/fira-code'; // Default weight 400


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)