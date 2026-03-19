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
              <i className="fas fa-tshirt"></i>
              <div className="landscape-logo-ring"></div>
              <div className="landscape-logo-glow"></div>
            </div>
            <h1 className="landscape-title">
              Garment<br/>
              Optimization<br/>
              <span>System</span>
            </h1>
            <p className="landscape-tagline">
              AI-Powered Production Management Platform
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
                <h2>Welcome Back</h2>
                <p>Sign in to your account</p>
              </div>

              <div className="landscape-lang">
                <button
                  className={`landscape-lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                  onClick={() => changeLanguage('en')}
                >EN</button>
                <button
                  className={`landscape-lang-btn ${i18n.language === 'ta' ? 'active' : ''}`}
                  onClick={() => changeLanguage('ta')}
                >தமிழ்</button>
                <button
                  className={`landscape-lang-btn ${i18n.language === 'hi' ? 'active' : ''}`}
                  onClick={() => changeLanguage('hi')}
                >हिंदी</button>
              </div>

              {error && (
                <div className="landscape-error">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="landscape-form">
                <div className="landscape-input">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="landscape-input">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="landscape-submit" disabled={loading}>
                  {loading ? (
                    <span className="landscape-spinner"></span>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt"></i>
                      <span>Login</span>
                    </>
                  )}
                </button>
              </form>

              <div className="landscape-links">
                <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>
                  <i className="fas fa-user-plus"></i>
                  Create Account
                </a>
              </div>

              <div className="landscape-demo">
                <div className="landscape-demo-badge">
                  <i className="fas fa-rocket"></i>
                  Demo: emp@test.com / password
                </div>
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

export default Login;
