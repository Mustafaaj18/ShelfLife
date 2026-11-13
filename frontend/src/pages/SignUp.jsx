
import { useState } from 'react'

function SignUp({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')
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
    setError('')
    setMessage('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Registration failed.')
        return
      }

      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('user', JSON.stringify(data.user))
      onLogin(data.user)

      setMessage('Account created successfully!')
    } catch {
      setError('Unable to connect to the backend server.')
    }
  }

  return (
    <main className="signup-page">
      <h1>Create an Account</h1>
      <p>Sign up to become a Shelf Life library member.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
          minLength={8}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          minLength={8}
          required
        />

        {error && <p role="alert">{error}</p>}
        {message && <p role="status">{message}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </main>
  )
}

export default SignUp
