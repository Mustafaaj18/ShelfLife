
function Navbar({ onNavigate }) {
  return (
    <nav>
      <button type="button" onClick={() => onNavigate('home')}>
        Home
      </button>
      <button type="button" onClick={() => onNavigate('dashboard')}>
        Dashboard
      </button>
      <button type="button" onClick={() => onNavigate('signup')}>
        Sign Up
      </button>
      <button type="button" onClick={() => onNavigate('signin')}>
        Sign In
      </button>
    </nav>
  )
}

export default Navbar