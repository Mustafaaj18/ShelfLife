import { useEffect, useState } from 'react'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Dashboard({ onNavigate }) {
  const storedUser = sessionStorage.getItem('user')
  let user = null

  try {
    user = storedUser ? JSON.parse(storedUser) : null
  } catch {
    user = null
  }

  const role = user?.role
  const isAdmin = role === 'admin'
  const token = sessionStorage.getItem('token')

  const [books, setBooks] = useState([])
  const [borrowings, setBorrowings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [borrowingLoading, setBorrowingLoading] = useState(true)
  const [borrowingError, setBorrowingError] = useState('')
  const [message, setMessage] = useState('')
  const [returningId, setReturningId] = useState(null)

  useEffect(() => {
    if (!isAdmin || !token) return

    async function loadBooks() {
      try {
        const response = await fetch(`${apiUrl}/api/books`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          setError('Unable to load library statistics.')
          return
        }

        setBooks(await response.json())
      } catch {
        setError('Unable to connect to the backend server.')
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [isAdmin, token])

  useEffect(() => {
    if (!role || !token) return

    async function loadBorrowings() {
      try {
        const endpoint = isAdmin
          ? '/api/borrowings'
          : '/api/borrowings/me'

        const response = await fetch(`${apiUrl}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          setBorrowingError('Unable to load borrowing records.')
          return
        }

        setBorrowings(await response.json())
      } catch {
        setBorrowingError('Unable to connect to the backend server.')
      } finally {
        setBorrowingLoading(false)
      }
    }

    loadBorrowings()
  }, [role, isAdmin, token])

  async function handleReturn(id) {
    setMessage('')
    setReturningId(id)

    try {
      const response = await fetch(`${apiUrl}/api/borrowings/${id}/return`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        setMessage('Unable to return book.')
        return
      }

      const recordsResponse = await fetch(`${apiUrl}/api/borrowings/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!recordsResponse.ok) {
        setBorrowingError('Book returned, but unable to refresh borrowing records.')
        return
      }

      setBorrowings(await recordsResponse.json())
      setMessage('Book returned successfully.')
    } catch {
      setMessage('Unable to connect to the backend server.')
    } finally {
      setReturningId(null)
    }
  }

  function formatDate(date) {
    if (!date) return '—'

    const parsedDate = new Date(date)

    return Number.isNaN(parsedDate.getTime())
      ? '—'
      : parsedDate.toLocaleDateString()
  }

  const totalBooks = books.length
  const availableBooks = books.filter(book => book.status === 'available').length
  const borrowedBooks = books.filter(book => book.status === 'borrowed').length
  const availablePercentage = totalBooks ? availableBooks / totalBooks * 100 : 0
  const borrowedPercentage = totalBooks ? borrowedBooks / totalBooks * 100 : 0

  const currentBorrowings = borrowings.filter(record => record.status === 'borrowed')
  const borrowingHistory = borrowings.filter(record => record.status === 'returned')

  const now = Date.now()
  const threeDays = 3 * 24 * 60 * 60 * 1000

  const dueSoon = currentBorrowings.filter(record => {
    if (!record.dueDate) return false

    const remaining = new Date(record.dueDate).getTime() - now

    return remaining >= 0 && remaining <= threeDays
  })

  function getBorrowingStatus(record) {
    if (record.status === 'returned') return 'Returned'
    if (!record.dueDate) return 'Borrowed'

    const remaining = new Date(record.dueDate).getTime() - now

    if (remaining < 0) return 'Overdue'
    if (remaining <= threeDays) return 'Due Soon'

    return 'Borrowed'
  }

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
            {loading ? (
              <p>Loading library statistics...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <>
                <div className="dashboard-stats">
                  <div className="stat-card">
                    <h3>Total Books</h3>
                    <p>{totalBooks}</p>
                  </div>

                  <div className="stat-card">
                    <h3>Available Books</h3>
                    <p>{availableBooks}</p>
                  </div>

                  <div className="stat-card">
                    <h3>Borrowed Books</h3>
                    <p>{borrowedBooks}</p>
                  </div>
                </div>

                <div className="library-overview">
                  <h3>Library Overview</h3>
                  <p>Book availability</p>

                  <div className="availability-bar">
                    <div
                      className="available-bar"
                      style={{ width: `${availablePercentage}%` }}
                    />
                    <div
                      className="borrowed-bar"
                      style={{ width: `${borrowedPercentage}%` }}
                    />
                  </div>

                  <div className="availability-legend">
                    <span>
                      <span className="available-indicator" />
                      Available ({Math.round(availablePercentage)}%)
                    </span>

                    <span>
                      <span className="borrowed-indicator" />
                      Borrowed ({Math.round(borrowedPercentage)}%)
                    </span>
                  </div>
                </div>
              </>
            )}

            <div className="dashboard-management">
              <h3>Library Management</h3>
              <p>Add, edit and delete books in the library collection.</p>

              <button
                type="button"
                onClick={() => onNavigate('books')}
              >
                Manage Books
              </button>
            </div>

            <div className="borrowing-section">
              <h3>Borrowing Records</h3>

              {borrowingLoading ? (
                <p>Loading borrowing records...</p>
              ) : borrowingError ? (
                <p>{borrowingError}</p>
              ) : borrowings.length === 0 ? (
                <p>No borrowing records found.</p>
              ) : (
                <div className="borrowing-table-wrapper">
                  <table className="borrowing-table">
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Book</th>
                        <th>Borrowed Date</th>
                        <th>Due Date</th>
                        <th>Returned Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {borrowings.map(record => (
                        <tr key={record._id}>
                          <td>{record.user?.name || '—'}</td>
                          <td>{record.book?.title || '—'}</td>
                          <td>{formatDate(record.borrowedDate)}</td>
                          <td>{formatDate(record.dueDate)}</td>
                          <td>{formatDate(record.returnedDate)}</td>
                          <td>{getBorrowingStatus(record)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {borrowingLoading ? (
              <p>Loading your borrowing records...</p>
            ) : borrowingError ? (
              <p>{borrowingError}</p>
            ) : (
              <>
                <div className="dashboard-stats">
                  <div className="stat-card">
                    <h3>Books Borrowed</h3>
                    <p>{currentBorrowings.length}</p>
                  </div>

                  <div className="stat-card">
                    <h3>Due Soon</h3>
                    <p>{dueSoon.length}</p>
                  </div>

                  <div className="stat-card">
                    <h3>Books Returned</h3>
                    <p>{borrowingHistory.length}</p>
                  </div>
                </div>

                {message && <p role="status">{message}</p>}

                <div className="borrowing-section">
                  <h3>My Borrowed Books</h3>

                  {currentBorrowings.length === 0 ? (
                    <p>You have no currently borrowed books.</p>
                  ) : (
                    <div className="borrowing-table-wrapper">
                      <table className="borrowing-table">
                        <thead>
                          <tr>
                            <th>Book</th>
                            <th>Borrowed Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentBorrowings.map(record => (
                            <tr key={record._id}>
                              <td>{record.book?.title || '—'}</td>
                              <td>{formatDate(record.borrowedDate)}</td>
                              <td>{formatDate(record.dueDate)}</td>
                              <td>{getBorrowingStatus(record)}</td>
                              <td>
                                <button
                                  type="button"
                                  disabled={returningId !== null}
                                  onClick={() => handleReturn(record._id)}
                                >
                                  {returningId === record._id ? 'Returning...' : 'Return'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="borrowing-section">
                  <h3>Borrowing History</h3>

                  {borrowingHistory.length === 0 ? (
                    <p>You have no borrowing history yet.</p>
                  ) : (
                    <div className="borrowing-table-wrapper">
                      <table className="borrowing-table">
                        <thead>
                          <tr>
                            <th>Book</th>
                            <th>Borrowed Date</th>
                            <th>Returned Date</th>
                          </tr>
                        </thead>

                        <tbody>
                          {borrowingHistory.map(record => (
                            <tr key={record._id}>
                              <td>{record.book?.title || '—'}</td>
                              <td>{formatDate(record.borrowedDate)}</td>
                              <td>{formatDate(record.returnedDate)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="dashboard-management">
              <h3>Library Collection</h3>
              <p>Browse the library collection and find your next book.</p>

              <button
                type="button"
                onClick={() => onNavigate('books')}
              >
                Browse Books
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default Dashboard