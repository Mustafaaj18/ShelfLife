
function Navbar({ onNavigate, currentPage, user, onLogout }) {
  return (
    <header className="site-header">
      <div className="site-brand" onClick={() => onNavigate('home')}>
        <span className="brand-mark">S</span>
        <span>Shelf Life</span>
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <button type="button" className={currentPage === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}>
          Home
        </button>
        <button type="button" className={currentPage === 'dashboard' ? 'active' : ''} onClick={() => onNavigate('dashboard')}>
          Dashboard
        </button>
        <button type="button" className={currentPage === 'books' ? 'active' : ''} onClick={() => onNavigate('books')}>
          Books
        </button>

        {user ? (
          <button type="button" onClick={onLogout}>
            Log Out
          </button>
        ) : (
          <>
            <button
              type="button"
              className={currentPage === 'signup' ? 'active' : ''}
              onClick={() => onNavigate('signup')}
            >
              Sign Up
            </button>
            <button
              type="button"
              className={currentPage === 'signin' ? 'active' : ''}
              onClick={() => onNavigate('signin')}
            >
              Sign In
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
