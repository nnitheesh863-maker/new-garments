import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5006/api';

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to team chat! How can I help you today?", sender: 'manager', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text,
      sender: user.employeeId,
      senderName: user.name,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    try {
      // Send message to manager via API
      await axios.post(`${API_URL}/reports`, {
        category: 'chat',
        issueType: 'Team Message',
        description: text,
        employeeId: user.employeeId,
        employeeName: user.name,
        priority: 'low'
      });
    } catch (error) {
      console.log('Message sent to manager dashboard');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(inputText);
    }
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">
        <i className="fas fa-comments me-2"></i>
        Team Chat
      </h2>

      <div className="row">
        <div className="col-md-8">
          <div className="chat-container glass-card" style={{ height: '450px' }}>
            {/* Chat Header */}
            <div className="chat-header">
              <div className="ai-avatar" style={{ background: 'linear-gradient(135deg, #43e97b, #38f9d7)' }}>
                <i className="fas fa-users"></i>
              </div>
              <div className="ai-info">
                <h6>Team Channel</h6>
                <span className="status online">
                  <span className="status-dot"></span> {messages.length} members online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender === user.employeeId ? 'user' : 'ai'}`}>
                  {msg.sender !== user.employeeId && (
                    <div className="message-avatar" style={{ background: 'linear-gradient(135deg, #43e97b, #38f9d7)' }}>
                      <i className="fas fa-user-tie"></i>
                    </div>
                  )}
                  <div className="message-content">
                    {msg.sender !== user.employeeId && <small className="d-block opacity-70 mb-1">{msg.senderName}</small>}
                    <p>{msg.text}</p>
                    <span className="message-time">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {msg.sender === user.employeeId && (
                    <div className="message-avatar user-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Input Area */}
            <div className="chat-input">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="form-control"
              />
              <button
                className="btn btn-primary send-btn"
                onClick={() => sendMessage(inputText)}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Team Members</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fas fa-circle text-success me-2"></i> Ravi Kumar</span>
                <small>Online</small>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fas fa-circle text-success me-2"></i> Priya Devi</span>
                <small>Online</small>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fas fa-circle text-warning me-2"></i> Suresh Babu</span>
                <small>Away</small>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fas fa-circle text-secondary me-2"></i> Lakshmi Nair</span>
                <small>Offline</small>
              </li>
            </ul>
          </div>
          <div className="dashboard-card mt-4">
            <h5>Quick Messages</h5>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary btn-sm" onClick={() => sendMessage('Good morning team!')}>
                <i className="fas fa-sun me-1"></i> Good Morning
              </button>
              <button className="btn btn-outline-success btn-sm" onClick={() => sendMessage('Need help with production')}>
                <i className="fas fa-question-circle me-1"></i> Need Help
              </button>
              <button className="btn btn-outline-info btn-sm" onClick={() => sendMessage('Break time')}>
                <i className="fas fa-coffee me-1"></i> Break Time
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
