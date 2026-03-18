import React, { useState } from 'react';

const TeamOverview = () => {
  const [teamMembers] = useState([
    { id: 'EMP001', name: 'Ravi Kumar', status: 'active', todayProduction: 45, efficiency: 88, quality: 'A', overtime: 2 },
    { id: 'EMP002', name: 'Priya Devi', status: 'active', todayProduction: 52, efficiency: 92, quality: 'A', overtime: 1 },
    { id: 'EMP003', name: 'Suresh Babu', status: 'on-break', todayProduction: 38, efficiency: 75, quality: 'B', overtime: 0 },
    { id: 'EMP004', name: 'Lakshmi Nair', status: 'active', todayProduction: 48, efficiency: 85, quality: 'A', overtime: 1.5 },
    { id: 'EMP005', name: 'Kumar Raj', status: 'on-leave', todayProduction: 0, efficiency: 0, quality: '-', overtime: 0 }
  ]);

  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="fade-in">
      <h2 className="mb-4">Team Overview</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Status</th>
                    <th>Today's Production</th>
                    <th>Efficiency</th>
                    <th>Quality</th>
                    <th>Overtime</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map(member => (
                    <tr key={member.id} onClick={() => setSelectedMember(member)} style={{ cursor: 'pointer' }}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2" style={{ width: '30px', height: '30px' }}>
                            {member.name.charAt(0)}
                          </div>
                          {member.name}
                        </div>
                      </td>
                      <td>
                        <span className={`badge bg-${
                          member.status === 'active' ? 'success' :
                          member.status === 'on-break' ? 'warning' : 'secondary'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td>{member.todayProduction}</td>
                      <td>
                        <div className="progress" style={{ height: '20px', width: '80px' }}>
                          <div className={`progress-bar bg-${member.efficiency >= 80 ? 'success' : member.efficiency >= 60 ? 'warning' : 'danger'}`}
                               style={{ width: `${member.efficiency}%` }}>
                            {member.efficiency}%
                          </div>
                        </div>
                      </td>
                      <td><span className={`badge bg-${member.quality === 'A' ? 'success' : 'warning'}`}>{member.quality}</span></td>
                      <td>{member.overtime}h</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1" title="Message">
                          <i className="fas fa-comment"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-info" title="Details">
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Team Summary</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Total Team Members</span>
                <strong>{teamMembers.length}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Active Today</span>
                <strong>{teamMembers.filter(m => m.status === 'active').length}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total Production</span>
                <strong>{teamMembers.reduce((sum, m) => sum + m.todayProduction, 0)}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Avg Efficiency</span>
                <strong>
                  {Math.round(teamMembers.filter(m => m.efficiency > 0).reduce((sum, m) => sum + m.efficiency, 0) / teamMembers.filter(m => m.efficiency > 0).length)}%
                </strong>
              </li>
            </ul>
          </div>

          {selectedMember && (
            <div className="dashboard-card mt-4">
              <h6>{selectedMember.name}</h6>
              <div className="mt-3">
                <p><strong>Status:</strong> {selectedMember.status}</p>
                <p><strong>Today's Output:</strong> {selectedMember.todayProduction}</p>
                <p><strong>Efficiency:</strong> {selectedMember.efficiency}%</p>
                <p><strong>Quality:</strong> Grade {selectedMember.quality}</p>
              </div>
              <div className="mt-3">
                <button className="btn btn-sm btn-primary me-1">Message</button>
                <button className="btn btn-sm btn-info">View Profile</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;
