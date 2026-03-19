import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5006/api';

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
  const [glowColor, setGlowColor] = useState(0);
  const navigate = useNavigate();

  const glowColors = [
    '#667eea', '#764ba2', '#f093fb', '#4facfe',
    '#43e97b', '#fa709a', '#a18cd1', '#fbc2eb'
  ];

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setGlowColor((prev) => (prev + 1) % glowColors.length);
    }, 2000);

    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#4facfe',
      '#43e97b', '#fa709a', '#a18cd1', '#fbc2eb',
      '#667eea', '#764ba2', '#f093fb', '#4facfe'
    ];

    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        size: Math.random() * 20 + 5,
        duration: Math.random() * 15 + 15,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 1
      });
    }
    setParticles(newParticles);

    return () => clearInterval(colorInterval);
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
      <div className="animated-gradient-bg">
        <div className="gradient-sphere gradient-sphere-1"></div>
        <div className="gradient-sphere gradient-sphere-2"></div>
        <div className="gradient-sphere gradient-sphere-3"></div>
      </div>

      <div className="animated-bg">
        <div className="gradient-overlay"></div>
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              background: p.color,
              boxShadow: `0 0 ${p.size}px ${p.color}`
            }}
          ></div>
        ))}
      </div>

      <div className="floating-shapes">
        <div className="shape shape-1 animated-shape"></div>
        <div className="shape shape-2 animated-shape"></div>
        <div className="shape shape-3 animated-shape"></div>
        <div className="shape shape-4 animated-shape"></div>
        <div className="shape shape-5 animated-shape"></div>
        <div className="shape shape-6 animated-shape"></div>
      </div>

      <div className="login-card">
        <div
          className="glow-effect animated-glow"
          style={{
            background: `linear-gradient(135deg, ${glowColors[glowColor]}, ${glowColors[(glowColor + 1) % glowColors.length]}, ${glowColors[(glowColor + 2) % glowColors.length]})`
          }}
        ></div>
        <div className="login-inner">
          <div className="login-header">
            <div className="logo-container">
              <div className="logo-icon animated-logo">
                <i className="fas fa-user-plus"></i>
              </div>
              <div className="logo-glow animated-logo-glow"></div>
              <div className="logo-ring"></div>
            </div>
            <h1 className="app-title animated-title">
              <span className="title-word">Create</span>
              <span className="title-word">Your</span>
              <span className="title-word">Account</span>
            </h1>
            <p className="app-subtitle animated-subtitle">
              <span className="subtitle-word">Join</span>
              <span className="subtitle-word">the</span>
              <span className="subtitle-word">System</span>
            </p>
          </div>

          {error && (
            <div className="error-message animated-error">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <span>Registration successful! Redirecting to login...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group animated-input">
              <i className="fas fa-user icon-pulse"></i>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="glow-input"
              />
              <div className="input-glow"></div>
              <div className="input-border-anim"></div>
            </div>
            <div className="input-group animated-input" style={{animationDelay: '0.1s'}}>
              <i className="fas fa-envelope icon-pulse"></i>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="glow-input"
              />
              <div className="input-glow"></div>
              <div className="input-border-anim"></div>
            </div>
            <div className="input-group animated-input" style={{animationDelay: '0.2s'}}>
              <i className="fas fa-lock icon-pulse"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="glow-input"
              />
              <div className="input-glow"></div>
              <div className="input-border-anim"></div>
            </div>
            <div className="input-group animated-input" style={{animationDelay: '0.3s'}}>
              <i className="fas fa-phone icon-pulse"></i>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleChange}
                className="glow-input"
              />
              <div className="input-glow"></div>
              <div className="input-border-anim"></div>
            </div>
            <div className="input-group animated-input" style={{animationDelay: '0.4s'}}>
              <i className="fas fa-briefcase icon-pulse"></i>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="glow-input"
                style={{
                  width: '100%',
                  padding: '16px 20px 16px 50px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease'
                }}
              >
                <option value="employee" style={{ background: '#0a0a1a' }}>Employee</option>
                <option value="manager" style={{ background: '#0a0a1a' }}>Manager</option>
                <option value="admin" style={{ background: '#0a0a1a' }}>Admin</option>
              </select>
              <div className="input-glow"></div>
              <div className="input-border-anim"></div>
            </div>
            <div className="input-group animated-input" style={{animationDelay: '0.5s'}}>
              <i className="fas fa-building icon-pulse"></i>
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="glow-input"
              />
              <div className="input-glow"></div>
              <div className="input-border-anim"></div>
            </div>
            <button type="submit" className="login-btn animated-btn" disabled={loading}>
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <i className="fas fa-user-plus btn-icon"></i>
                  <span className="btn-text">Create Account</span>
                  <div className="btn-glow"></div>
                </>
              )}
            </button>
          </form>

          <div className="form-footer animated-footer">
            <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
              <i className="fas fa-arrow-left footer-icon"></i>
              <span className="footer-text">Back to Login</span>
            </a>
          </div>

          <div className="login-footer">
            <div className="footer-line"></div>
            <span>Powered by AI</span>
            <div className="footer-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
