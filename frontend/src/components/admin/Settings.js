import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: 'Garment Manufacturing Co.',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    workingHours: '9:00 AM - 6:00 PM',
    leavePolicy: '12 Casual, 10 Sick, 15 Earned',
    overtimeRate: '1.5x'
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const saveSettings = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">System Settings</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Company Configuration</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Company Name</label>
                <input type="text" name="companyName" className="form-control" value={settings.companyName} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label>Currency</label>
                <select name="currency" className="form-control" value={settings.currency} onChange={handleChange}>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Timezone</label>
                <select name="timezone" className="form-control" value={settings.timezone} onChange={handleChange}>
                  <option value="Asia/Kolkata">IST (India)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Working Hours</label>
                <input type="text" name="workingHours" className="form-control" value={settings.workingHours} onChange={handleChange} />
              </div>
            </div>
            <button className="btn btn-primary" onClick={saveSettings}>Save Settings</button>
          </div>

          <div className="dashboard-card mt-4">
            <h5>Leave Policy</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Casual Leave</label>
                <input type="number" className="form-control" defaultValue="12" />
              </div>
              <div className="col-md-4 mb-3">
                <label>Sick Leave</label>
                <input type="number" className="form-control" defaultValue="10" />
              </div>
              <div className="col-md-4 mb-3">
                <label>Earned Leave</label>
                <input type="number" className="form-control" defaultValue="15" />
              </div>
            </div>
            <button className="btn btn-primary">Update Policy</button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>System Info</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Version:</strong> 1.0.0
              </li>
              <li className="list-group-item">
                <strong>Database:</strong> MongoDB
              </li>
              <li className="list-group-item">
                <strong>API Status:</strong> <span className="badge bg-success">Active</span>
              </li>
              <li className="list-group-item">
                <strong>Last Backup:</strong> Today 2:00 AM
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
