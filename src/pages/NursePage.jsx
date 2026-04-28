import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { PATIENTS, MEALS } from '../data/demo';
import '../styles/pages/NursePage.css';

/**
 * Nurse Dashboard Page
 * Monitor patient meal schedules, dietary compliance, and alerts
 */
export default function NursePage() {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const alertPatients = PATIENTS.filter((p) => p.alert);
  const orderedCount = PATIENTS.filter((p) => p.status === 'Ordered').length;

  return (
    <div className="nurse-page">
      {/* Tab Navigation */}
      <div className="nurse-tabs">
        <button
          className={`tab-btn ${activeTab === 'monitoring' ? 'active' : ''}`}
          onClick={() => setActiveTab('monitoring')}
        >
          👥 Patient Monitoring
        </button>
        <button
          className={`tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          🚨 Active Alerts ({alertPatients.length})
        </button>
      </div>

      {activeTab === 'monitoring' && <MonitoringTab selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} />}
      {activeTab === 'alerts' && <AlertsTab alertPatients={alertPatients} />}
    </div>
  );
}

/**
 * Patient Monitoring Tab
 */
function MonitoringTab({ selectedPatient, setSelectedPatient }) {
  const orderedCount = PATIENTS.filter((p) => p.status === 'Ordered').length;
  const pendingCount = PATIENTS.filter((p) => p.status === 'Pending').length;
  const alertCount = PATIENTS.filter((p) => p.alert).length;

  return (
    <div className="nurse-section">
      {/* Quick Stats */}
      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-content">
            <span className="stat-icon">👥</span>
            <div className="stat-info">
              <p className="stat-label">Total Patients</p>
              <p className="stat-value">{PATIENTS.length}</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <span className="stat-icon">✓</span>
            <div className="stat-info">
              <p className="stat-label">Meals Ordered</p>
              <p className="stat-value">{orderedCount}</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <span className="stat-icon">⏳</span>
            <div className="stat-info">
              <p className="stat-label">Pending Orders</p>
              <p className="stat-value">{pendingCount}</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card alert">
          <div className="stat-content">
            <span className="stat-icon">🚨</span>
            <div className="stat-info">
              <p className="stat-label">Active Alerts</p>
              <p className="stat-value">{alertCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Patient Grid */}
      <div className="patient-cards-section">
        <div className="section-header">
          <h2>Patient Overview</h2>
          <p>Tap any card for detailed information</p>
        </div>

        <div className="patient-cards-grid">
          {PATIENTS.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              isSelected={selectedPatient?.id === patient.id}
              onSelect={setSelectedPatient}
            />
          ))}
        </div>
      </div>

      {/* Detailed Panel */}
      {selectedPatient && <PatientDetailPanel patient={selectedPatient} />}

      {/* Compliance Summary */}
      <Card elevation="elevated">
        <div className="card-title">📊 Compliance Summary</div>
        <div className="compliance-grid">
          <ComplianceItem label="Ordered" value={orderedCount} total={PATIENTS.length} color="teal" />
          <ComplianceItem label="Pending" value={pendingCount} total={PATIENTS.length} color="gold" />
          <ComplianceItem
            label="High Appetite"
            value={PATIENTS.filter((p) => p.appetite >= 70).length}
            total={PATIENTS.length}
            color="green"
          />
          <ComplianceItem
            label="Low Appetite"
            value={PATIENTS.filter((p) => p.appetite < 40).length}
            total={PATIENTS.length}
            color="red"
          />
        </div>
      </Card>
    </div>
  );
}

/**
 * Patient Card Component
 */
function PatientCard({ patient, isSelected, onSelect }) {
  const getAppetiteStatus = (appetite) => {
    if (appetite >= 70) return { color: '#2A7B7B', label: 'Good' };
    if (appetite >= 40) return { color: '#B8933A', label: 'Fair' };
    return { color: '#8C1F28', label: 'Low' };
  };

  const appetiteStatus = getAppetiteStatus(patient.appetite);

  return (
    <Card
      className={`patient-card ${isSelected ? 'selected' : ''} ${patient.alert ? 'alert' : ''}`}
      onClick={() => onSelect(patient)}
      elevation={isSelected ? 'elevated' : 'default'}
    >
      {patient.alert && <div className="alert-badge">🚨 Alert</div>}

      <div className="patient-card__header">
        <div className="room-tag">Room {patient.room}</div>
        <div className="diet-badge">{patient.diet}</div>
      </div>

      <h3 className="patient-card__name">{patient.name}</h3>

      <div className="patient-card__stats">
        <div className="stat-item">
          <span className="stat-label">Status</span>
          <span className={`stat-value ${patient.status.toLowerCase()}`}>{patient.status}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Appetite</span>
          <div className="appetite-visual">
            <div
              className="appetite-bar"
              style={{
                background: appetiteStatus.color,
                width: `${patient.appetite}%`,
              }}
            />
            <span className="appetite-text">{patient.appetite}%</span>
          </div>
        </div>
      </div>

      <div className="patient-card__footer">
        <span className="last-meal">Last: {patient.lastMeal}</span>
      </div>
    </Card>
  );
}

/**
 * Patient Detail Panel
 */
function PatientDetailPanel({ patient }) {
  const [notes, setNotes] = useState(patient.notes || '');

  return (
    <Card elevation="elevated" className="detail-panel">
      <div className="panel-header">
        <h3>Patient Details</h3>
        <p className="panel-subtitle">{patient.name} • Room {patient.room}</p>
      </div>

      <div className="panel-content">
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Patient ID</span>
            <span className="detail-value">P{String(patient.id).padStart(3, '0')}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Room</span>
            <span className="detail-value">{patient.room}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Diet Type</span>
            <span className="detail-value">{patient.diet}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status</span>
            <span className="detail-value">{patient.status}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Appetite Index</span>
            <span className="detail-value">{patient.appetite}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Last Meal</span>
            <span className="detail-value">{patient.lastMeal}</span>
          </div>
        </div>

        <div className="detail-notes">
          <label className="notes-label">Clinical Notes</label>
          <textarea className="notes-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div className="panel-actions">
          <Button variant="primary">💾 Save Notes</Button>
          <Button variant="secondary">📋 View History</Button>
          <Button variant="secondary">📧 Contact Doctor</Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Alerts Tab
 */
function AlertsTab({ alertPatients }) {
  const criticalAlerts = alertPatients.filter((p) => p.appetite < 30);
  const moderateAlerts = alertPatients.filter((p) => p.appetite >= 30 && p.appetite < 50);

  return (
    <div className="nurse-section">
      <div className="section-header">
        <h2>Active Patient Alerts</h2>
        <p>Patients requiring immediate attention or intervention</p>
      </div>

      {alertPatients.length === 0 ? (
        <Card className="empty-state">
          <p>✓ No active alerts</p>
        </Card>
      ) : (
        <>
          {/* Critical Alerts */}
          {criticalAlerts.length > 0 && (
            <Card elevation="elevated" className="alert-section critical">
              <div className="alert-section-header">
                <h3>🔴 Critical Alerts</h3>
                <Badge variant="error">{criticalAlerts.length}</Badge>
              </div>
              <div className="alerts-list">
                {criticalAlerts.map((patient) => (
                  <AlertItem key={patient.id} patient={patient} severity="critical" />
                ))}
              </div>
            </Card>
          )}

          {/* Moderate Alerts */}
          {moderateAlerts.length > 0 && (
            <Card elevation="elevated" className="alert-section moderate">
              <div className="alert-section-header">
                <h3>🟡 Moderate Alerts</h3>
                <Badge variant="warning">{moderateAlerts.length}</Badge>
              </div>
              <div className="alerts-list">
                {moderateAlerts.map((patient) => (
                  <AlertItem key={patient.id} patient={patient} severity="moderate" />
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

/**
 * Individual Alert Item
 */
function AlertItem({ patient, severity }) {
  const reason = patient.appetite < 30 ? 'Very low appetite' : patient.status === 'None' ? 'No meal ordered' : 'Low appetite';

  return (
    <div className="alert-item">
      <div className="alert-indicator">
        <span className={`alert-dot ${severity}`} />
      </div>
      <div className="alert-content">
        <div className="alert-header">
          <h4>{patient.name}</h4>
          <Badge variant={severity === 'critical' ? 'error' : 'warning'}>{reason}</Badge>
        </div>
        <div className="alert-info">
          <span>Room {patient.room}</span>
          <span>•</span>
          <span>{patient.diet}</span>
          <span>•</span>
          <span>Appetite: {patient.appetite}%</span>
        </div>
      </div>
      <div className="alert-actions">
        <Button variant="primary" size="sm">
          Take Action
        </Button>
      </div>
    </div>
  );
}

/**
 * Compliance Item Component
 */
function ComplianceItem({ label, value, total, color }) {
  const percentage = Math.round((value / total) * 100);

  return (
    <div className="compliance-item">
      <div className="compliance-header">
        <span className="compliance-label">{label}</span>
        <span className="compliance-value">
          {value}/{total}
        </span>
      </div>
      <div className="compliance-bar">
        <div className="compliance-fill" style={{ width: `${percentage}%`, backgroundColor: color }} />
      </div>
      <span className="compliance-percent">{percentage}%</span>
    </div>
  );
}
