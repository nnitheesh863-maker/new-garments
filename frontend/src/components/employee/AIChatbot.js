import React, { useState, useRef, useEffect } from 'react';
import './AIChatbot.css';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you with garment production today?", sender: 'ai', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

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
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response with production-related answers
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateAIResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    let response = '';

    if (lowerText.includes('production') || lowerText.includes('target')) {
      response = "Today's production target is 1,500 pieces. Current progress is 1,250 pieces (83%). Line 1 is performing best with 95% efficiency.";
    } else if (lowerText.includes('quality') || lowerText.includes('defect')) {
      response = "Quality rate is 92% this week. Main defects are stitching errors (12%) and size issues (8%). Recommend reviewing tension settings on machines 3 and 5.";
    } else if (lowerText.includes('material') || lowerText.includes('stock')) {
      response = "Material status: Cotton fabric - 1,200m available, Polyester thread - low stock (200 spools), Buttons - sufficient stock (5,000 pieces).";
    } else if (lowerText.includes('machine') || lowerText.includes('maintenance')) {
      response = "Machine status: 42 active, 3 under maintenance. Next scheduled maintenance: MACH002 on Feb 20th. MACH005 showing unusual vibration - recommend inspection.";
    } else if (lowerText.includes('employee') || lowerText.includes('team')) {
      response = "Team status: 24 employees, 22 active today. Average efficiency: 87%. Top performers: Ravi Kumar (95%), Priya Devi (92%).";
    } else if (lowerText.includes('order') || lowerText.includes('delivery')) {
      response = "Order status: 15 active orders. 3 orders due this week. ORD001 is 90% complete, expected completion: tomorrow.";
    } else {
      response = "I understand you're asking about production. Let me check the latest data. Based on current trends, efficiency is at 85% and quality rate is 92%. How else can I assist you?";
    }

    return {
      id: Date.now(),
      text: response,
      sender: 'ai',
      timestamp: new Date()
    };
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(inputText);
    }
  };

  return (
    <div className="fade-in ai-chatbot">
      <h2 className="mb-4">
        <i className="fas fa-robot me-2"></i>
        AI Assistant
      </h2>

      <div className="chat-container glass-card">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="ai-avatar">
            <i className="fas fa-robot"></i>
          </div>
          <div className="ai-info">
            <h6>Production AI Assistant</h6>
            <span className="status online">
              <span className="status-dot"></span> Online
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender === 'user' ? 'user' : 'ai'}`}>
              {msg.sender === 'ai' && (
                <div className="message-avatar">
                  <i className="fas fa-robot"></i>
                </div>
              )}
              <div className="message-content">
                <p>{msg.text}</p>
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {msg.sender === 'user' && (
                <div className="message-avatar user-avatar">
                  <i className="fas fa-user"></i>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="message ai">
              <div className="message-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div className="message-content typing">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="chat-input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type or speak your question..."
            className="form-control"
          />
          <button
            className={`btn voice-btn ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopListening : startListening}
            title="Voice Input"
          >
            <i className="fas fa-microphone"></i>
          </button>
          <button
            className="btn btn-primary send-btn"
            onClick={() => sendMessage(inputText)}
            title="Send"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="quick-btn" onClick={() => sendMessage('Show production status')}>
            <i className="fas fa-chart-line"></i> Production
          </button>
          <button className="quick-btn" onClick={() => sendMessage('Show quality report')}>
            <i className="fas fa-check-circle"></i> Quality
          </button>
          <button className="quick-btn" onClick={() => sendMessage('Show material stock')}>
            <i className="fas fa-box"></i> Materials
          </button>
          <button className="quick-btn" onClick={() => sendMessage('Show team status')}>
            <i className="fas fa-users"></i> Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
