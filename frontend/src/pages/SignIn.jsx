
import { useState } from 'react'

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    setMessage('Sign-in form completed. Authentication will be available when the backend is connected.')
  }

  return (
    <main className="signin-page">
      <h1>Sign In</h1>
      <p>Sign in to your Shelf Life account.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {message && <p role="status">{message}</p>}

        <button type="submit">Sign In</button>
      </form>
    </main>
  )
}

export default SignIn
