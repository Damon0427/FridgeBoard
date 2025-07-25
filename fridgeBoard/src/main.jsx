import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Addpage from './Routes/AddPage.jsx';
import DetailPage from './Routes/Detail';
import EditPage from './Routes/EditPage';
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<Addpage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/edit/:id" element={<EditPage />} />

      </Routes>
  </BrowserRouter>
  </StrictMode>,
)
