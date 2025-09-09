import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logoWrap}>
        <span style={styles.logo}> Loyality</span>
        <button onClick={() => setOpen(!open)} style={styles.menuBtn}>
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      <div style={{ ...styles.links, display: open ? 'flex' : 'none' }}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/add-customer" style={styles.link}>Add Customer</Link>
        <Link to="/scan" style={styles.link}>Scan QR</Link>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </nav>
  );
}

const olive = '#556b2f';

const styles = {
  nav: {
    backgroundColor: olive,
    color: '#fff',
    padding: '12px 20px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif'
  },
  logoWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#fff'
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    display: 'block'
  },
  links: {
    flexDirection: 'column',
    gap: '12px',
    marginTop: '12px'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'background 0.2s ease',
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  logout: {
    backgroundColor: '#fff',
    color: olive,
    border: 'none',
    fontWeight: 'bold',
    padding: '8px 14px',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};

export default Navbar;
