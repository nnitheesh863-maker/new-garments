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
    for (let i = 0; i < 80; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 10,
        size: Math.random() * 25 + 5,
        duration: Math.random() * 20 + 20,
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
    <div className="fullpage-login-container">
      <div className="fullpage-bg-effects">
        <div className="gradient-sphere gradient-sphere-1"></div>
        <div className="gradient-sphere gradient-sphere-2"></div>
        <div className="gradient-sphere gradient-sphere-3"></div>
        <div className="gradient-sphere gradient-sphere-4"></div>
        <div className="gradient-sphere gradient-sphere-5"></div>
      </div>

      <div className="fullpage-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="fullpage-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 4}px ${p.color}`
            }}
          ></div>
        ))}
      </div>

      <div className="fullpage-shapes">
        <div className="fullpage-shape shape-1"></div>
        <div className="fullpage-shape shape-2"></div>
        <div className="fullpage-shape shape-3"></div>
        <div className="fullpage-shape shape-4"></div>
        <div className="fullpage-shape shape-5"></div>
        <div className="fullpage-shape shape-6"></div>
        <div className="fullpage-shape shape-7"></div>
        <div className="fullpage-shape shape-8"></div>
      </div>

      <div className="fullpage-content">
        <div className="fullpage-login-card">
          <div
            className="fullpage-glow-border"
            style={{
              background: `linear-gradient(135deg, ${glowColors[glowColor]}, ${glowColors[(glowColor + 1) % glowColors.length]}, ${glowColors[(glowColor + 2) % glowColors.length]}, ${glowColors[(glowColor + 3) % glowColors.length]})`
            }}
          ></div>

          <div className="fullpage-card-content">
            <div className="fullpage-header">
              <div className="fullpage-logo">
                <div className="fullpage-logo-icon">
                  <i className="fas fa-user-plus"></i>
                </div>
                <div className="fullpage-logo-ring"></div>
                <div className="fullpage-logo-glow"></div>
              </div>

              <div className="fullpage-title-section">
                <h1 className="fullpage-title">
                  <span className="fullpage-title-line">Create Your</span>
                  <span className="fullpage-title-line accent">Account</span>
                </h1>
                <p className="fullpage-subtitle">
                  <span>Join</span>
                  <span className="dot">•</span>
                  <span>the</span>
                  <span className="dot">•</span>
                  <span>System</span>
                </p>
              </div>
            </div>

            {error && (
              <div className="fullpage-error">
                <i className="fas fa-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="fullpage-error" style={{ background: 'rgba(34, 197, 94, 0.15)', borderColor: 'rgba(34, 197, 94, 0.4)' }}>
                <i className="fas fa-check-circle" style={{ color: '#22c55e' }}></i>
                <span style={{ color: '#86efac' }}>Registration successful! Redirecting...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="fullpage-form">
              <div className="fullpage-input-group">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <div className="fullpage-input-line"></div>
              </div>

              <div className="fullpage-input-group">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="fullpage-input-line"></div>
              </div>

              <div className="fullpage-input-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="fullpage-input-line"></div>
              </div>

              <div className="fullpage-input-group">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <div className="fullpage-input-line"></div>
              </div>

              <div className="fullpage-input-group">
                <i className="fas fa-briefcase"></i>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '20px 20px 20px 55px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '18px',
                    color: '#fff',
                    fontSize: '1.05rem',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease'
                  }}
                >
                  <option value="employee" style={{ background: '#0a0a1a' }}>Employee</option>
                  <option value="manager" style={{ background: '#0a0a1a' }}>Manager</option>
                  <option value="admin" style={{ background: '#0a0a1a' }}>Admin</option>
                </select>
                <div className="fullpage-input-line"></div>
              </div>

              <div className="fullpage-input-group">
                <i className="fas fa-building"></i>
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                />
                <div className="fullpage-input-line"></div>
              </div>

              <button type="submit" className="fullpage-submit" disabled={loading}>
                {loading ? (
                  <span className="fullpage-spinner"></span>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i>
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>

            <div className="fullpage-footer-links">
              <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                <i className="fas fa-arrow-left"></i>
                Back to Login
              </a>
            </div>

            <div className="fullpage-powered">
              <div className="fullpage-powered-line"></div>
              <span>Powered by AI</span>
              <div className="fullpage-powered-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
