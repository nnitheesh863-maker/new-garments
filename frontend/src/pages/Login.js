import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5006/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const [glowColor, setGlowColor] = useState(0);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { i18n } = useTranslation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
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
                <i className="fas fa-tshirt"></i>
              </div>
              <div className="logo-glow animated-logo-glow"></div>
              <div className="logo-ring"></div>
            </div>
            <h1 className="app-title animated-title">
              <span className="title-word">Garment</span>
              <span className="title-word">Optimization</span>
              <span className="title-word">System</span>
            </h1>
            <p className="app-subtitle animated-subtitle">
              <span className="subtitle-word">AI</span>
              <span className="subtitle-word">Powered</span>
              <span className="subtitle-word">Production</span>
            </p>
          </div>

          <div className="language-switcher animated-switcher">
            <button
              className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
            >
              <span>English</span>
            </button>
            <button
              className={`lang-btn ${i18n.language === 'ta' ? 'active' : ''}`}
              onClick={() => changeLanguage('ta')}
            >
              <span>தமிழ்</span>
            </button>
            <button
              className={`lang-btn ${i18n.language === 'hi' ? 'active' : ''}`}
              onClick={() => changeLanguage('hi')}
            >
              <span>हिंदी</span>
            </button>
          </div>

          {error && (
            <div className="error-message animated-error">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group animated-input">
              <i className="fas fa-envelope icon-pulse"></i>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glow-input"
              />
              <div className="input-glow"></div>
              <div className="input-border-anim"></div>
            </div>
            <div className="input-group animated-input" style={{animationDelay: '0.1s'}}>
              <i className="fas fa-lock icon-pulse"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                  <i className="fas fa-sign-in-alt btn-icon"></i>
                  <span className="btn-text">Login</span>
                  <div className="btn-glow"></div>
                </>
              )}
            </button>
          </form>

          <div className="form-footer animated-footer">
            <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>
              <span className="footer-text">Create New Account</span>
              <i className="fas fa-arrow-right footer-icon"></i>
            </a>
          </div>

          <div className="demo-credentials animated-credentials">
            <div className="credentials-glow"></div>
            <p><strong>Demo Login:</strong></p>
            <p className="credential-text">emp@test.com / password</p>
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

export default Login;
