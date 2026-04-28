import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { PRODUCTION } from '../data/demo';
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
      </div>

      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'analytics' && <AnalyticsTab />}
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
