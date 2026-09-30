import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ComponentsPage } from './pages/ComponentsPage'
import { LandingPage } from './pages/LandingPage'
import { TemplatesPage } from './pages/TemplatesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
