
import { useState } from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Navbar from './components/Navbar'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  function navigate(page) {
    setCurrentPage(page)
  }

  return (
    <>
      <Navbar onNavigate={navigate} />

      {currentPage === 'home' && <Home />}
      {currentPage === 'dashboard' && <Dashboard role="member" />}
      {currentPage === 'signup' && <SignUp />}
      {currentPage === 'signin' && <SignIn />}
    </>
  )
}

export default App