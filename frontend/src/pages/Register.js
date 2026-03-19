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
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        size: Math.random() * 20 + 3,
        duration: Math.random() * 25 + 25,
        color: colors[Math.floor(Math.random() * colors.length)]
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
    <div className="landscape-login-container">
      <div className="landscape-bg-effects">
        <div className="landscape-gradient gradient-1"></div>
        <div className="landscape-gradient gradient-2"></div>
        <div className="landscape-gradient gradient-3"></div>
        <div className="landscape-gradient gradient-4"></div>
        <div className="landscape-gradient gradient-5"></div>
      </div>

      <div className="landscape-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="landscape-particle"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`
            }}
          ></div>
        ))}
      </div>

      <div className="landscape-content">
        <div className="landscape-left">
          <div className="landscape-brand">
            <div className="landscape-logo">
              <i className="fas fa-user-plus"></i>
              <div className="landscape-logo-ring"></div>
              <div className="landscape-logo-glow"></div>
            </div>
            <h1 className="landscape-title">
              Join<br/>
              Our<br/>
              <span>Team</span>
            </h1>
            <p className="landscape-tagline">
              Create your account and start managing production
            </p>
            <div className="landscape-features">
              <div className="landscape-feature">
                <i className="fas fa-chart-line"></i>
                <span>Analytics</span>
              </div>
              <div className="landscape-feature">
                <i className="fas fa-robot"></i>
                <span>AI Assistant</span>
              </div>
              <div className="landscape-feature">
                <i className="fas fa-video"></i>
                <span>Training</span>
              </div>
              <div className="landscape-feature">
                <i className="fas fa-comments"></i>
                <span>Team Chat</span>
              </div>
            </div>
          </div>
        </div>

        <div className="landscape-right">
          <div className="landscape-card">
            <div 
              className="landscape-card-border"
              style={{
                background: `linear-gradient(135deg, ${glowColors[glowColor]}, ${glowColors[(glowColor + 1) % glowColors.length]}, ${glowColors[(glowColor + 2) % glowColors.length]})`
              }}
            ></div>
            
            <div className="landscape-card-content">
              <div className="landscape-card-header">
                <h2>Create Account</h2>
                <p>Sign up to get started</p>
              </div>

              {error && (
                <div className="landscape-error">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="landscape-error" style={{ background: 'rgba(34, 197, 94, 0.15)', borderColor: 'rgba(34, 197, 94, 0.4)' }}>
                  <i className="fas fa-check-circle" style={{ color: '#22c55e' }}></i>
                  <span style={{ color: '#86efac' }}>Registration successful! Redirecting...</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="landscape-form">
                <div className="landscape-input">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="landscape-input">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="landscape-input">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="landscape-input">
                  <i className="fas fa-phone"></i>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="landscape-input">
                  <i className="fas fa-briefcase"></i>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '18px 18px 18px 50px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '14px',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  >
                    <option value="employee" style={{ background: '#0a0a1a' }}>Employee</option>
                    <option value="manager" style={{ background: '#0a0a1a' }}>Manager</option>
                    <option value="admin" style={{ background: '#0a0a1a' }}>Admin</option>
                  </select>
                </div>

                <div className="landscape-input">
                  <i className="fas fa-building"></i>
                  <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="landscape-submit" disabled={loading}>
                  {loading ? (
                    <span className="landscape-spinner"></span>
                  ) : (
                    <>
                      <i className="fas fa-user-plus"></i>
                      <span>Create Account</span>
                    </>
                  )}
                </button>
              </form>

              <div className="landscape-links">
                <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                  <i className="fas fa-arrow-left"></i>
                  Back to Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="landscape-footer">
        <span>Powered by AI</span>
        <span>•</span>
        <span>Garment Optimization System</span>
        <span>•</span>
        <span>2024</span>
      </div>
    </div>
  );
};

export default Register;
