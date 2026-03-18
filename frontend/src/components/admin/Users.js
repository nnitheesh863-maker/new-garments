import React, { useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([
    { id: 'EMP001', name: 'Ravi Kumar', email: 'ravi@test.com', role: 'employee', department: 'Production', status: 'active' },
    { id: 'EMP002', name: 'Priya Devi', email: 'priya@test.com', role: 'employee', department: 'Production', status: 'active' },
    { id: 'MGR001', name: 'Manager A', email: 'mgr@test.com', role: 'manager', department: 'Management', status: 'active' },
    { id: 'ADM001', name: 'Admin User', email: 'admin@test.com', role: 'admin', department: 'IT', status: 'active' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'employee', department: '' });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUser = (e) => {
    e.preventDefault();
    const user = {
      id: 'EMP' + Date.now().toString().slice(-6),
      ...newUser,
      status: 'active'
    };
    setUsers([...users, user]);
    setShowModal(false);
    setNewUser({ name: '', email: '', role: 'employee', department: '' });
  };

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Management</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus me-1"></i> Add User
        </button>
      </div>

      <div className="dashboard-card">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge bg-${
                      user.role === 'admin' ? 'danger' :
                      user.role === 'manager' ? 'warning' : 'info'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.department}</td>
                  <td><span className={`badge bg-${user.status === 'active' ? 'success' : 'secondary'}`}>{user.status}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New User</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={addUser}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" value={newUser.name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={newUser.email} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label>Role</label>
                    <select name="role" className="form-control" value={newUser.role} onChange={handleChange}>
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Department</label>
                    <input type="text" name="department" className="form-control" value={newUser.department} onChange={handleChange} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add User</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
