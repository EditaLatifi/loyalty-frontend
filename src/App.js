import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddCustomer from './pages/AddCustomer';
import ScanQR from './pages/ScanQR';
import Navbar from './components/Navbar';
import PrivateRoute from './PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import BusinessDetail from './pages/BusinessDetail';


function App() {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {token && !isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-customer" element={<PrivateRoute><AddCustomer /></PrivateRoute>} />
        <Route path="/scan" element={<PrivateRoute><ScanQR /></PrivateRoute>} />
        <Route path="/admin" element={<AdminDashboard />} />
<Route path="/admin/business/:id" element={<BusinessDetail />} />

      </Routes>
    </>
  );
}

export default App;
