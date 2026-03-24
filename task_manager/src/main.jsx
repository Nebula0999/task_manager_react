import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AddUser from './components/AddUser.jsx'
import RenderTask from './components/RenderTask.jsx'
import LoginUser from './components/loginUser.jsx'
import { AuthProvider } from './components/AuthContext.jsx'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function Layout() {
  return (
    <>
      <nav className="p-4 border-b flex gap-4 bg-white">
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<AddUser />} />
        <Route path="/tasks" element={<RenderTask />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
