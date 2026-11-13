
import { useState } from 'react'

function SignIn({ onLogin }) {
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

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.message || 'Sign in failed.')
        return
      }

      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('user', JSON.stringify(data.user))
      onLogin(data.user)

      setMessage('Signed in successfully!')
    } catch {
      setMessage('Unable to connect to the backend server.')
    }
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
