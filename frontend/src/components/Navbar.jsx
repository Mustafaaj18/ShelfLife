
function Navbar({ onNavigate }) {
  return (
    <header className="site-header">
      <div className="site-brand" onClick={() => onNavigate('home')}>
        <span className="brand-mark">S</span>
        <span>Shelf Life</span>
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <button type="button" onClick={() => onNavigate('home')}>
          Home
        </button>
        <button type="button" onClick={() => onNavigate('dashboard')}>
          Dashboard
        </button>
        <button type="button" onClick={() => onNavigate('books')}>
          Books
        </button>
        <button type="button" onClick={() => onNavigate('signup')}>
          Sign Up
        </button>
        <button type="button" onClick={() => onNavigate('signin')}>
          Sign In
        </button>
      </nav>
    </header>
  )
}

export default Navbar
