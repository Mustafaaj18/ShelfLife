
function Dashboard() {
  const storedUser = sessionStorage.getItem('user')
  let user = null

  try {
    user = storedUser ? JSON.parse(storedUser) : null
  } catch {
    user = null
  }

  const role = user?.role
  const isAdmin = role === 'admin'

  if (!role) {
    return (
      <main className="dashboard">
        <h1>Library Dashboard</h1>
        <p>Please sign in to access your dashboard.</p>
      </main>
    )
  }

  return (
    <main className="dashboard">
      <h1>Library Dashboard</h1>
      <p>Welcome to Shelf Life, {user.name}.</p>

      <section>
        <h2>{isAdmin ? 'Administrator Dashboard' : 'Member Dashboard'}</h2>

        {isAdmin ? (
          <div>
            <h3>Library Management</h3>
            <p>Manage books, library members, and borrowing records.</p>
          </div>
        ) : (
          <div>
            <h3>Library Collection</h3>
            <p>Browse books, search the collection, and check book availability.</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default Dashboard
