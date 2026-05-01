import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ROLES, getDemoCredentials } from '../data/demo';
import ThemeToggle from './ThemeToggle';
import '../styles/Login.css';

const roles = [
  { id: 'patient', label: '👤 Patient' },
  { id: 'nurse', label: '👨‍⚕️ Nurse' },
  { id: 'dietitian', label: '🥗 Dietitian' },
  { id: 'kitchen', label: '👨‍🍳 Kitchen' },
  { id: 'admin', label: '⚙️ Administrator' }
];

export default function Login() {
  const { login } = useApp();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    login(roleId);
  };

  return (
    <div className="login-screen">
      <ThemeToggle />
      <div className="login-card">
        <div className="login-logo">
          <img 
            src="/logo.png" 
            alt="HDF Logo" 
            className="login-logo-img"
          />
          <div className="login-logo-text">
            <h1>HDF MealCare</h1>
            <span>Smart Nutrition System</span>
          </div>
        </div>

        <p className="login-subtitle">
          Choose your role to access the system
        </p>

        <div className="role-grid">
          {roles.slice(0, 4).map(role => (
            <button
              key={role.id}
              className={`role-btn ${selectedRole === role.id ? 'active' : ''}`}
              onClick={() => handleRoleSelect(role.id)}
              title={getDemoCredentials(role.id)}
            >
              <span className="role-icon">{ROLES[role.id].icon}</span>
              <span className="role-label">{role.label}</span>
            </button>
          ))}
        </div>

        <button
          className={`role-btn admin-btn ${selectedRole === 'admin' ? 'active' : ''}`}
          onClick={() => handleRoleSelect('admin')}
          title={getDemoCredentials('admin')}
        >
          <span className="role-icon">{ROLES.admin.icon}</span>
          <span className="role-label">{roles[4].label}</span>
        </button>

        {selectedRole && (
          <div className="credentials-box">
            <strong>{ROLES[selectedRole].icon} {ROLES[selectedRole].label}:</strong>
            <p>{getDemoCredentials(selectedRole)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
