import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/Modal';
import { PRODUCTION, ROLES } from '../data/demo';
import '../styles/pages/AdminPage.css';

/**
 * Admin Dashboard Page
 * System overview, analytics, and reporting
 */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="admin-page">
      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
      </div>

      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'analytics' && <AnalyticsTab />}
      {activeTab === 'users' && <UserManagementTab />}
    </div>
  );
}

/**
 * Overview Tab - KPIs and Waste Analysis
 */
function OverviewTab() {
  const kpis = [
    { num: '18%', label: 'Avg Food Waste', delta: '↓ -6% vs last month', type: '' },
    { num: '$2,840', label: 'Monthly Waste Cost', delta: '↓ -$420 saved', type: 'red' },
    { num: '83%', label: 'Order Compliance', delta: '↑ +11% since launch', type: 'teal' },
    { num: '4.2★', label: 'Patient Satisfaction', delta: '↑ +0.4 stars', type: 'navy' },
  ];

  const wasteData = [22, 20, 25, 18, 17, 16, 18];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxWaste = Math.max(...wasteData);

  const insights = [
    {
      icon: '🔴',
      title: 'High waste: Lamb Ouzi',
      text: 'Consistently 35%+ waste this week. Consider reducing production by 20%.',
      type: 'danger',
    },
    {
      icon: '🟡',
      title: 'Overproduction pattern: Fridays',
      text: 'Friday lunches historically over-prepared by 12 portions on average.',
      type: '',
    },
    {
      icon: '💡',
      title: 'Portion recommendation',
      text: 'Patients on soft food diet request small portions 78% of the time.',
      type: '',
    },
    {
      icon: '✅',
      title: 'Lentil Soup performing well',
      text: 'Consistently <5% waste. High patient satisfaction. Consider adding to more services.',
      type: 'success',
    },
  ];

  const reports = [
    { icon: '📊', title: 'Weekly Waste Report', sub: 'Generated: Today', badge: 'green', status: 'Ready' },
    { icon: '📋', title: 'Monthly KPI Summary', sub: 'Period: April 2026', badge: 'blue', status: 'View' },
    { icon: '🍽️', title: 'Meal Performance Analysis', sub: 'Last 30 days', badge: 'orange', status: 'Processing' },
    { icon: '💰', title: 'Financial Loss Estimate', sub: 'Q1 2026', badge: 'blue', status: 'View' },
  ];

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>
          Administration <span className="gold-accent">Overview</span>
        </h2>
        <p>Real-time KPIs, waste analytics, and system performance</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpis.map((kpi, idx) => (
          <div key={idx} className={`stat-card ${kpi.type}`}>
            <div className="stat-num">{kpi.num}</div>
            <div className="stat-label">{kpi.label}</div>
            <div className="stat-delta up">{kpi.delta}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="content-grid-2">
        {/* Waste Analysis */}
        <Card elevation="elevated">
          <div className="card-title">🗑️ Food Waste Analysis</div>
          <div className="waste-analysis">
            <div className="donut-chart">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="54" fill="none" stroke="#f0f0f0" strokeWidth="16" />
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke="#8C1F28"
                  strokeWidth="16"
                  strokeDasharray="67.8 271.2"
                  strokeLinecap="round"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke="#B8933A"
                  strokeWidth="16"
                  strokeDasharray="40.7 271.2"
                  strokeDashoffset="-67.8"
                  strokeLinecap="round"
                />
              </svg>
              <div className="donut-center">
                <span>18%</span>
                <small>avg waste</small>
              </div>
            </div>

            <div className="waste-breakdown">
              <div className="breakdown-item">
                <div className="breakdown-label">
                  <span className="indicator red">●</span> Overproduction
                </div>
                <span className="breakdown-value">25%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '25%', backgroundColor: '#8C1F28' }} />
              </div>

              <div className="breakdown-item">
                <div className="breakdown-label">
                  <span className="indicator gold">●</span> Patient Plate Waste
                </div>
                <span className="breakdown-value">15%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '15%', backgroundColor: '#B8933A' }} />
              </div>

              <div className="breakdown-item">
                <div className="breakdown-label">
                  <span className="indicator green">●</span> Meals Consumed
                </div>
                <span className="breakdown-value">60%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </Card>

        {/* Waste Trend Chart */}
        <Card elevation="elevated">
          <div className="card-title">📈 Waste Trend (Last 7 Days)</div>
          <div className="chart-area">
            {wasteData.map((val, idx) => (
              <div key={idx} className="chart-col">
                <div className="chart-bar-wrapper">
                  <div
                    className="chart-bar"
                    style={{
                      height: `${Math.round((val / maxWaste) * 140)}px`,
                      backgroundColor: val > 22 ? '#8C1F28' : val > 18 ? '#B8933A' : '#2A7B7B',
                    }}
                  />
                </div>
                <span className="chart-label">{days[idx]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Insights and Reports */}
      <div className="content-grid-2">
        {/* Smart Insights */}
        <Card elevation="elevated">
          <div className="card-title">💡 Smart Insights</div>
          <div className="insights-list">
            {insights.map((insight, idx) => (
              <div key={idx} className={`insight-item ${insight.type}`}>
                <span className="insight-icon">{insight.icon}</span>
                <div className="insight-content">
                  <strong>{insight.title}</strong>
                  <br />
                  <span className="insight-text">{insight.text}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Reports */}
        <Card elevation="elevated">
          <div className="card-title">📄 Reports</div>
          <div className="reports-list">
            {reports.map((report, idx) => (
              <div key={idx} className="report-row">
                <span className="report-icon">{report.icon}</span>
                <div className="report-info">
                  <div className="report-title">{report.title}</div>
                  <div className="report-sub">{report.sub}</div>
                </div>
                <Button variant="secondary" size="sm">
                  {report.status}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/**
 * Analytics Tab - Demand Prediction and Success Metrics
 */
function AnalyticsTab() {
  const metrics = [
    { label: 'Reduction in Food Waste', target: '25%', current: '18%', progress: 72 },
    { label: 'Financial Loss Reduction', target: '30%', current: '15%', progress: 50 },
    { label: 'Patient Satisfaction Score', target: '4.5★', current: '4.2★', progress: 93 },
    { label: 'Meal Consumption Rate', target: '85%', current: '78%', progress: 92 },
    { label: 'Order Compliance Rate', target: '90%', current: '83%', progress: 92 },
  ];

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>
          Deep <span className="gold-accent">Analytics</span>
        </h2>
        <p>Patient satisfaction, meal performance, and demand predictions</p>
      </div>

      {/* Stats Grid */}
      <div className="kpi-grid">
        <div className="stat-card teal">
          <div className="stat-num">4.2 ★</div>
          <div className="stat-label">Avg Patient Meal Rating</div>
          <div className="stat-delta up">↑ +0.4 vs last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">83%</div>
          <div className="stat-label">Meal Selection Compliance</div>
          <div className="stat-delta up">↑ +11% since launch</div>
        </div>
        <div className="stat-card red">
          <div className="stat-num">$1,240</div>
          <div className="stat-label">Monthly Waste Cost Saved</div>
          <div className="stat-delta up">↑ Est. savings vs baseline</div>
        </div>
      </div>

      {/* Demand Prediction */}
      <Card elevation="elevated">
        <div className="card-title">🔮 Tomorrow's Demand Prediction</div>
        <p className="card-description">
          AI-assisted forecast based on current pre-orders + historical patterns
        </p>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Meal</th>
                <th>Pre-orders</th>
                <th>Predicted Total</th>
                <th>Confidence</th>
                <th>Rec. Produce</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTION.map((p) => {
                const total = p.small + p.normal + p.large;
                const pred = Math.round(total * (1 + Math.random() * 0.15));
                const conf = Math.round(80 + Math.random() * 15);
                return (
                  <tr key={p.name}>
                    <td>
                      {p.icon} {p.name}
                    </td>
                    <td>{total}</td>
                    <td>
                      <strong>{pred}</strong>
                    </td>
                    <td>
                      <Badge
                        variant={conf > 90 ? 'success' : conf > 80 ? 'warning' : 'error'}
                      >
                        {conf}%
                      </Badge>
                    </td>
                    <td className="teal-text">
                      <strong>{Math.round(pred * 1.05)}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Success Metrics */}
      <Card elevation="elevated">
        <div className="card-title">🏆 Success Metrics</div>

        <div className="metrics-list">
          {metrics.map((m, idx) => (
            <div key={idx} className="metric-item">
              <div className="metric-header">
                <span className="metric-label">{m.label}</span>
                <span className="metric-values">
                  {m.current} / <strong>{m.target}</strong>
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${m.progress > 85 ? 'success' : 'gold'}`}
                  style={{ width: `${m.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/**
 * User Management Tab - Add, Edit, Delete Users
 */
function UserManagementTab() {
  const [users, setUsers] = useState([
    { id: 1, username: 'patient1', role: 'patient', name: 'Mireille Khoury', status: 'active', email: 'patient1@hdf.com', lastLogin: 'Today' },
    { id: 2, username: 'nurse1', role: 'nurse', name: 'Fatima Hassan', status: 'active', email: 'nurse1@hdf.com', lastLogin: 'Today' },
    { id: 3, username: 'diet1', role: 'dietitian', name: 'Dr. Amira Khalil', status: 'active', email: 'diet1@hdf.com', lastLogin: 'Yesterday' },
    { id: 4, username: 'kitchen1', role: 'kitchen', name: 'Chef Mohammad', status: 'active', email: 'kitchen1@hdf.com', lastLogin: 'Today' },
    { id: 5, username: 'admin1', role: 'admin', name: 'Admin System', status: 'active', email: 'admin1@hdf.com', lastLogin: 'Today' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    role: 'patient',
    email: '',
    password: 'hdf2024',
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ username: '', name: '', role: 'patient', email: '', password: 'hdf2024' });
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      name: user.name,
      role: user.role,
      email: user.email,
      password: 'hdf2024',
    });
    setIsModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!formData.username || !formData.name || !formData.email) {
      alert('Please fill in all fields');
      return;
    }

    if (editingUser) {
      // Edit existing user
      setUsers(users.map(u =>
        u.id === editingUser.id
          ? { ...u, ...formData, lastLogin: 'Just now', status: 'active' }
          : u
      ));
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        ...formData,
        status: 'active',
        lastLogin: 'Just now',
      };
      setUsers([...users, newUser]);
    }

    setIsModalOpen(false);
    setFormData({ username: '', name: '', role: 'patient', email: '', password: 'hdf2024' });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(u =>
      u.id === userId
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ));
  };

  const permissionsByRole = {
    patient: ['View own meals', 'Rate meals', 'Request dietary changes'],
    nurse: ['View patients', 'Monitor meals', 'Log complaints', 'View patient history'],
    dietitian: ['Manage menus', 'Create meal plans', 'Approve modifications', 'Analyze nutrition'],
    kitchen: ['View production board', 'Log waste', 'Track portions', 'View timelines'],
    admin: ['View all dashboards', 'Manage users', 'View analytics', 'Generate reports'],
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>
          User <span className="gold-accent">Management</span>
        </h2>
        <p>Add, edit, and manage system users and their roles</p>
      </div>

      {/* Add User Button */}
      <div className="user-mgmt-header">
        <Button variant="primary" onClick={handleAddUser}>
          ➕ Add New User
        </Button>
        <div className="user-count">
          <strong>{users.length}</strong> Total Users
        </div>
      </div>

      {/* Users Table */}
      <Card elevation="elevated">
        <div className="card-title">👥 All Users</div>
        <div className="table-wrapper">
          <table className="data-table users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.username}</strong>
                  </td>
                  <td>{user.name}</td>
                  <td>
                    <Badge variant={user.role === 'admin' ? 'error' : 'info'}>
                      {ROLES[user.role]?.label || user.role}
                    </Badge>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <Badge variant={user.status === 'active' ? 'success' : 'warning'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td className="actions-cell">
                    <button
                      className="action-btn edit"
                      onClick={() => handleEditUser(user)}
                      title="Edit user"
                    >
                      ✏️
                    </button>
                    <button
                      className="action-btn toggle"
                      onClick={() => handleToggleStatus(user.id)}
                      title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      {user.status === 'active' ? '⏸' : '▶'}
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteUser(user.id)}
                      title="Delete user"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Role Permissions Reference */}
      <div className="permissions-grid">
        {Object.entries(ROLES).map(([roleKey, roleInfo]) => (
          <Card key={roleKey} elevation="card">
            <div className="permission-card">
              <div className="permission-header">
                <span className="role-icon">{roleInfo.icon}</span>
                <h3>{roleInfo.label}</h3>
              </div>
              <ul className="permission-list">
                {permissionsByRole[roleKey]?.map((perm, idx) => (
                  <li key={idx}>✓ {perm}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={isModalOpen}
        title={editingUser ? 'Edit User' : 'Add New User'}
        onClose={() => setIsModalOpen(false)}
        actions={[
          { label: 'Cancel', onClick: () => setIsModalOpen(false), variant: 'secondary' },
          { label: editingUser ? 'Save Changes' : 'Create User', onClick: handleSaveUser, variant: 'primary' },
        ]}
      >
        <form className="user-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="e.g., nurse1"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="e.g., Dr. Amira Khalil"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="e.g., user@hdf.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              {Object.entries(ROLES).map(([key, role]) => (
                <option key={key} value={key}>
                  {role.icon} {role.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
