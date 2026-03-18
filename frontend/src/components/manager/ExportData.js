import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5006/api';

const ExportData = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    // Get headers from first object
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        // Handle nested objects and dates
        if (value instanceof Date) {
          return `"${value.toISOString()}"`;
        } else if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        } else if (typeof value === 'string' && value.includes(',')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvContent += values.join(',') + '\n';
    });

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = (data, filename) => {
    // For Excel, we'll create a simple HTML table that Excel can open
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    
    let excelContent = `
      <html>
        <head>
          <style>
            table { border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${headers.map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>
                  ${headers.map(h => `<td>${row[h] || ''}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">
        <i className="fas fa-file-export me-2"></i>
        Export Data
      </h2>

      <div className="row">
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5>Export Employee Data</h5>
            <p className="text-muted">Download employee details in CSV or Excel format</p>
            <div className="d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={() => exportToCSV(employees, 'employees')}
                disabled={loading}
              >
                <i className="fas fa-file-csv me-2"></i>
                Export CSV
              </button>
              <button
                className="btn btn-primary"
                onClick={() => exportToExcel(employees, 'employees')}
                disabled={loading}
              >
                <i className="fas fa-file-excel me-2"></i>
                Export Excel
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5>Data Preview</h5>
            <div className="table-responsive" style={{ maxHeight: '200px', overflow: 'auto' }}>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Dept</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.slice(0, 5).map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.employeeId}</td>
                      <td>{emp.name}</td>
                      <td><span className={`badge bg-${emp.role === 'admin' ? 'danger' : emp.role === 'manager' ? 'warning' : 'info'}`}>{emp.role}</span></td>
                      <td>{emp.department || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <small className="text-muted">Showing first 5 of {employees.length} employees</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportData;
