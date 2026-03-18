import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout, changeLanguage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    const commonItems = [
      { icon: 'fa-home', text: 'Dashboard', path: '/dashboard' },
    ];

    if (user?.role === 'employee') {
      return [
        ...commonItems,
        { icon: 'fa-tshirt', text: 'Production Entry', path: '/employee/production' },
        { icon: 'fa-box', text: 'Material Tracking', path: '/employee/materials' },
        { icon: 'fa-cogs', text: 'Machine Report', path: '/employee/machines' },
        { icon: 'fa-exclamation-circle', text: 'Report Issue', path: '/employee/report-issue' },
        { icon: 'fa-dollar-sign', text: 'Salary', path: '/employee/salary' },
        { icon: 'fa-calendar', text: 'Leaves', path: '/employee/leaves' },
        { icon: 'fa-graduation-cap', text: 'Training', path: '/employee/training' },
        { icon: 'fa-video', text: 'Videos', path: '/employee/videos' },
        { icon: 'fa-robot', text: 'AI Assistant', path: '/employee/ai-assistant' },
        { icon: 'fa-comments', text: 'Chat', path: '/employee/chat' },
        { icon: 'fa-chart-bar', text: 'Reports', path: '/employee/reports' },
        { icon: 'fa-chart-line', text: 'Analytics', path: '/employee/analytics' },
      ];
    }

    if (user?.role === 'manager') {
      return [
        ...commonItems,
        { icon: 'fa-users', text: 'Team Overview', path: '/manager/team' },
        { icon: 'fa-tshirt', text: 'Production', path: '/manager/production' },
        { icon: 'fa-box', text: 'Materials', path: '/manager/materials' },
        { icon: 'fa-cogs', text: 'Machines', path: '/manager/machines' },
        { icon: 'fa-check-circle', text: 'Quality', path: '/manager/quality' },
        { icon: 'fa-calendar', text: 'Leaves', path: '/manager/leaves' },
        { icon: 'fa-chart-line', text: 'Analytics', path: '/manager/analytics' },
        { icon: 'fa-briefcase', text: 'Orders', path: '/manager/orders' },
        { icon: 'fa-bell', text: 'Reports', path: '/manager/reports' },
        { icon: 'fa-comments', text: 'Team Chat', path: '/manager/team-chat' },
        { icon: 'fa-chart-pie', text: 'Analytics', path: '/manager/manager-analytics' },
        { icon: 'fa-file-export', text: 'Export Data', path: '/manager/export' },
      ];
    }

    return [
      ...commonItems,
      { icon: 'fa-users', text: 'User Management', path: '/admin/users' },
      { icon: 'fa-cog', text: 'Settings', path: '/admin/settings' },
      { icon: 'fa-database', text: 'Master Data', path: '/admin/master-data' },
      { icon: 'fa-chart-bar', text: 'Reports', path: '/admin/reports' },
      { icon: 'fa-shield', text: 'Compliance', path: '/admin/compliance' },
      { icon: 'fa-robot', text: 'AI Models', path: '/admin/ai-models' },
      { icon: 'fa-file-export', text: 'Export Data', path: '/admin/export' },
    ];
  };

  return (
    <div className="dashboard-layout">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <button
            className="btn btn-link text-white d-lg-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <a className="navbar-brand" href="/">
            <i className="fas fa-tshirt me-2"></i>Garment System
          </a>
          <div className="navbar-nav ms-auto align-items-center">
            <div className="language-switcher me-3">
              <button
                className={`btn btn-sm ${i18n.language === 'en' ? 'btn-light' : 'btn-outline-light'}`}
                onClick={() => changeLanguage('en')}
              >EN</button>
              <button
                className={`btn btn-sm ${i18n.language === 'ta' ? 'btn-light' : 'btn-outline-light'}`}
                onClick={() => changeLanguage('ta')}
              >தமிழ்</button>
              <button
                className={`btn btn-sm ${i18n.language === 'hi' ? 'btn-light' : 'btn-outline-light'}`}
                onClick={() => changeLanguage('hi')}
              >हिंदी</button>
            </div>
            <span className="nav-link text-white me-2">
              {user?.name} <span className="badge bg-light text-dark ms-1">{user?.role}</span>
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> {t('logout')}
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className={`col-md-2 sidebar bg-dark text-white min-vh-100 p-0 ${sidebarOpen ? '' : 'd-none d-md-block'}`}>
            <div className="sidebar-menu p-3">
              <ul className="nav flex-column">
                {getMenuItems().map((item, index) => (
                  <li className="nav-item" key={index}>
                    <a
                      className={`nav-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                      href={item.path}
                      onClick={(e) => { e.preventDefault(); navigate(item.path); }}
                    >
                      <i className={`fas ${item.icon} me-2`}></i>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-10 main-content p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
