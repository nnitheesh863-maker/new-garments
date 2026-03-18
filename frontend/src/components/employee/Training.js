import React, { useState } from 'react';

const Training = () => {
  const [activeTab, setActiveTab] = useState('available');

  const availableCourses = [
    { id: 'C001', title: 'Machine Operation Basics', duration: '2 hours', instructor: 'Training Dept', status: 'available' },
    { id: 'C002', title: 'Quality Standards', duration: '1.5 hours', instructor: 'Quality Team', status: 'available' },
    { id: 'C003', title: 'Safety Training', duration: '1 hour', instructor: 'Safety Officer', status: 'available' },
    { id: 'C004', title: 'Advanced Stitching Techniques', duration: '3 hours', instructor: 'Master Tailor', status: 'available' }
  ];

  const completedCourses = [
    { id: 'C101', title: 'Basic Sewing', completed: '2024-01-10', score: 95 },
    { id: 'C102', title: 'Fabric Types', completed: '2024-01-05', score: 88 }
  ];

  return (
    <div className="fade-in">
      <h2 className="mb-4">Training & Development</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'available' ? 'active' : ''}`} onClick={() => setActiveTab('available')}>
                  Available Courses
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>
                  Completed
                </button>
              </li>
            </ul>

            {activeTab === 'available' && (
              <div className="row">
                {availableCourses.map(course => (
                  <div key={course.id} className="col-md-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="card-title">{course.title}</h6>
                        <p className="card-text text-muted small">
                          <i className="fas fa-clock me-1"></i>{course.duration}<br />
                          <i className="fas fa-user me-1"></i>{course.instructor}
                        </p>
                        <button className="btn btn-sm btn-primary">Start Course</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Completed</th>
                      <th>Score</th>
                      <th>Certificate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedCourses.map(course => (
                      <tr key={course.id}>
                        <td>{course.title}</td>
                        <td>{course.completed}</td>
                        <td>{course.score}%</td>
                        <td><button className="btn btn-sm btn-outline-primary">View</button></td>
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
            <h5>Progress</h5>
            <div className="mb-3">
              <p>Overall Progress</p>
              <div className="progress">
                <div className="progress-bar" style={{ width: '45%' }}>45%</div>
              </div>
            </div>
            <div className="mb-3">
              <p>Skill Improvement</p>
              <div className="progress">
                <div className="progress-bar bg-success" style={{ width: '70%' }}>70%</div>
              </div>
            </div>
            <h6 className="mt-4">Recommended Training</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Advanced Quality Control</li>
              <li className="list-group-item">Machine Maintenance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
