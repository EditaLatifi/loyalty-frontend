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
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/customers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCustomers(res.data);
      } catch (err) {
        console.error('Failed to load customers', err);
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
      <div style={{ height: '5px', background: topColor }} />

      <h1 style={styles.heading}>📊 Business Dashboard</h1>

      <div style={styles.card}>
        <StatsPanel customers={customers} />
      </div>

      {business?.features?.advanced_rewards && (
        <div style={styles.card}>
          <ChartsPanel customers={customers} />
        </div>
      )}

      {business?.features?.notifications && (
        <div style={styles.card}>
          <NotificationSender />
        </div>
      )}

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>📋 Customer List</h3>
        <CustomerTable customers={customers} />
      </div>
        <div>
      <h2>Wallet Card Generator</h2>
      <WalletCardButton customerId={1} />
    </div>
    </div>
  );
}

const olive = '#556b2f';

const styles = {
  page: {
    padding: '1.5rem',
    background: '#f4f5f3',
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '100vh'
  },
  heading: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: olive,
    marginBottom: '1.5rem'
  },
  sectionTitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: olive
  },
  card: {
    background: '#ffffff',
    borderRadius: '14px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }
};

export default Dashboard;
