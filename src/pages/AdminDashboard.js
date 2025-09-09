import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBuilding, FaTrashAlt, FaPlusCircle, FaPaperPlane, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [newBiz, setNewBiz] = useState({ name: '', email: '', password: '', package: '' });
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [campaignMsg, setCampaignMsg] = useState('');

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/businesses');
    setBusinesses(res.data);
  };

  const registerBusiness = async () => {
    const plans = { basic: 1, premium: 2, gold: 3 };
    const plan_id = plans[newBiz.package];
    if (!plan_id) return alert('Select valid package');

    try {
      await axios.post('http://localhost:5000/api/admin/businesses', {
        name: newBiz.name,
        email: newBiz.email,
        password: newBiz.password,
        plan_id
      });
      alert('✅ Business registered');
      setNewBiz({ name: '', email: '', password: '', package: '' });
      fetchBusinesses();
    } catch {
      alert('❌ Error registering business');
    }
  };

  const deleteBusiness = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    await axios.delete(`http://localhost:5000/api/admin/businesses/${id}`);
    setBusinesses(businesses.filter(b => b.id !== id));
  };

  const sendCampaign = async () => {
    if (!selectedBusiness || !campaignMsg) return alert('Select business and write message');
    await axios.post('http://localhost:5000/api/admin/campaign', {
      business_id: selectedBusiness,
      message: campaignMsg
    });
    alert('📤 Campaign sent!');
    setCampaignMsg('');
    setSelectedBusiness('');
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <h2 style={styles.pageTitle}>⚙️ Admin Panel</h2>

      {/* Quick Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <FaClipboardList size={24} />
          <p>{businesses.length} Businesses</p>
        </div>
        <div style={styles.statCard}>
          <FaPaperPlane size={24} />
          <p>Campaigns Ready</p>
        </div>
      </div>

      {/* Register Business */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}><FaPlusCircle /> Add Business</h3>
        <input style={styles.input} placeholder="Name" value={newBiz.name} onChange={e => setNewBiz({ ...newBiz, name: e.target.value })} />
        <input style={styles.input} placeholder="Email" value={newBiz.email} onChange={e => setNewBiz({ ...newBiz, email: e.target.value })} />
        <input style={styles.input} placeholder="Password" type="password" value={newBiz.password} onChange={e => setNewBiz({ ...newBiz, password: e.target.value })} />
        <select style={styles.input} value={newBiz.package} onChange={e => setNewBiz({ ...newBiz, package: e.target.value })}>
          <option value="">Select Package</option>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="gold">Gold</option>
        </select>
        <button style={styles.button} onClick={registerBusiness}><FaPlusCircle /> Register</button>
      </div>

      {/* Campaign Sender */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}><FaPaperPlane /> Send Campaign</h3>
        <select style={styles.input} value={selectedBusiness} onChange={e => setSelectedBusiness(e.target.value)}>
          <option value="">Select Business</option>
          {businesses.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <textarea
          style={{ ...styles.input, height: 80 }}
          placeholder="Message"
          value={campaignMsg}
          onChange={e => setCampaignMsg(e.target.value)}
        />
        <button style={styles.button} onClick={sendCampaign}><FaPaperPlane /> Send</button>
      </div>

    {/* Business Cards */}
<div style={styles.card}>
  <h3 style={styles.cardTitle}><FaBuilding /> Business List</h3>
  <div style={styles.bizList}>
    {businesses.map((b) => (
      <div key={b.id} style={styles.bizCardMobile}>
        <div style={styles.bizHeader}>
          <FaBuilding size={18} style={{ marginRight: 8 }} />
          <h4 style={styles.bizName}>{b.name}</h4>
        </div>
        <p style={styles.bizInfo}>📧 {b.email}</p>
        <p style={styles.bizInfo}>🎯 Plan: <strong>{b.package || 'basic'}</strong></p>

        <div style={styles.buttonRow}>
          <Link to={`/admin/business/${b.id}`} style={styles.linkBtn}>🔍 View</Link>
          <button onClick={() => deleteBusiness(b.id)} style={styles.deleteBtn}><FaTrashAlt /> Delete</button>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}

const olive = '#556b2f';
const bg = '#f4f5f3';
const cardBg = '#ffffff';

const styles = {
  page: {
    background: bg,
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '100vh'
  },
  pageTitle: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: olive,
    marginBottom: '1.5rem'
  },
  statsRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  statCard: {
    flex: 1,
    background: olive,
    color: '#fff',
    padding: '1rem',
    borderRadius: '14px',
    textAlign: 'center',
    fontSize: '0.95rem'
  },
  card: {
    background: cardBg,
    padding: '1.2rem',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginBottom: '1.5rem'
  },
  cardTitle: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: olive,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginBottom: '12px',
    fontSize: '1rem'
  },
  button: {
    width: '100%',
    padding: '12px',
    background: olive,
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    alignItems: 'center'
  },
  businessGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
bizList: {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginTop: '1rem'
},
bizCardMobile: {
  backgroundColor: '#fafafa',
  borderRadius: '14px',
  padding: '1rem',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column'
},
bizHeader: {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.5rem'
},
bizName: {
  fontSize: '1.1rem',
  color: olive,
  fontWeight: 600,
  margin: 0
},
bizInfo: {
  fontSize: '0.95rem',
  margin: '4px 0',
  color: '#444'
},
buttonRow: {
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.5rem'
},
linkBtn: {
  flex: 1,
  backgroundColor: olive,
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: 'bold'
},
deleteBtn: {
  flex: 1,
  backgroundColor: '#c0392b',
  color: '#fff',
  padding: '10px',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold'
}

};

export default AdminDashboard;
