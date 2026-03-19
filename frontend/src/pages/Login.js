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
                  <i className="fas fa-tshirt"></i>
                </div>
                <div className="fullpage-logo-ring"></div>
                <div className="fullpage-logo-glow"></div>
              </div>

              <div className="fullpage-title-section">
                <h1 className="fullpage-title">
                  <span className="fullpage-title-line">Garment Optimization</span>
                  <span className="fullpage-title-line accent">System</span>
                </h1>
                <p className="fullpage-subtitle">
                  <span>AI</span>
                  <span className="dot">•</span>
                  <span>Powered</span>
                  <span className="dot">•</span>
                  <span>Production</span>
                </p>
              </div>
            </div>

            <div className="fullpage-language">
              <button
                className={`fullpage-lang ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
              <button
                className={`fullpage-lang ${i18n.language === 'ta' ? 'active' : ''}`}
                onClick={() => changeLanguage('ta')}
              >
                தமிழ்
              </button>
              <button
                className={`fullpage-lang ${i18n.language === 'hi' ? 'active' : ''}`}
                onClick={() => changeLanguage('hi')}
              >
                हिंदी
              </button>
            </div>

            {error && (
              <div className="fullpage-error">
                <i className="fas fa-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="fullpage-form">
              <div className="fullpage-input-group">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="fullpage-input-line"></div>
              </div>

              <div className="fullpage-input-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="fullpage-input-line"></div>
              </div>

              <button type="submit" className="fullpage-submit" disabled={loading}>
                {loading ? (
                  <span className="fullpage-spinner"></span>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    <span>Login</span>
                  </>
                )}
              </button>
            </form>

            <div className="fullpage-footer-links">
              <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>
                <i className="fas fa-user-plus"></i>
                Create New Account
              </a>
            </div>

            <div className="fullpage-demo">
              <div className="fullpage-demo-badge">
                <i className="fas fa-rocket"></i>
                Demo Account
              </div>
              <div className="fullpage-demo-credentials">
                <span>emp@test.com</span>
                <span className="separator">|</span>
                <span>password</span>
              </div>
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

export default Login;
