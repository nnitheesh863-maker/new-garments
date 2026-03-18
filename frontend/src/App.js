import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AuthContext } from './context/AuthContext';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, changeLanguage }}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                user?.role === 'admin' ? <AdminDashboard /> :
                user?.role === 'manager' ? <ManagerDashboard /> :
                <EmployeeDashboard />
              }
            />
            <Route
              path="employee/*"
              element={
                <ProtectedRoute allowedRoles={['employee', 'manager', 'admin']}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="manager/*"
              element={
                <ProtectedRoute allowedRoles={['manager', 'admin']}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
