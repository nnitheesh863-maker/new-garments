import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Create floating particles
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
              <i className="fas fa-tshirt fa-3x"></i>
              <div className="logo-glow"></div>
            </div>
            <h2>Garment Production System</h2>
            <p>AI-Powered Management Platform</p>
          </div>

          <div className="language-switcher">
            <button
              className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
            >EN</button>
            <button
              className={`lang-btn ${i18n.language === 'ta' ? 'active' : ''}`}
              onClick={() => changeLanguage('ta')}
            >தமிழ்</button>
            <button
              className={`lang-btn ${i18n.language === 'hi' ? 'active' : ''}`}
              onClick={() => changeLanguage('hi')}
            >हिंदी</button>
          </div>

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="input-glow"></div>
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="input-glow"></div>
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </>
              )}
            </button>
          </form>

          <div className="form-footer">
            <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>
              Create New Account <i className="fas fa-arrow-right"></i>
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

export default Login;
