import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CafeProvider } from './contexts/CafeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <CafeProvider>
    <App />
  </CafeProvider>,
)
