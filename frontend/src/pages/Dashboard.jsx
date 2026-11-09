
function Dashboard({ role }) {
  const isAdmin = role === 'admin'

  return (
    <main className="dashboard">
      <h1>Library Dashboard</h1>
      <p>Welcome to Shelf Life.</p>

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
