import React, { useState } from 'react';
import PageHeader from '../layout/PageHeader';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import '../../styles/pages/DietitianPage.css';

/**
 * Dietitian Dashboard Page
 * Create and manage personalized meal plans
 */
export default function DietitianPage() {
  const [activeTab, setActiveTab] = useState('plans');

  return (
    <div className="dietitian-page">
      <PageHeader
        icon="🥗"
        title="Meal Planning"
        subtitle="Create and manage personalized meal plans for patients"
        actions={
          <Button variant="primary">
            ➕ Create New Plan
          </Button>
        }
      />

      <div className="dietitian-page__grid">
        {/* Tab Navigation */}
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'plans' ? 'active' : ''}`}
            onClick={() => setActiveTab('plans')}
          >
            📋 Meal Plans
          </button>
          <button
            className={`tab-button ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            📑 Templates
          </button>
          <button
            className={`tab-button ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            🥬 Ingredients
          </button>
        </div>

        {/* Content Sections */}
        {activeTab === 'plans' && <MealPlansSection />}
        {activeTab === 'templates' && <TemplatesSection />}
        {activeTab === 'ingredients' && <IngredientsSection />}

        {/* Nutrition Guidelines */}
        <Card className="guidelines-card">
          <h3 className="card-title">📋 Nutrition Guidelines</h3>
          <div className="guidelines-content">
            <div className="guideline-item">
              <span className="guideline-label">Daily Calories:</span>
              <span className="guideline-value">1,800 - 2,200 kcal</span>
            </div>
            <div className="guideline-item">
              <span className="guideline-label">Protein:</span>
              <span className="guideline-value">50 - 70g</span>
            </div>
            <div className="guideline-item">
              <span className="guideline-label">Carbohydrates:</span>
              <span className="guideline-value">225 - 325g</span>
            </div>
            <div className="guideline-item">
              <span className="guideline-label">Fat:</span>
              <span className="guideline-value">50 - 78g</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/**
 * Meal Plans Section Component
 */
function MealPlansSection() {
  const plans = [
    {
      id: 1,
      patientName: 'Mireille Khoury',
      type: 'Low Sodium',
      status: 'active',
      startDate: '2026-04-28',
      meals: 4,
    },
    {
      id: 2,
      patientName: 'Jean Dupont',
      type: 'Diabetic',
      status: 'active',
      startDate: '2026-04-25',
      meals: 3,
    },
    {
      id: 3,
      patientName: 'Marie Laurent',
      type: 'Post-Surgery',
      status: 'pending',
      startDate: '2026-04-30',
      meals: 3,
    },
  ];

  return (
    <div className="meals-plans-section">
      <h2 className="section-title">Active Meal Plans</h2>
      <div className="plans-grid">
        {plans.map((plan) => (
          <Card key={plan.id} className="plan-card" elevation="elevated">
            <div className="plan-card__header">
              <div>
                <h4 className="plan-card__patient">{plan.patientName}</h4>
                <p className="plan-card__type">{plan.type}</p>
              </div>
              <Badge variant={plan.status === 'active' ? 'success' : 'warning'}>
                {plan.status === 'active' ? '✓ Active' : '⏳ Pending'}
              </Badge>
            </div>

            <div className="plan-card__details">
              <div className="detail">
                <span className="detail-label">Started:</span>
                <span className="detail-value">{plan.startDate}</span>
              </div>
              <div className="detail">
                <span className="detail-label">Daily Meals:</span>
                <span className="detail-value">{plan.meals}</span>
              </div>
            </div>

            <div className="plan-card__actions">
              <Button variant="secondary" size="sm">
                Edit
              </Button>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * Templates Section Component
 */
function TemplatesSection() {
  const templates = [
    { id: 1, name: 'Low Sodium Diet', meals: 4, calories: 1800 },
    { id: 2, name: 'Diabetic Diet', meals: 3, calories: 1500 },
    { id: 3, name: 'Post-Surgery Recovery', meals: 3, calories: 1600 },
    { id: 4, name: 'Mediterranean Diet', meals: 4, calories: 2000 },
  ];

  return (
    <div className="templates-section">
      <h2 className="section-title">Diet Templates</h2>
      <div className="templates-grid">
        {templates.map((template) => (
          <Card key={template.id} className="template-card">
            <h4 className="template-card__name">{template.name}</h4>
            <div className="template-card__info">
              <span>🍽️ {template.meals} meals</span>
              <span>🔥 {template.calories} kcal</span>
            </div>
            <Button variant="secondary" size="sm">
              Use Template
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * Ingredients Section Component
 */
function IngredientsSection() {
  const ingredients = [
    { id: 1, name: 'Chicken Breast', category: 'Protein', unit: 'g' },
    { id: 2, name: 'Brown Rice', category: 'Carbs', unit: 'g' },
    { id: 3, name: 'Broccoli', category: 'Vegetable', unit: 'g' },
    { id: 4, name: 'Olive Oil', category: 'Fat', unit: 'ml' },
    { id: 5, name: 'Salmon', category: 'Protein', unit: 'g' },
    { id: 6, name: 'Sweet Potato', category: 'Carbs', unit: 'g' },
  ];

  return (
    <div className="ingredients-section">
      <h2 className="section-title">Available Ingredients</h2>
      <div className="ingredients-grid">
        {ingredients.map((ingredient) => (
          <Card key={ingredient.id} className="ingredient-card">
            <div className="ingredient-card__header">
              <h4 className="ingredient-card__name">{ingredient.name}</h4>
              <Badge variant="info">{ingredient.category}</Badge>
            </div>
            <p className="ingredient-card__unit">Unit: {ingredient.unit}</p>
            <Button variant="ghost" size="sm">
              Add to Plan
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
