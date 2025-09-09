import { useState } from 'react';
import axios from 'axios';

function NotificationSender() {
  const [message, setMessage] = useState('');

  const sendToAll = async () => {
    if (!message.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/notifications/broadcast', { message });
      alert('Notification sent to all customers!');
      setMessage('');
    } catch (err) {
      alert('Failed to send broadcast.');
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>📨 Send Notification to All Customers</h3>
      <textarea
        rows={3}
        style={{ width: '100%', padding: '0.5rem' }}
        placeholder="Enter your message (e.g. Happy Hour, Menu Update)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendToAll} style={{ padding: '0.5rem 1rem', marginTop: '0.5rem' }}>
        Send Notification
      </button>
    </div>
  );
}

export default NotificationSender;
