import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    department: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        size: Math.random() * 10 + 5,
        duration: Math.random() * 10 + 10
      });
    }
    setParticles(newParticles);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Animated Background */}
      <div className="animated-bg">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`
            }}
          ></div>
        ))}
      </div>

      {/* Glassmorphism Card */}
      <div className="glass-card">
        <div className="glow-effect"></div>
        <div className="glass-inner">
          <div className="login-header">
            <div className="logo-container">
              <i className="fas fa-user-plus fa-3x"></i>
              <div className="logo-glow"></div>
            </div>
            <h2>Create Account</h2>
            <p>Join the Garment Production System</p>
          </div>

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              Registration successful! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <div className="input-glow"></div>
            </div>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="input-glow"></div>
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="input-glow"></div>
            </div>
            <div className="input-group">
              <i className="fas fa-phone"></i>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleChange}
              />
              <div className="input-glow"></div>
            </div>
            <div className="input-group">
              <i className="fas fa-briefcase"></i>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '15px 15px 15px 45px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="employee" style={{ background: '#1a1a2e' }}>Employee</option>
                <option value="manager" style={{ background: '#1a1a2e' }}>Manager</option>
                <option value="admin" style={{ background: '#1a1a2e' }}>Admin</option>
              </select>
              <div className="input-glow"></div>
            </div>
            <div className="input-group">
              <i className="fas fa-building"></i>
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
              />
              <div className="input-glow"></div>
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <i className="fas fa-user-plus"></i>
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="form-footer">
            <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
              <i className="fas fa-arrow-left"></i> Back to Login
            </a>
          </div>
        </div>
      </div>

      {/* Floating shapes for decoration */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
};

export default Register;
