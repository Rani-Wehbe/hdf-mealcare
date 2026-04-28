import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { MEALS, getRandomMotivation, DEMO_USERS } from '../data/demo';
import '../styles/pages/PatientPage.css';

/**
 * Patient Dashboard Page
 * Shows meal schedule, dietary information, and nutritional tracking
 */
export default function PatientPage() {
  const { user } = useApp();
  const [meals, setMeals] = useState([]);
  const [countdown, setCountdown] = useState('2h 15m');
  const [motivation, setMotivation] = useState('');
  const patientData = DEMO_USERS.patient;

  useEffect(() => {
    // Set random motivation
    setMotivation(getRandomMotivation());

    // Transform MEALS into meal schedule with times
    setMeals([
      {
        ...MEALS[0],
        time: '07:00 AM',
        status: 'completed',
        calories: 320,
      },
      {
        ...MEALS[1],
        time: '12:00 PM',
        status: 'pending',
        calories: 280,
      },
      {
        ...MEALS[4],
        time: '06:30 PM',
        status: 'upcoming',
        calories: 200,
      },
      {
        ...MEALS[3],
        time: '03:00 PM',
        status: 'upcoming',
        calories: 150,
      },
    ]);

    // Start countdown timer
    startCountdown();
  }, []);

  const startCountdown = () => {
    let secs = 8100; // 2h 15m
    const updateCountdown = () => {
      const h = Math.floor(secs / 3600);
      const m = Math.floor((secs % 3600) / 60);
      setCountdown(`${h}h ${m}m`);
      if (secs > 0) {
        secs--;
        setTimeout(updateCountdown, 1000);
      }
    };
    updateCountdown();
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">✓ Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">⏳ Pending</Badge>;
      case 'upcoming':
        return <Badge variant="info">→ Upcoming</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="patient-page">
      <PageHeader
        icon="🏥"
        title={`Good morning, ${patientData.name}`}
        subtitle={`Room ${patientData.room} · Ward ${patientData.ward} · ${today}`}
      />

      <div className="patient-page__grid">
        {/* Motivation Section */}
        <Card className="motivation-card">
          <div className="motivation-card__content">
            <p className="motivation-card__text">
              ✨ {motivation}
            </p>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="stats-grid">
          <Card className="stat-card">
            <div className="stat-card__content">
              <span className="stat-card__icon">🍽️</span>
              <div className="stat-card__info">
                <p className="stat-card__label">Meals Today</p>
                <p className="stat-card__value">4</p>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-card__content">
              <span className="stat-card__icon">🔥</span>
              <div className="stat-card__info">
                <p className="stat-card__label">Total Calories</p>
                <p className="stat-card__value">950</p>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-card__content">
              <span className="stat-card__icon">⏰</span>
              <div className="stat-card__info">
                <p className="stat-card__label">Lunch Deadline</p>
                <p className="stat-card__value">{countdown}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Meals Section */}
        <div className="meals-section">
          <h2 className="section-title">📋 Today's Meals</h2>
          <div className="meals-grid">
            {meals.map((meal) => (
              <MealCard 
                key={meal.id} 
                meal={meal} 
                statusBadge={getStatusBadge(meal.status)} 
              />
            ))}
          </div>
        </div>

        {/* Dietary Notes */}
        <Card className="dietary-notes">
          <h3 className="card-title">📝 Dietary Notes</h3>
          <div className="dietary-notes__content">
            <div className="dietary-note-item">
              <span className="dietary-note-label">Allergies:</span>
              <span className="dietary-note-value">{patientData.allergies}</span>
            </div>
            <div className="dietary-note-item">
              <span className="dietary-note-label">Restrictions:</span>
              <span className="dietary-note-value">{patientData.restrictions}</span>
            </div>
            <div className="dietary-note-item">
              <span className="dietary-note-label">Preferences:</span>
              <span className="dietary-note-value">{patientData.preferences}</span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="patient-page__actions">
          <Button variant="primary">Request Special Meal</Button>
          <Button variant="secondary">View Nutritional Info</Button>
          <Button variant="ghost">Contact Dietitian</Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Individual meal card component
 */
function MealCard({ meal, statusBadge }) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <Card className={`meal-card meal-card--${meal.status}`} elevation="elevated">
      <div className="meal-card__header">
        <div className="meal-card__title-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '24px' }}>{meal.emoji}</span>
            <h4 className="meal-card__title">{meal.name}</h4>
          </div>
          <span className="meal-card__time">{meal.time}</span>
        </div>
        {statusBadge}
      </div>

      <div className="meal-card__divider"></div>

      <p className="meal-card__description">{meal.desc}</p>

      <div className="meal-card__tags">
        {meal.tags.map((tag, idx) => (
          <span key={idx} className="meal-tag">{tag}</span>
        ))}
      </div>

      <div className="meal-card__footer">
        <span className="meal-card__calories">🔥 {meal.calories} cal</span>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? '▼' : '▶'} Details
        </Button>
      </div>

      {showDetails && meal.restricted && (
        <div className="meal-card__warning">
          ⚠️ This meal requires dietary approval
        </div>
      )}
    </Card>
  );
}
