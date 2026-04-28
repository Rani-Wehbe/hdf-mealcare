import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import '../styles/pages/AdminPage.css';

/**
 * Admin Dashboard Page
 * System management, settings, users, and reports
 */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="admin-page">
      <PageHeader
        icon="⚙️"
        title="System Administration"
        subtitle="Manage system settings, users, and generate reports"
        actions={
          <Button variant="primary">
            ⚙️ Settings
          </Button>
        }
      />

      <div className="admin-page__grid">
        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button
            className={`admin-tab ${activeTab === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveTab('roles')}
          >
            🔐 Roles & Permissions
          </button>
          <button
            className={`admin-tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            📊 Reports
          </button>
          <button
            className={`admin-tab ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => setActiveTab('system')}
          >
            🛠️ System
          </button>
        </div>

        {/* Content Sections */}
        {activeTab === 'users' && <UsersSection />}
        {activeTab === 'roles' && <RolesSection />}
        {activeTab === 'reports' && <ReportsSection />}
        {activeTab === 'system' && <SystemSection />}
      </div>
    </div>
  );
}

/**
 * Users Management Section
 */
function UsersSection() {
  const users = [
    {
      id: 1,
      name: 'Dr. Sophie Laurent',
      email: 'sophie@hdf.fr',
      role: 'Nurse',
      status: 'active',
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jean Moreau',
      email: 'jean@hdf.fr',
      role: 'Dietitian',
      status: 'active',
      joinDate: '2024-02-20',
    },
    {
      id: 3,
      name: 'Kitchen Staff',
      email: 'kitchen@hdf.fr',
      role: 'Kitchen',
      status: 'active',
      joinDate: '2024-03-10',
    },
    {
      id: 4,
      name: 'Inactive User',
      email: 'inactive@hdf.fr',
      role: 'Patient',
      status: 'inactive',
      joinDate: '2023-12-01',
    },
  ];

  return (
    <div className="users-section">
      <div className="section-header">
        <h2 className="section-title">👥 User Management</h2>
        <Button variant="primary">➕ Add User</Button>
      </div>

      <div className="users-table">
        <div className="table-header">
          <div className="table-cell">Name</div>
          <div className="table-cell">Email</div>
          <div className="table-cell">Role</div>
          <div className="table-cell">Status</div>
          <div className="table-cell">Join Date</div>
          <div className="table-cell">Actions</div>
        </div>

        {users.map((user) => (
          <div key={user.id} className="table-row">
            <div className="table-cell">{user.name}</div>
            <div className="table-cell">{user.email}</div>
            <div className="table-cell">
              <Badge variant="info">{user.role}</Badge>
            </div>
            <div className="table-cell">
              <Badge
                variant={user.status === 'active' ? 'success' : 'warning'}
              >
                {user.status === 'active' ? '✓ Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="table-cell">{user.joinDate}</div>
            <div className="table-cell">
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Roles & Permissions Section
 */
function RolesSection() {
  const roles = [
    {
      id: 1,
      name: 'Patient',
      description: 'View own meals and dietary info',
      permissions: ['view_meals', 'view_profile', 'request_meal'],
    },
    {
      id: 2,
      name: 'Nurse',
      description: 'Monitor patient compliance',
      permissions: ['view_patients', 'edit_notes', 'generate_reports'],
    },
    {
      id: 3,
      name: 'Dietitian',
      description: 'Create meal plans',
      permissions: ['create_plans', 'manage_ingredients', 'view_analytics'],
    },
    {
      id: 4,
      name: 'Kitchen Staff',
      description: 'Manage meal preparation',
      permissions: ['view_orders', 'update_status', 'print_labels'],
    },
  ];

  return (
    <div className="roles-section">
      <h2 className="section-title">🔐 Roles & Permissions</h2>
      <div className="roles-grid">
        {roles.map((role) => (
          <Card key={role.id} className="role-card">
            <h4 className="role-card__title">{role.name}</h4>
            <p className="role-card__description">{role.description}</p>

            <div className="permissions-list">
              <p className="permissions-label">Permissions:</p>
              {role.permissions.map((perm, idx) => (
                <div key={idx} className="permission-item">
                  <span className="permission-checkbox">✓</span>
                  <span className="permission-name">{perm}</span>
                </div>
              ))}
            </div>

            <Button variant="secondary" size="sm">
              Edit Role
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * Reports Section
 */
function ReportsSection() {
  const reports = [
    {
      id: 1,
      name: 'Daily Meal Compliance',
      description: 'Patient meal adherence for the day',
      frequency: 'Daily',
    },
    {
      id: 2,
      name: 'Nutritional Analysis',
      description: 'Weekly nutritional metrics',
      frequency: 'Weekly',
    },
    {
      id: 3,
      name: 'Kitchen Efficiency',
      description: 'Meal preparation metrics',
      frequency: 'Monthly',
    },
    {
      id: 4,
      name: 'System Audit',
      description: 'User activity and access logs',
      frequency: 'Monthly',
    },
  ];

  return (
    <div className="reports-section">
      <h2 className="section-title">📊 Reports</h2>
      <div className="reports-grid">
        {reports.map((report) => (
          <Card key={report.id} className="report-card">
            <h4 className="report-card__title">{report.name}</h4>
            <p className="report-card__description">{report.description}</p>

            <div className="report-info">
              <span className="report-frequency">
                🔄 {report.frequency}
              </span>
            </div>

            <div className="report-actions">
              <Button variant="secondary" size="sm">
                View Report
              </Button>
              <Button variant="ghost" size="sm">
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * System Section
 */
function SystemSection() {
  return (
    <div className="system-section">
      <h2 className="section-title">🛠️ System Settings</h2>

      <div className="settings-grid">
        <Card className="setting-card">
          <h4 className="setting-title">Database Maintenance</h4>
          <p className="setting-description">Optimize database and cleanup old data</p>
          <Button variant="secondary">Run Maintenance</Button>
        </Card>

        <Card className="setting-card">
          <h4 className="setting-title">System Backup</h4>
          <p className="setting-description">Create system backup for recovery</p>
          <Button variant="secondary">Create Backup</Button>
        </Card>

        <Card className="setting-card">
          <h4 className="setting-title">Logs & Monitoring</h4>
          <p className="setting-description">View system logs and monitoring data</p>
          <Button variant="secondary">View Logs</Button>
        </Card>

        <Card className="setting-card">
          <h4 className="setting-title">Email Configuration</h4>
          <p className="setting-description">Configure email settings for notifications</p>
          <Button variant="secondary">Configure</Button>
        </Card>
      </div>

      <Card className="system-info">
        <h3 className="card-title">📈 System Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">System Version:</span>
            <span className="info-value">1.0.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">Last Update:</span>
            <span className="info-value">2026-04-28</span>
          </div>
          <div className="info-item">
            <span className="info-label">Database Size:</span>
            <span className="info-value">128 MB</span>
          </div>
          <div className="info-item">
            <span className="info-label">Active Users:</span>
            <span className="info-value">15</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
