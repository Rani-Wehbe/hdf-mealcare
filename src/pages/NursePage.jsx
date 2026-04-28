import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { PATIENTS } from '../data/demo';
import '../styles/pages/NursePage.css';

/**
 * Nurse Dashboard Page
 * Monitor patient meal schedules and dietary compliance
 */
export default function NursePage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(PATIENTS);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ordered':
        return <Badge variant="success">✓ Ordered</Badge>;
      case 'Pending':
        return <Badge variant="warning">⏳ Pending</Badge>;
      case 'None':
        return <Badge variant="error">⚠️ No Order</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="nurse-page">
      <PageHeader
        icon="👨‍⚕️"
        title="Patient Monitoring"
        subtitle="Track meal schedules and dietary compliance"
        actions={
          <Button variant="primary">
            📋 Generate Report
          </Button>
        }
      />

      <div className="nurse-page__grid">
        {/* Quick Stats */}
        <div className="stats-grid">
          <Card className="stat-card">
            <div className="stat-card__content">
              <span className="stat-card__icon">👥</span>
              <div className="stat-card__info">
                <p className="stat-card__label">Total Patients</p>
                <p className="stat-card__value">{patients.length}</p>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-card__content">
              <span className="stat-card__icon">✓</span>
              <div className="stat-card__info">
                <p className="stat-card__label">Ordered</p>
                <p className="stat-card__value">
                  {patients.filter((p) => p.status === 'Ordered').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-card__content">
              <span className="stat-card__icon">⚠️</span>
              <div className="stat-card__info">
                <p className="stat-card__label">Alerts</p>
                <p className="stat-card__value">
                  {patients.filter((p) => p.alert).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Patient List */}
        <div className="patients-section">
          <h2 className="section-title">🏥 Patient List</h2>
          <div className="patients-table">
            <div className="table-header">
              <div className="table-cell table-cell--name">Patient Name</div>
              <div className="table-cell table-cell--room">Room</div>
              <div className="table-cell table-cell--diet">Diet Type</div>
              <div className="table-cell table-cell--status">Status</div>
              <div className="table-cell table-cell--appetite">Appetite</div>
            </div>

            {patients.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                statusBadge={getStatusBadge(patient.status)}
              />
            ))}
          </div>
        </div>

        {/* Diet Notes Section */}
        <Card className="notes-section">
          <h3 className="card-title">📝 Patient Alerts</h3>
          <div className="notes-content">
            {patients.filter(p => p.alert).length > 0 ? (
              <div className="alerts-list">
                {patients.filter(p => p.alert).map((p) => (
                  <div key={p.id} className="alert-item">
                    <span className="alert-indicator">🚨</span>
                    <div className="alert-details">
                      <p className="alert-name">{p.name}</p>
                      <p className="alert-info">Room {p.room} · {p.diet}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="notes-text">No active alerts</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

/**
 * Individual patient row component
 */
function PatientRow({ patient, statusBadge }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <div className="table-row" onClick={() => setExpanded(!expanded)}>
        <div className="table-cell table-cell--name">
          <span className="patient-name">
            {patient.alert && <span className="alert-dot">🚨 </span>}
            {patient.name}
          </span>
        </div>
        <div className="table-cell table-cell--room">
          <span className="room-badge">Room {patient.room}</span>
        </div>
        <div className="table-cell table-cell--diet">
          <span className="diet-badge">{patient.diet}</span>
        </div>
        <div className="table-cell table-cell--status">{statusBadge}</div>
        <div className="table-cell table-cell--appetite">
          <div className="appetite-bar">
            <div 
              className="appetite-fill" 
              style={{ 
                width: `${patient.appetite}%`,
                background: patient.appetite < 40 ? 'var(--hdf-red)' : 
                           patient.appetite < 70 ? 'var(--hdf-gold)' : 'var(--hdf-teal)'
              }}
            ></div>
          </div>
          <span className="appetite-value">{patient.appetite}%</span>
        </div>
      </div>

      {expanded && (
        <div className="table-row-expanded">
          <Card className="patient-details">
            <div className="patient-details__grid">
              <div className="detail-item">
                <span className="detail-label">Patient ID:</span>
                <span className="detail-value">P{String(patient.id).padStart(3, '0')}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Meal:</span>
                <span className="detail-value">{patient.lastMeal}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Diet Type:</span>
                <span className="detail-value">{patient.diet}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Appetite Index:</span>
                <span className="detail-value">{patient.appetite}%</span>
              </div>
            </div>
            <div className="patient-details__actions">
              <Button variant="secondary" size="sm">
                Edit Notes
              </Button>
              <Button variant="secondary" size="sm">
                View History
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
