import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      })
      if (res.data.success) {
        setIsLoggedIn(true)
        navigate('/dashboard')
      }
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Lead Manager</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.hint}>Demo: admin / admin123</p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#000'
  },
  box: {
    background: '#fff',
    padding: '40px',
    borderRadius: '10px',
    width: '350px',
    textAlign: 'center'
  },
  title: {
    marginBottom: '30px',
    fontSize: '24px'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px'
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginBottom: '10px'
  },
  hint: {
    marginTop: '20px',
    fontSize: '12px',
    color: '#666'
  }
}

export default Login