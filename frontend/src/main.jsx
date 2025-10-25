import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from "./routes/router.jsx"
import './index.css'
import { DocumentContextProvider } from './context/DocumentContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <DocumentContextProvider>
        <RouterProvider router={router} />
      </DocumentContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
