import { useState } from 'react';
import axios from 'axios';

function AddCustomer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rewardType, setRewardType] = useState('stamps');
  const [qrCode, setQrCode] = useState(null);
  const [saveUrl, setSaveUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
const business_id = localStorage.getItem('business_id');

    setLoading(true);
    setError('');
    setQrCode(null);
    setSaveUrl('');

    try {
      const res = await axios.post(
        'https://loyalty-backend-mu.vercel.app/api/customers/add',
        { name, email, reward_type: rewardType, business_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const customer = res.data.customer;
      setQrCode(res.data.qrCode);

      const walletRes = await axios.get(
        `https://loyalty-backend-mu.vercel.app/api/wallet/generate-link/${customer.id}`
      );
      setSaveUrl(walletRes.data.saveUrl);
    } catch {
      setError('❌ Failed to add customer or generate wallet link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>➕ Add New Customer</h2>

        {error && <div style={styles.error}>{error}</div>}

        <input
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Customer Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <select
          value={rewardType}
          onChange={(e) => setRewardType(e.target.value)}
          style={styles.select}
        >
          <option value="stamps">🎯 Stamps</option>
          <option value="payback">💸 Payback</option>
          <option value="onetime">🎁 One-Time Gift</option>
        </select>

        <button onClick={handleAdd} disabled={loading} style={styles.button}>
          {loading ? 'Adding...' : 'Add Customer'}
        </button>

        {qrCode && (
          <div style={styles.qrWrap}>
            <h4 style={styles.qrTitle}>Customer QR Code</h4>
            <img src={qrCode} alt="QR Code" style={styles.qrImg} />
          </div>
        )}

        {saveUrl && (
          <button
            onClick={() => window.open(saveUrl, '_blank')}
            style={styles.walletBtn}
          >
            🎟 Save to Wallet
          </button>
        )}
      </div>
    </div>
  );
}

const olive = '#556b2f';

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    bacground:'olive',
    background: '#f4f5f3',
    height:"100vh",
    fontFamily: 'Segoe UI, sans-serif'
  },
  card: {
    background: '#fff',
    padding: '24px',
    borderRadius: '14px',
    maxWidth: '420px',
    width: '100%',    background: '#f4f5f3',
    maxHeight:"300px",
    boxShadow: '0 8px 16px rgba(0,0,0,0.06)'
  },
  title: {
    fontSize: '1.4rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: olive
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  select: {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    width: '100%',
    background: olive,
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '16px'
  },
  error: {
    backgroundColor: '#ffe6e6',
    color: '#b20000',
    padding: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '1rem'
  },
  qrWrap: {
    textAlign: 'center',
    marginTop: '1rem'
  },
  qrTitle: {
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#333'
  },
  qrImg: {
    width: '160px',
    height: '160px',
    borderRadius: '8px'
  },
  walletBtn: {
    width: '100%',
    marginTop: '16px',
    padding: '12px',
    background: '#03dac5',
    color: '#000',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};

export default AddCustomer;
