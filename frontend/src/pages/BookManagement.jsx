
import { useState } from 'react'

const initialBooks = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    category: 'Fiction',
    available: true
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780061120084',
    category: 'Fiction',
    available: false
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    category: 'Fiction',
    available: true
  }
]

const emptyForm = {
  title: '',
  author: '',
  isbn: '',
  category: '',
  available: true
}

function BookManagement({ role }) {
  const [books, setBooks] = useState(initialBooks)
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const isAdmin = role === 'admin'

  const filteredBooks = books.filter((book) =>
    [book.title, book.author, book.isbn, book.category]
      .some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      )
  )

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!isAdmin) return

    if (editingId !== null) {
      setBooks(books.map((book) =>
        book.id === editingId
          ? { ...formData, id: editingId }
          : book
      ))
    } else {
      setBooks([
        ...books,
        {
          ...formData,
          id: Date.now()
        }
      ])
    }

    setFormData(emptyForm)
    setEditingId(null)
  }

  function handleEdit(book) {
    if (!isAdmin) return

    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      available: book.available
    })

    setEditingId(book.id)
  }

  function handleDelete(id) {
    if (!isAdmin) return

    setBooks(books.filter((book) => book.id !== id))

    if (editingId === id) {
      setEditingId(null)
      setFormData(emptyForm)
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
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.category}</td>
                <td>{book.available ? 'Available' : 'Borrowed'}</td>

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
                      onClick={() => handleDelete(book.id)}
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
      </section>
    </main>
  )
}

export default BookManagement
