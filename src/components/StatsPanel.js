import './StatsPanel.css';

function StatsPanel({ customers }) {
  const total = customers.length;
  const stamps = customers.filter(c => c.reward_type === 'stamps').length;
  const payback = customers.filter(c => c.reward_type === 'payback').length;
  const onetime = customers.filter(c => c.reward_type === 'onetime').length;

  return (
    <div className="stats-grid">
      <div className="stat-box total">
        <h2>{total}</h2>
        <p>Total Customers</p>
      </div>
      <div className="stat-box stamps">
        <h2>{stamps}</h2>
        <p>Stamps Users</p>
      </div>
      <div className="stat-box payback">
        <h2>{payback}</h2>
        <p>Payback Users</p>
      </div>
      <div className="stat-box onetime">
        <h2>{onetime}</h2>
        <p>One-Time Users</p>
      </div>
    </div>
  );
}

export default StatsPanel;
