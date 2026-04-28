import React from 'react';
import { useApp } from '../context/AppContext';
import PatientPage from '../pages/PatientPage';
import NursePage from '../pages/NursePage';
import DietitianPage from '../pages/DietitianPage';
import KitchenPage from '../pages/KitchenPage';
import AdminPage from '../pages/AdminPage';
import Button from './ui/Button';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { user, role, logout } = useApp();

  const getRolePage = () => {
    switch (role) {
      case 'patient':
        return <PatientPage />;
      case 'nurse':
        return <NursePage />;
      case 'dietitian':
        return <DietitianPage />;
      case 'kitchen':
        return <KitchenPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <img src="/logo.png" alt="HDF" className="header-logo" />
            <h1>HDF MealCare</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{role?.toUpperCase()}</span>
            </div>
            <Button variant="danger" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {getRolePage()}
      </main>
    </div>
  );
}
