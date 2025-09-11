import { useEffect, useState } from 'react';
import axios from 'axios';
import StatsPanel from '../components/StatsPanel';
import NotificationSender from '../components/NotificationSender';
import CustomerTable from '../components/CustomerTable';
import ChartsPanel from '../components/ChartsPanel';
import { useBusiness } from '../utils/useBusiness';
import WalletCardButton from '../components/WalletCardButton';

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const business = useBusiness();

useEffect(() => {
  const fetchCustomers = async () => {
    const token = localStorage.getItem("token");
    const business_id = localStorage.getItem("business_id"); // 👈 get business id

    try {
      const res = await axios.get(
        `http://localhost:5000/api/customers?business_id=${business_id}`, // 👈 pass it
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to load customers", err);
    }
  };
  fetchCustomers();
}, []);


  const planColors = {
    Normal: '#d3d3d3',
    Premium: '#4b8df8',
    Gold: '#ffd700'
  };

  const topColor = planColors[business?.plan_name] || '#ccc';

  return (
    <div style={styles.page}>
      {/* Top banner */}
      <div style={{ height: '6px', background: topColor, borderRadius: '6px' }} />

      <header style={styles.header}>
        <h1 style={styles.heading}>📊 Business Dashboard</h1>
        <span style={styles.subHeading}>
          Welcome back, <strong>{business?.name || "Business Owner"}</strong>
        </span>
      </header>

      {/* Stats Panel */}
      <div style={styles.card}>
        <StatsPanel customers={customers} />
      </div>

      {/* Charts only if advanced rewards enabled */}
      {business?.features?.advanced_rewards && (
        <div style={styles.card}>
          <ChartsPanel customers={customers} />
        </div>
      )}

      {/* Notifications */}
      {business?.features?.notifications && (
        <div style={styles.card}>
          <NotificationSender />
        </div>
      )}

      {/* Customer List */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>📋 Customer List</h3>
        <CustomerTable customers={customers} />
      </div>

      {/* Wallet Card Generator */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>🎟 Wallet Card Generator</h3>
        <p style={styles.text}>
          Generate Apple/Google Wallet cards for customers. Scanning these cards will track visits and rewards.
        </p>
        <WalletCardButton customerId={1} />
      </div>
    </div>
  );
}

const olive = '#556b2f';

const styles = {
  page: {
    padding: '2rem',
    background: '#f9fafb',
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '100vh'
  },
  header: {
    marginBottom: '1.5rem'
  },
  heading: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: olive,
    marginBottom: '0.5rem'
  },
  subHeading: {
    fontSize: '1rem',
    color: '#666'
  },
  sectionTitle: {
    fontSize: '1.3rem',
    marginBottom: '1rem',
    fontWeight: '600',
    color: olive
  },
  text: {
    fontSize: '0.95rem',
    color: '#444',
    marginBottom: '1rem'
  },
  card: {
    background: '#ffffff',
    borderRadius: '14px',
    padding: '1.8rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s ease',
  }
};

export default Dashboard;
