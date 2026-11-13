
import { useState } from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Navbar from './components/Navbar'
import BookManagement from './pages/BookManagement'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(() => {
    try {
      const storedUser = sessionStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch {
      return null
    }
  })

  function navigate(page) {
    setCurrentPage(page)
  }

  function handleLogin(userData) {
    setUser(userData)
    setCurrentPage('dashboard')
  }

  function handleLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    setUser(null)
    setCurrentPage('home')
  }

  return (
    <>
      <Navbar
        onNavigate={navigate}
        user={user}
        onLogout={handleLogout}
      />

      {currentPage === 'home' && <Home />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'signup' && <SignUp onLogin={handleLogin} />}
      {currentPage === 'signin' && <SignIn onLogin={handleLogin} />}
      {currentPage === 'books' && <BookManagement role={user?.role} />}
    </>
  )
}

export default App
