import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AddUser from './components/AddUser.jsx'
import RenderTask from './components/RenderTask.jsx'
import LoginUser from './components/loginUser.jsx'
import { AuthProvider, useAuth } from './components/AuthContext.jsx'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Logout from './components/Logout.jsx'
import AddTask from './components/AddTask.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function Layout() {
  const { auth, loading } = useAuth();
  const isLoggedIn = Boolean(auth?.token);

  return (
    <>
      <nav className="p-4 border-b text-center place-items-center flex flex-row justify-center gap-4 bg-[radial-gradient(circle_at_20%_15%,#fef3c7_0%,transparent_35%),radial-gradient(circle_at_80%_85%,#bfdbfe_0%,transparent_32%),#f8fafc]">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/tasks/new">Add Task</Link>
        {!loading && !isLoggedIn ? <Link to="/signup">Sign Up</Link> : null}
        {!loading && !isLoggedIn ? <Link to="/login">Login</Link> : null}
        {!loading && isLoggedIn ? <Link to="/logout">Logout</Link> : null}
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<AddUser />} />
        <Route path="/tasks" element={<RenderTask />} />
        <Route path="/tasks/new" element={<AddTask />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
