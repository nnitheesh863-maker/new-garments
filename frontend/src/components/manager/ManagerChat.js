import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5006/api';

const ManagerChat = () => {
  const [messages, setMessages] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/reports`);
      const allReports = response.data;
      
      // Filter chat messages
      const chatMsgs = allReports.filter(r => r.category === 'chat');
      setMessages(allReports);
      setChatMessages(chatMsgs);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (reportId, status) => {
    try {
      await axios.put(`${API_URL}/reports/${reportId}`, { status });
      loadMessages();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">
        <i className="fas fa-comments me-2"></i>
        Team Messages
        {chatMessages.filter(m => m.status === 'pending').length > 0 && (
          <span className="badge bg-danger ms-2">
            {chatMessages.filter(m => m.status === 'pending').length} New
          </span>
        )}
      </h2>

      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Recent Messages from Employees</h5>
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status"></div>
              </div>
            ) : chatMessages.length === 0 ? (
              <p className="text-center text-muted py-4">No messages yet</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>Message</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chatMessages.map((msg) => (
                      <tr key={msg.id} className={msg.status === 'pending' ? 'table-warning' : ''}>
                        <td>
                          <strong>{msg.employeeName}</strong>
                          <br />
                          <small className="text-muted">{msg.employeeId}</small>
                        </td>
                        <td>{msg.description}</td>
                        <td>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td>
                          <span className={`badge bg-${msg.status === 'pending' ? 'warning' : 'success'}`}>
                            {msg.status}
                          </span>
                        </td>
                        <td>
                          {msg.status === 'pending' && (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => updateMessageStatus(msg.id, 'read')}
                            >
                              <i className="fas fa-check"></i> Mark Read
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>AI Analytics Summary</h5>
            <div className="ai-summary">
              <div className="summary-item">
                <i className="fas fa-chart-line text-primary"></i>
                <div>
                  <strong>Production Trend</strong>
                  <p className="mb-0 small text-muted">↑ 5% from last week</p>
                </div>
              </div>
              <div className="summary-item">
                <i className="fas fa-check-circle text-success"></i>
                <div>
                  <strong>Quality Rate</strong>
                  <p className="mb-0 small text-muted">92% - Excellent</p>
                </div>
              </div>
              <div className="summary-item">
                <i className="fas fa-exclamation-triangle text-warning"></i>
                <div>
                  <strong>Issues Detected</strong>
                  <p className="mb-0 small text-muted">3 pending - Review needed</p>
                </div>
              </div>
              <div className="summary-item">
                <i className="fas fa-users text-info"></i>
                <div>
                  <strong>Team Performance</strong>
                  <p className="mb-0 small text-muted">87% average efficiency</p>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-card mt-4">
            <h5>Alerts</h5>
            <div className="alert alert-warning mb-2">
              <small><i className="fas fa-exclamation-triangle me-1"></i> Low stock on polyester thread</small>
            </div>
            <div className="alert alert-info">
              <small><i className="fas fa-tools me-1"></i> 2 machines need maintenance</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerChat;
