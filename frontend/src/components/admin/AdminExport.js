import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5006/api';

const AdminExport = () => {
  const [data, setData] = useState({
    employees: [],
    materials: [],
    production: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedExport, setSelectedExport] = useState('employees');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [empRes, matRes, prodRes] = await Promise.all([
        axios.get(`${API_URL}/employees`),
        axios.get(`${API_URL}/materials`),
        axios.get(`${API_URL}/production`)
      ]);
      
      setData({
        employees: empRes.data,
        materials: matRes.data,
        production: prodRes.data
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    let csvContent = headers.join(',') + '\n';
    
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        if (value instanceof Date) {
          return `"${value.toISOString()}"`;
        } else if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        } else if (typeof value === 'string' && value.includes(',')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      });
      csvContent += values.join(',') + '\n';
    });

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

  const getExportData = () => {
    switch(selectedExport) {
      case 'employees': return data.employees;
      case 'materials': return data.materials;
      case 'production': return data.production;
      default: return [];
    }
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">
        <i className="fas fa-file-export me-2"></i>
        Admin Data Export
      </h2>

      <div className="row">
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Select Data Type</h5>
            <div className="list-group">
              <button
                className={`list-group-item list-group-item-action ${selectedExport === 'employees' ? 'active' : ''}`}
                onClick={() => setSelectedExport('employees')}
              >
                <i className="fas fa-users me-2"></i>
                Employees ({data.employees.length})
              </button>
              <button
                className={`list-group-item list-group-item-action ${selectedExport === 'materials' ? 'active' : ''}`}
                onClick={() => setSelectedExport('materials')}
              >
                <i className="fas fa-box me-2"></i>
                Materials ({data.materials.length})
              </button>
              <button
                className={`list-group-item list-group-item-action ${selectedExport === 'production' ? 'active' : ''}`}
                onClick={() => setSelectedExport('production')}
              >
                <i className="fas fa-tshirt me-2"></i>
                Production ({data.production.length})
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Export {selectedExport.charAt(0).toUpperCase() + selectedExport.slice(1)}</h5>
            <div className="d-flex gap-2 mb-3">
              <button
                className="btn btn-success"
                onClick={() => exportToCSV(getExportData(), selectedExport)}
                disabled={loading}
              >
                <i className="fas fa-file-csv me-2"></i>
                Export CSV
              </button>
              <button
                className="btn btn-primary"
                onClick={() => exportToCSV(getExportData(), selectedExport)}
                disabled={loading}
              >
                <i className="fas fa-file-excel me-2"></i>
                Export Excel
              </button>
            </div>
            
            <div className="table-responsive" style={{ maxHeight: '300px', overflow: 'auto' }}>
              <table className="table table-sm">
                <thead>
                  <tr>
                    {getExportData().length > 0 && Object.keys(getExportData()[0]).slice(0, 5).map(key => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getExportData().slice(0, 5).map((row, idx) => (
                    <tr key={idx}>
                      {Object.keys(row).slice(0, 5).map(key => (
                        <td key={key}>
                          {typeof row[key] === 'object' && row[key] !== null 
                            ? JSON.stringify(row[key]).substring(0, 20) + '...'
                            : String(row[key] || '-').substring(0, 20)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <small className="text-muted">
              Showing first 5 of {getExportData().length} records
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminExport;
