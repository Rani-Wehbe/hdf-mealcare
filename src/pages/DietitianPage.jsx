import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { PATIENTS, MEALS } from '../data/demo';
import '../styles/pages/DietitianPage.css';

/**
 * Dietitian Dashboard Page
 * Nutrition planning, patient monitoring, and menu management
 */
export default function DietitianPage() {
  const [activeTab, setActiveTab] = useState('patients');

  return (
    <div className="dietitian-page">
      {/* Tab Navigation */}
      <div className="dietitian-tabs">
        <button
          className={`tab-btn ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          👥 Patient Nutrition
        </button>
        <button
          className={`tab-btn ${activeTab === 'menus' ? 'active' : ''}`}
          onClick={() => setActiveTab('menus')}
        >
          🍽️ Menu Management
        </button>
      </div>

      {activeTab === 'patients' && <PatientNutritionTab />}
      {activeTab === 'menus' && <MenuManagementTab />}
    </div>
  );
}

/**
 * Patient Nutrition Tab
 */
function PatientNutritionTab() {
  const trendData = [65, 70, 68, 75, 72, 78, 80];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxTrend = Math.max(...trendData);

  const pendingApprovals = [
    {
      id: 1,
      patient: 'Pierre Karam',
      room: '217',
      request: 'Lamb Ouzi (restricted)',
      diet: 'Soft Foods',
      reason: 'Special occasion',
    },
    {
      id: 2,
      patient: 'Nada Saab',
      room: '218',
      request: 'Extra lentil soup',
      diet: 'Low Calorie',
      reason: 'Patient requested',
    },
  ];

  return (
    <div className="dietitian-section">
      <div className="section-header">
        <h2>
          Patient <span className="gold-accent">Nutrition Dashboard</span>
        </h2>
        <p>Monitor meal selections, dietary compliance, and appetite trends</p>
      </div>

      {/* Alert Bar */}
      <div className="alert-bar danger">
        <span>🔔</span>
        <div>
          <strong>2 alerts:</strong> Patient in Room 218 hasn't eaten in 2 days · Patient in Room 211 lost 3kg this week
        </div>
      </div>

      {/* Main Grid */}
      <div className="content-grid-2">
        {/* Approval Queue */}
        <Card elevation="elevated">
          <div className="card-title">📋 Approval Queue</div>
          <div className="approval-queue">
            {pendingApprovals.map((approval) => (
              <ApprovalItem key={approval.id} approval={approval} />
            ))}
          </div>
        </Card>

        {/* Trend Chart */}
        <Card elevation="elevated">
          <div className="card-title">📈 Ward Appetite Trends</div>
          <p className="chart-description">Average % of meal consumed over past 7 days</p>
          <div className="trend-chart">
            {trendData.map((val, idx) => (
              <div key={idx} className="trend-bar-col">
                <div className="trend-bar-wrapper">
                  <div
                    className="trend-bar"
                    style={{
                      height: `${Math.round((val / maxTrend) * 120)}px`,
                      backgroundColor: val >= 75 ? '#2A7B7B' : val >= 65 ? '#B8933A' : '#8C1F28',
                    }}
                    title={`${val}%`}
                  />
                </div>
                <span className="trend-label">{days[idx]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Patient List */}
      <Card elevation="elevated">
        <div className="card-title">👥 Patient List</div>
        <div className="patient-list-container">
          <div className="patient-row-header">
            <div className="col-patient">Patient</div>
            <div className="col-room">Room</div>
            <div className="col-diet">Diet Plan</div>
            <div className="col-appetite">Appetite</div>
            <div className="col-meal">Last Meal</div>
            <div className="col-action">Action</div>
          </div>

          {PATIENTS.map((patient) => (
            <PatientRow key={patient.id} patient={patient} />
          ))}
        </div>
      </Card>
    </div>
  );
}

/**
 * Approval Item Component
 */
function ApprovalItem({ approval }) {
  const isRestricted = approval.request.includes('restricted');

  return (
    <div className={`approval-item ${isRestricted ? 'restricted' : ''}`}>
      <div className="approval-header">
        <div className="approval-patient">
          <strong>{approval.patient}</strong>
          <span className="approval-room">Room {approval.room}</span>
        </div>
        <Badge variant={isRestricted ? 'error' : 'warning'}>
          {isRestricted ? '⛔ Restricted' : '⚠️ Pending'}
        </Badge>
      </div>
      <div className="approval-request">{approval.request}</div>
      <div className="approval-meta">
        <span>{approval.diet}</span>
        <span>•</span>
        <span>{approval.reason}</span>
      </div>
      <div className="approval-actions">
        <Button variant="primary" size="sm">
          ✓ Approve
        </Button>
        <Button variant="secondary" size="sm">
          ✗ Deny
        </Button>
      </div>
    </div>
  );
}

/**
 * Patient Row in Nutrition List
 */
function PatientRow({ patient }) {
  const getAppetiteColor = (appetite) => {
    if (appetite >= 70) return '#2A7B7B';
    if (appetite >= 40) return '#B8933A';
    return '#8C1F28';
  };

  return (
    <div className="patient-row">
      <div className="col-patient">
        {patient.alert && <span className="alert-indicator">🚨</span>}
        {patient.name}
      </div>
      <div className="col-room">{patient.room}</div>
      <div className="col-diet">{patient.diet}</div>
      <div className="col-appetite">
        <div className="appetite-mini" style={{ background: getAppetiteColor(patient.appetite) }}>
          {patient.appetite}%
        </div>
      </div>
      <div className="col-meal">{patient.lastMeal}</div>
      <div className="col-action">
        <Button variant="secondary" size="sm">
          Edit Plan
        </Button>
      </div>
    </div>
  );
}

/**
 * Menu Management Tab
 */
function MenuManagementTab() {
  const dietTemplates = [
    { name: 'Standard Diet', desc: 'Balanced nutrition, no restrictions', meals: 6 },
    { name: 'Low Sodium', desc: 'Reduced salt intake', meals: 5 },
    { name: 'Diabetic Diet', desc: 'Controlled carbs, balanced meals', meals: 6 },
    { name: 'Soft Foods', desc: 'Easy to chew and digest', meals: 4 },
    { name: 'Low Calorie', desc: 'Reduced portion sizes', meals: 5 },
    { name: 'High Protein', desc: 'Muscle recovery focus', meals: 6 },
  ];

  return (
    <div className="dietitian-section">
      <div className="section-header">
        <h2>
          Menu <span className="gold-accent">Management</span>
        </h2>
        <p>Approve, restrict, or modify menu items per patient or diet plan</p>
      </div>

      <div className="content-grid-2">
        {/* Menu Items */}
        <Card elevation="elevated">
          <div className="card-title">🍽️ Menu Items</div>
          <div className="menu-items-list">
            {MEALS.map((meal) => (
              <MenuItem key={meal.id} meal={meal} />
            ))}
          </div>
        </Card>

        {/* Diet Plan Templates */}
        <Card elevation="elevated">
          <div className="card-title">🛡️ Diet Plan Templates</div>
          <div className="diet-templates">
            {dietTemplates.map((template, idx) => (
              <TemplateItem key={idx} template={template} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/**
 * Menu Item Component
 */
function MenuItem({ meal }) {
  const [restricted, setRestricted] = React.useState(meal.restricted);

  return (
    <div className={`menu-item ${restricted ? 'restricted' : ''}`}>
      <div className="menu-item-header">
        <div className="menu-item-title">
          <span className="menu-emoji">{meal.emoji}</span>
          <div className="menu-info">
            <h4>{meal.name}</h4>
            <p>{meal.desc}</p>
          </div>
        </div>
        {restricted && <Badge variant="error">🚫 Restricted</Badge>}
      </div>

      <div className="menu-item-tags">
        {meal.tags.map((tag, idx) => (
          <span key={idx} className="menu-tag">
            {tag}
          </span>
        ))}
      </div>

      <Button
        variant={restricted ? 'secondary' : 'primary'}
        size="sm"
        onClick={() => setRestricted(!restricted)}
      >
        {restricted ? '🔓 Unrestrict' : '🔒 Restrict'}
      </Button>
    </div>
  );
}

/**
 * Diet Template Item
 */
function TemplateItem({ template }) {
  return (
    <div className="template-item">
      <div className="template-name">{template.name}</div>
      <div className="template-desc">{template.desc}</div>
      <div className="template-meta">{template.meals} meals/day</div>
      <Button variant="secondary" size="sm">
        View
      </Button>
    </div>
  );
}
