import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function ChartsPanel({ customers }) {
  const data = [
    { name: 'Stamps', value: customers.filter(c => c.reward_type === 'stamps').length },
    { name: 'Payback', value: customers.filter(c => c.reward_type === 'payback').length },
    { name: 'One-time', value: customers.filter(c => c.reward_type === 'onetime').length }
  ];

  const COLORS = ['#2ecc71', '#3498db', '#e74c3c'];

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>📈 Reward Type Breakdown</h3>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx={150}
          cy={100}
          outerRadius={80}
          label
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ChartsPanel;
