import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useCountdown } from '../hooks';
import { PRODUCTION } from '../data/demo';
import '../styles/pages/KitchenPage.css';

/**
 * Kitchen Dashboard Page
 * Real-time production board and waste tracking
 */
export default function KitchenPage() {
  const [activeTab, setActiveTab] = useState('today');
  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="kitchen-page">
      {/* Tab Navigation */}
      <div className="kitchen-tabs">
        <button
          className={`tab-btn ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          📋 Today's Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'waste' ? 'active' : ''}`}
          onClick={() => setActiveTab('waste')}
        >
          🗑️ Record Waste
        </button>
      </div>

      {activeTab === 'today' && (
        <div className="kitchen-section">
          <ProductionBoard liveTime={liveTime} />
        </div>
      )}

      {activeTab === 'waste' && (
        <div className="kitchen-section">
          <WasteRecording />
        </div>
      )}
    </div>
  );
}

/**
 * Production Board Component
 */
function ProductionBoard({ liveTime }) {
  const timeStr = liveTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const timeline = [
    { emoji: '✅', label: 'Orders Received', time: '08:00', done: true },
    { emoji: '✅', label: 'Ingredients Prepared', time: '09:30', done: true },
    { emoji: '🔥', label: 'Cooking in Progress', time: '10:30', active: true },
    { emoji: '⏳', label: 'Plating & Packaging', time: '11:30', done: false },
    { emoji: '🍽️', label: 'Service Delivery', time: '12:00', done: false },
    { emoji: '📊', label: 'Waste Recording', time: '13:00', done: false },
  ];

  const totalOrders = PRODUCTION.reduce((sum, p) => sum + p.small + p.normal + p.large, 0);

  return (
    <>
      {/* Header with Live Indicator */}
      <div className="production-header">
        <div className="header-left">
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span className="live-text">LIVE DATA</span>
          </div>
          <h2 className="header-title">Production Board</h2>
          <p className="header-subtitle">Lunch Service · <strong>{totalOrders}</strong> orders confirmed</p>
        </div>
        <div className="header-right">
          <div className="kitchen-clock">{timeStr}</div>
          <div className="kitchen-info">Kitchen starts: 11:00</div>
        </div>
      </div>

      {/* Alert Bar */}
      <div className="alert-bar">
        <span>⚡</span>
        <strong>3 new updates</strong> since last refresh · 2 patients changed their order · 1 new dietary restriction added
      </div>

      {/* Production Grid */}
      <div className="production-grid">
        {PRODUCTION.map((item, idx) => (
          <ProductionCard key={idx} item={item} />
        ))}
      </div>

      {/* Timeline */}
      <Card elevation="elevated">
        <div className="card-title">📦 Service Timeline</div>
        <div className="timeline">
          {timeline.map((step, idx) => (
            <TimelineStep key={idx} step={step} />
          ))}
        </div>
      </Card>
    </>
  );
}

/**
 * Production Card Component
 */
function ProductionCard({ item }) {
  const total = item.small + item.normal + item.large;
  const statusColor = {
    'Ready': '#4ade80',
    'In Progress': '#B8933A',
    'Prep': '#4A5E7A',
  }[item.status];

  return (
    <div className="production-card" style={{ borderLeftColor: statusColor }}>
      <div className="prod-header">
        <h4>
          <span className="prod-emoji">{item.icon}</span>
          {item.name}
        </h4>
        <span className="prod-total">Total: {total}</span>
      </div>

      <div className="portion-grid">
        <div className="portion-count">
          <div className="count-number">{item.small}</div>
          <div className="count-label">Small</div>
        </div>
        <div className="portion-count">
          <div className="count-number">{item.normal}</div>
          <div className="count-label">Normal</div>
        </div>
        <div className="portion-count">
          <div className="count-number">{item.large}</div>
          <div className="count-label">Large</div>
        </div>
      </div>

      <div className="prod-status">
        <span className="status-label">Status</span>
        <span className="status-badge" style={{ color: statusColor }}>
          ● {item.status}
        </span>
      </div>
    </div>
  );
}

/**
 * Timeline Step Component
 */
function TimelineStep({ step }) {
  return (
    <div className={`timeline-step ${step.done ? 'done' : step.active ? 'active' : ''}`}>
      <div className="timeline-dot">{step.emoji}</div>
      <div className="timeline-content">
        <h4>
          {step.label}
          {step.active && <Badge variant="warning" style={{ marginLeft: '8px' }}>Now</Badge>}
          {step.done && <Badge variant="success" style={{ marginLeft: '8px' }}>Done</Badge>}
        </h4>
        <p>Scheduled: {step.time}</p>
      </div>
    </div>
  );
}

/**
 * Waste Recording Component
 */
function WasteRecording() {
  const [wasteValues, setWasteValues] = useState(
    PRODUCTION.reduce((acc, p) => ({ ...acc, [p.name]: (Math.random() * 2).toFixed(1) }), {})
  );
  const [notes, setNotes] = useState('');

  const handleWasteChange = (itemName, value) => {
    setWasteValues({ ...wasteValues, [itemName]: value });
  };

  const handleSubmit = () => {
    alert('Waste report submitted to admin dashboard');
  };

  const weeklyWaste = [3.2, 4.8, 2.1, 5.0, 3.8, 2.4, 1.8];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxWaste = Math.max(...weeklyWaste);
  const totalWeekWaste = weeklyWaste.reduce((a, b) => a + b, 0);

  return (
    <div className="waste-container">
      <div className="waste-grid">
        {/* Waste Form */}
        <Card elevation="elevated">
          <div className="card-title">📝 Record Waste — Lunch</div>

          <div className="waste-items">
            {PRODUCTION.map((item) => (
              <div key={item.name} className="waste-item">
                <span className="waste-icon">{item.icon}</span>
                <div className="waste-info">
                  <span className="waste-name">{item.name}</span>
                </div>
                <div className="waste-input-group">
                  <input
                    type="number"
                    className="waste-input"
                    min="0"
                    step="0.1"
                    value={wasteValues[item.name]}
                    onChange={(e) => handleWasteChange(item.name, e.target.value)}
                  />
                  <span className="waste-unit">kg</span>
                </div>
              </div>
            ))}
          </div>

          <div className="waste-notes">
            <label className="form-label">Notes</label>
            <textarea
              className="form-textarea"
              placeholder="e.g., Larger portions resulted in more waste for Item 3..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button variant="primary" className="submit-btn" onClick={handleSubmit}>
            Submit Waste Report
          </Button>
        </Card>

        {/* Weekly Chart */}
        <Card elevation="elevated">
          <div className="card-title">📊 This Week's Waste</div>

          <div className="chart-area">
            {weeklyWaste.map((val, idx) => (
              <div key={idx} className="chart-col">
                <div className="chart-bar-wrapper">
                  <div
                    className="chart-bar"
                    style={{
                      height: `${Math.round((val / maxWaste) * 120)}px`,
                      backgroundColor:
                        val > 4 ? '#8C1F28' : val > 3 ? '#B8933A' : '#2A7B7B',
                    }}
                  />
                </div>
                <span className="chart-label">{days[idx]}</span>
              </div>
            ))}
          </div>

          <div className="waste-stats">
            <div className="stat">
              <div className="stat-value" style={{ color: '#8C1F28' }}>
                {totalWeekWaste.toFixed(1)} kg
              </div>
              <div className="stat-label">Total waste this week</div>
            </div>
            <div className="stat">
              <div className="stat-value" style={{ color: '#B8933A' }}>
                ${(totalWeekWaste * 7.7).toFixed(0)}
              </div>
              <div className="stat-label">Estimated financial loss</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
