
import { useEffect, useState } from 'react'

const emptyForm = {
  title: '',
  author: '',
  isbn: '',
  category: '',
  available: true
}

function BookManagement({ role }) {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const isAdmin = role === 'admin'
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    async function loadBooks() {
      if (!token) {
        setMessage('Please sign in to view the book collection.')
        setLoading(false)
        return
      }

      try {
        const response = await fetch('http://localhost:5000/api/books', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = await response.json()

        if (!response.ok) {
          setMessage(data.message || data.error || 'Unable to load books.')
          return
        }

        setBooks(data)
      } catch {
        setMessage('Unable to connect to the backend server.')
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [token])

  const filteredBooks = books.filter((book) =>
    [book.title, book.author, book.isbn, book.genre]
      .some((value) =>
        (value || '').toLowerCase().includes(search.toLowerCase())
      )
  )

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!isAdmin || !token) return

    setMessage('')

    const bookData = {
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn,
      genre: formData.category,
      status: formData.available ? 'available' : 'borrowed'
    }

    const isEditing = editingId !== null

    const url = isEditing
      ? `http://localhost:5000/api/books/${editingId}`
      : 'http://localhost:5000/api/books'

    try {
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bookData)
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.message || data.error || 'Unable to save book.')
        return
      }

      if (isEditing) {
        setBooks((currentBooks) =>
          currentBooks.map((book) =>
            book._id === editingId ? data : book
          )
        )
      } else {
        setBooks((currentBooks) => [...currentBooks, data])
      }

      setFormData(emptyForm)
      setEditingId(null)
      setMessage(isEditing ? 'Book updated successfully.' : 'Book added successfully.')
    } catch {
      setMessage('Unable to connect to the backend server.')
    }
  }

  function handleEdit(book) {
    if (!isAdmin) return

    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn || '',
      category: book.genre || '',
      available: book.status === 'available'
    })

    setEditingId(book._id)
    setMessage('')
  }

  async function handleDelete(id) {
    if (!isAdmin || !token) return

    setMessage('')

    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const data = await response.json()
        setMessage(data.message || data.error || 'Unable to delete book.')
        return
      }

      setBooks((currentBooks) =>
        currentBooks.filter((book) => book._id !== id)
      )

      if (editingId === id) {
        setEditingId(null)
        setFormData(emptyForm)
      }

      setMessage('Book deleted successfully.')
    } catch {
      setMessage('Unable to connect to the backend server.')
    }
  }

  function handleCancel() {
    setEditingId(null)
    setFormData(emptyForm)
  }

  return (
    <main className="book-management">
      <h1>Book Management</h1>
      <p>Browse and search the Shelf Life book collection.</p>

      {message && <p role="status">{message}</p>}

      {!token ? (
        <p>Sign in to access the book collection.</p>
      ) : (
        <>
          <input
            type="search"
            placeholder="Search by title, author, ISBN, or category"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {isAdmin && (
            <section>
              <h2>{editingId !== null ? 'Edit Book' : 'Add Book'}</h2>

              <form onSubmit={handleSubmit}>
                <label htmlFor="book-title">Title</label>
                <input
                  id="book-title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="book-author">Author</label>
                <input
                  id="book-author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="book-isbn">ISBN</label>
                <input
                  id="book-isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="book-category">Category</label>
                <input
                  id="book-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />

                <label>
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                  />
                  Available
                </label>

                <button type="submit">
                  {editingId !== null ? 'Save Changes' : 'Add Book'}
                </button>

                {editingId !== null && (
                  <button type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                )}
              </form>
            </section>
          )}

          <section>
            <h2>Book Collection</h2>

            {loading ? (
              <p>Loading books...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Category</th>
                    <th>Availability</th>
                    {isAdmin && <th>Actions</th>}
                  </tr>
                </thead>

                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book._id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>{book.genre}</td>
                      <td>
                        {book.status === 'available' ? 'Available' : 'Borrowed'}
                      </td>

                      {isAdmin && (
                        <td>
                          <button
                            type="button"
                            onClick={() => handleEdit(book)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(book._id)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}

                  {filteredBooks.length === 0 && (
                    <tr>
                      <td colSpan={isAdmin ? 6 : 5}>
                        No books found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </main>
  )
}

export default BookManagement
