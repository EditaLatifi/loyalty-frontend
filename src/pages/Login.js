import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const res = await axios.post('https://loyalty-backend-mu.vercel.app/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🌿 Welcome Back</h2>
        <p style={styles.subtitle}>Access your business dashboard</p>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
}

const oliveDark = '#2e402c';
const oliveBright = '#a5d6a7';

const styles = {
  container: {
    height: '100vh',
    background: `linear-gradient(135deg, ${oliveDark}, #1b1e1b)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
    padding: '20px'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.06)',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25)',
    width: '100%',
    maxWidth: '400px',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    textAlign: 'center'
  },
  title: {
    fontSize: '1.7rem',
    marginBottom: '0.5rem',
    color: oliveBright,
    fontWeight: 600
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#bbb',
    marginBottom: '1.5rem'
  },
  input: {
    width: '90%',
    padding: '12px',
    marginBottom: '14px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    background: '#1f1f1f',
    color: '#fff',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '12px',
    background: `linear-gradient(to right, ${oliveBright}, #6aa972)`,
    color: '#1b1e1b',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease'
  },
  error: {
    color: '#ff6b6b',
    fontSize: '0.9rem',
    marginBottom: '10px'
  }
};

export default Login;
