import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BusinessDetail() {
  const { id } = useParams(); // /admin/business/123
  const [business, setBusiness] = useState(null);
  const [templateKey, setTemplateKey] = useState('');
  const [campaignMsg, setCampaignMsg] = useState('');
  const [campaignStatus, setCampaignStatus] = useState('');

  const templates = [
    { key: 'happyHour', label: '🍻 Happy Hour! 50% off today 5–7pm' },
    { key: 'holiday', label: '🎄 Happy Holidays from us!' },
    { key: 'discount', label: '🔥 Flash Sale - 20% OFF everything' },
  ];

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/businesses/${id}`);
      setBusiness(res.data);
    } catch (err) {
      console.error('Failed to fetch business', err);
    }
  };

  const sendTemplate = async () => {
    if (!templateKey) return alert('Select a template first');
    try {
      await axios.post('http://localhost:5000/api/admin/template/send', {
        business_id: id,
        template_key: templateKey,
      });
      alert('📨 Template sent!');
      setTemplateKey('');
    } catch (err) {
      alert('❌ Failed to send template');
    }
  };

  const sendCampaign = async () => {
    if (!campaignMsg.trim()) return alert('Message required');
    try {
      await axios.post('http://localhost:5000/api/admin/campaign', {
        business_id: business.id,
        message: campaignMsg
      });
      setCampaignStatus('📨 Campaign sent successfully!');
      setCampaignMsg('');
    } catch {
      setCampaignStatus('❌ Failed to send campaign');
    }
  };

  if (!business) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🏢 {business.name}</h2>
        <p style={styles.info}><strong>Email:</strong> {business.email}</p>
        <p style={styles.info}><strong>Package:</strong> {business.package || 'basic'}</p>
      </div>

      {/* Send Template */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>📬 Send Notification Template</h3>
        <select
          value={templateKey}
          onChange={e => setTemplateKey(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Template</option>
          {templates.map(t => (
            <option key={t.key} value={t.key}>{t.label}</option>
          ))}
        </select>
        <button onClick={sendTemplate} style={styles.button}>📤 Send Template</button>
      </div>

      {/* Custom Campaign */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>📧 Send Custom Campaign</h3>
        <textarea
          value={campaignMsg}
          onChange={e => setCampaignMsg(e.target.value)}
          placeholder="Write your message..."
          style={styles.textarea}
        />
        <button onClick={sendCampaign} style={styles.button}>✉️ Send Campaign</button>
        {campaignStatus && (
          <p style={{
            marginTop: '0.75rem',
            color: campaignStatus.startsWith('❌') ? 'red' : 'green'
          }}>
            {campaignStatus}
          </p>
        )}
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
  loading: {
    padding: '2rem',
    fontSize: '1.1rem',
    fontFamily: 'Segoe UI, sans-serif'
  },
  card: {
    background: '#ffffff',
    borderRadius: '14px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginBottom: '1.5rem'
  },
  title: {
    fontSize: '1.5rem',
    color: olive,
    marginBottom: '0.5rem'
  },
  info: {
    fontSize: '1rem',
    color: '#444',
    margin: '0.4rem 0'
  },
  sectionTitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: olive
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    marginBottom: '1rem'
  },
  textarea: {
    width: '100%',
    height: '90px',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'none',
    marginBottom: '1rem'
  },
  button: {
    width: '100%',
    background: olive,
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};

export default BusinessDetail;
