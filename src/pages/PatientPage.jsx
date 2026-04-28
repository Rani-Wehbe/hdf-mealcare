import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/Modal';
import { Accordion } from '../components/Accordion';
import { Dropdown } from '../components/Dropdown';
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
  const [showMealModal, setShowMealModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showPortionModal, setShowPortionModal] = useState(false);
  const patientData = DEMO_USERS.patient;

  useEffect(() => {
    setMotivation(getRandomMotivation());

    setMeals([
      {
        ...MEALS[0],
        time: '07:00 AM',
        status: 'completed',
        calories: 320,
        portion: 'normal',
      },
      {
        ...MEALS[1],
        time: '12:00 PM',
        status: 'pending',
        calories: 280,
        portion: 'normal',
      },
      {
        ...MEALS[4],
        time: '06:30 PM',
        status: 'upcoming',
        calories: 200,
        portion: 'normal',
      },
      {
        ...MEALS[3],
        time: '03:00 PM',
        status: 'upcoming',
        calories: 150,
        portion: 'normal',
      },
    ]);

    startCountdown();
  }, []);

  const startCountdown = () => {
    let secs = 8100;
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
        return <Badge variant="warning">⏳ In Progress</Badge>;
      case 'upcoming':
        return <Badge variant="info">📅 Upcoming</Badge>;
      default:
        return null;
    }
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const completedMeals = meals.filter((m) => m.status === 'completed').length;

  const handleViewMeal = (meal) => {
    setSelectedMeal(meal);
    setShowMealModal(true);
  };

  const handleMealModalClose = () => {
    setShowMealModal(false);
    setTimeout(() => setSelectedMeal(null), 300);
  };

  const portionOptions = [
    { label: '🤏 Small', icon: '🤏' },
    { label: '👌 Normal', icon: '👌' },
    { label: '🍽️ Large', icon: '🍽️' },
  ];

  return (
    <div className="patient-page">
      <PageHeader
        icon="🛏️"
        title="Your Meal Schedule"
        subtitle={`${today} • Room ${patientData.room}`}
        actions={
          <Dropdown
            trigger="⚙️ Settings"
            items={[
              { label: 'View Restrictions', icon: '🚫' },
              { label: 'Edit Preferences', icon: '✏️' },
              { label: 'Contact Dietitian', icon: '📞' },
            ]}
          />
        }
      />

      {/* Motivation Banner */}
      <div className="motivation-banner">
        <div className="motivation-content">
          <span className="motivation-icon">💪</span>
          <p className="motivation-text">{motivation}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-section">
        <StatCard icon="🍽️" label="Meals Today" value={meals.length} />
        <StatCard icon="✓" label="Completed" value={completedMeals} />
        <StatCard icon="🔥" label="Total Calories" value={totalCalories} unit="cal" />
        <StatCard icon="⏱️" label="Next Meal In" value={countdown} />
      </div>

      {/* Dietary Alerts */}
      <Card className="alerts-section">
        <div className="card-title">⚠️ Your Dietary Information</div>
        <div className="alert-items">
          <AlertItem
            icon="🚫"
            title={patientData.diet}
            description="Your personalized diet plan"
          />
          <AlertItem
            icon="🔴"
            title="Low Sodium"
            description="Limiting salt intake per doctor's recommendation"
          />
          <AlertItem
            icon="💊"
            title="Supplement with Iron"
            description="Iron-rich meals recommended"
          />
        </div>
      </Card>

      {/* Meals Grid */}
      <div className="meals-section">
        <h2 className="section-title">Today's Meals</h2>
        <div className="meals-grid">
          {meals.map((meal, idx) => (
            <MealCard
              key={idx}
              meal={meal}
              statusBadge={getStatusBadge(meal.status)}
              onView={() => handleViewMeal(meal)}
              onSelectPortion={() => {
                setSelectedMeal(meal);
                setShowPortionModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Nutritional Info Accordion */}
      <Card elevation="elevated">
        <div className="card-title">📊 Nutritional Information</div>
        <Accordion
          items={[
            {
              id: 'macros',
              icon: '🥗',
              title: 'Macronutrients',
              content: (
                <div className="nutrition-content">
                  <div className="nutrition-item">
                    <span>Proteins:</span>
                    <strong>45g</strong>
                  </div>
                  <div className="nutrition-item">
                    <span>Carbohydrates:</span>
                    <strong>60g</strong>
                  </div>
                  <div className="nutrition-item">
                    <span>Fats:</span>
                    <strong>25g</strong>
                  </div>
                </div>
              ),
            },
            {
              id: 'micros',
              icon: '💊',
              title: 'Micronutrients',
              content: (
                <div className="nutrition-content">
                  <div className="nutrition-item">
                    <span>Iron:</span>
                    <strong>8mg</strong>
                  </div>
                  <div className="nutrition-item">
                    <span>Calcium:</span>
                    <strong>500mg</strong>
                  </div>
                  <div className="nutrition-item">
                    <span>Sodium:</span>
                    <strong>800mg</strong>
                  </div>
                </div>
              ),
            },
            {
              id: 'recommendations',
              icon: '💡',
              title: 'Recommendations',
              content: (
                <div className="nutrition-content">
                  <ul>
                    <li>Drink at least 2 liters of water daily</li>
                    <li>Eat meals at regular times</li>
                    <li>Avoid high-sodium foods</li>
                    <li>Include iron-rich foods in each meal</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Meal Detail Modal */}
      <Modal
        isOpen={showMealModal}
        title={selectedMeal?.name}
        onClose={handleMealModalClose}
        actions={[
          { label: 'Close', onClick: handleMealModalClose },
          {
            label: '✓ Confirm Meal',
            onClick: () => handleMealModalClose(),
            variant: 'primary',
          },
        ]}
      >
        {selectedMeal && (
          <div className="meal-modal-content">
            <div className="meal-modal-header">
              <span className="meal-emoji" >{selectedMeal.emoji}</span>
              <div>
                <p className="meal-time">{selectedMeal.time}</p>
                <p className="meal-status">{selectedMeal.status}</p>
              </div>
            </div>

            <div className="meal-modal-info">
              <p className="meal-description">{selectedMeal.desc}</p>
              <div className="meal-details">
                <div className="detail-item">
                  <span>Calories:</span>
                  <strong>{selectedMeal.calories}</strong>
                </div>
                <div className="detail-item">
                  <span>Portion:</span>
                  <strong className="capitalize">{selectedMeal.portion}</strong>
                </div>
              </div>
            </div>

            <div className="meal-tags">
              {selectedMeal.tags.map((tag, idx) => (
                <span key={idx} className="meal-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Portion Selection Modal */}
      <Modal
        isOpen={showPortionModal}
        title="Select Portion Size"
        onClose={() => setShowPortionModal(false)}
      >
        <div className="portion-modal-content">
          <p className="portion-description">
            Choose how much you'd like. Your dietitian may adjust this.
          </p>
          <div className="portion-options">
            {portionOptions.map((option, idx) => (
              <button key={idx} className="portion-option">
                <span className="portion-emoji">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

/**
 * Stat Card Component
 */
function StatCard({ icon, label, value, unit = '' }) {
  return (
    <Card className="stat-card">
      <div className="stat-card-content">
        <span className="stat-icon">{icon}</span>
        <div className="stat-info">
          <p className="stat-label">{label}</p>
          <p className="stat-value">
            {value}
            {unit && <span className="stat-unit">{unit}</span>}
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Alert Item Component
 */
function AlertItem({ icon, title, description }) {
  return (
    <div className="alert-item">
      <span className="alert-icon">{icon}</span>
      <div className="alert-content">
        <p className="alert-title">{title}</p>
        <p className="alert-description">{description}</p>
      </div>
    </div>
  );
}

/**
 * Meal Card Component
 */
function MealCard({ meal, statusBadge, onView, onSelectPortion }) {
  const getCalorieColor = () => {
    const style = getComputedStyle(document.documentElement);
    if (meal.calories > 300) return style.getPropertyValue('--hdf-red').trim();
    if (meal.calories > 200) return style.getPropertyValue('--hdf-gold').trim();
    return style.getPropertyValue('--hdf-teal').trim();
  };
  const calorieColor = getCalorieColor();

  return (
    <Card className={`meal-card meal-card--${meal.status}`}>
      <div className="meal-card-header">
        <div className="meal-header-left">
          <span className="meal-card-emoji">{meal.emoji}</span>
          <h3 className="meal-card-name">{meal.name}</h3>
        </div>
        {statusBadge}
      </div>

      <p className="meal-card-time">{meal.time}</p>
      <p className="meal-card-desc">{meal.desc}</p>

      <div className="meal-card-meta">
        <span style={{ color: calorieColor, fontWeight: 600 }}>
          {meal.calories} cal
        </span>
      </div>

      <div className="meal-card-actions">
        <Button variant="ghost" size="sm" onClick={onView}>
          View Details
        </Button>
        {meal.status === 'upcoming' && (
          <Button variant="primary" size="sm" onClick={onSelectPortion}>
            Select Portion
          </Button>
        )}
      </div>
    </Card>
  );
}
