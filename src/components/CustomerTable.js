import { useTable } from 'react-table';
import { useMemo } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import './CustomerTable.css';

function CustomerTable({ customers }) {
  const handleSend = async (id) => {
    try {
      await axios.post('http://localhost:5000/api/notifications/send', {
        customer_id: id
      });
      alert('✅ Notification sent!');
    } catch {
      alert('❌ Failed to send notification');
    }
  };

  const columns = useMemo(() => [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    {
      Header: 'Reward Type',
      accessor: 'reward_type',
      Cell: ({ value }) => {
        const colors = {
          payback: '#3498db',
          stamps: '#2ecc71',
          onetime: '#e67e22'
        };
        return (
          <span className="reward-badge" style={{ background: colors[value] || '#ccc' }}>
            {value}
          </span>
        );
      }
    },
   
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: customers });

  return (
    <div className="table-container">
      <table {...getTableProps()} className="responsive-table">
        <thead>
          {headerGroups.map(group => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map(col => (
                <th {...col.getHeaderProps()}>
                  {col.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} data-label={cell.column.Header}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
