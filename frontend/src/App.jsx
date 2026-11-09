
import { useState } from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Navbar from './components/Navbar'
import BookManagement from './pages/BookManagement'

function App() {
  const userRole = null
  const [currentPage, setCurrentPage] = useState('home')

  function navigate(page) {
    setCurrentPage(page)
  }

  return (
    <>
      <Navbar onNavigate={navigate} />

      {currentPage === 'home' && <Home />}
      {currentPage === 'dashboard' && <Dashboard role={userRole} />}
      {currentPage === 'signup' && <SignUp />}
      {currentPage === 'signin' && <SignIn />}
      {currentPage === 'books' && <BookManagement role={userRole} />}
    </>
  )
}

export default App