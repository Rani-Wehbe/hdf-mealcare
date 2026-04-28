import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useAsync } from '../hooks';
import { mockApiKitchenOrders } from '../utils/api';
import '../styles/pages/KitchenPage.css';

/**
 * Kitchen Dashboard Page
 * Manage meal preparation and food service
 */
export default function KitchenPage() {
  const { data: orders = [], isLoading } = useAsync(
    () => mockApiKitchenOrders(),
    true
  );

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'all') return true;
    return order.status === activeFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ready':
        return <Badge variant="success">✓ Ready</Badge>;
      case 'preparing':
        return <Badge variant="warning">👨‍🍳 Preparing</Badge>;
      case 'pending':
        return <Badge variant="info">⏳ Pending</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    if (priority === 'high') {
      return <Badge variant="error">🚨 High</Badge>;
    }
    return <Badge variant="default">Normal</Badge>;
  };

  return (
    <div className="kitchen-page">
      <PageHeader
        icon="👨‍🍳"
        title="Meal Preparation"
        subtitle="Manage meal preparation and food service"
        actions={
          <Button variant="primary">
            ➕ New Order
          </Button>
        }
      />

      <div className="kitchen-page__grid">
        {/* Quick Stats */}
        <div className="stats-grid">
          <Card className="stat-card">
            <div className="stat-card__content">
              <span className="stat-card__icon">📋</span>
              <div className="stat-card__info">
                <p className="stat-card__label">Total Orders</p>
                <p className="stat-card__value">{orders.length}</p>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-card__content">
              <span className="stat-card__icon">✓</span>
              <div className="stat-card__info">
                <p className="stat-card__label">Ready</p>
                <p className="stat-card__value">
                  {orders.filter((o) => o.status === 'ready').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-card__content">
              <span className="stat-card__icon">👨‍🍳</span>
              <div className="stat-card__info">
                <p className="stat-card__label">Preparing</p>
                <p className="stat-card__value">
                  {orders.filter((o) => o.status === 'preparing').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-card__content">
              <span className="stat-card__icon">🚨</span>
              <div className="stat-card__info">
                <p className="stat-card__label">High Priority</p>
                <p className="stat-card__value">
                  {orders.filter((o) => o.priority === 'high').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Orders ({orders.length})
          </button>
          <button
            className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            Pending ({orders.filter((o) => o.status === 'pending').length})
          </button>
          <button
            className={`filter-tab ${activeFilter === 'preparing' ? 'active' : ''}`}
            onClick={() => setActiveFilter('preparing')}
          >
            Preparing ({orders.filter((o) => o.status === 'preparing').length})
          </button>
          <button
            className={`filter-tab ${activeFilter === 'ready' ? 'active' : ''}`}
            onClick={() => setActiveFilter('ready')}
          >
            Ready ({orders.filter((o) => o.status === 'ready').length})
          </button>
        </div>

        {/* Orders Section */}
        <div className="orders-section">
          <h2 className="section-title">🍽️ Meal Orders</h2>
          {isLoading ? (
            <div className="loading-state">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="empty-state">
              <p>No orders in this category</p>
            </div>
          ) : (
            <div className="orders-grid">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  statusBadge={getStatusBadge(order.status)}
                  priorityBadge={getPriorityBadge(order.priority)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <Card className="quick-actions">
          <h3 className="card-title">⚡ Quick Actions</h3>
          <div className="actions-grid">
            <Button variant="secondary">📝 Print Labels</Button>
            <Button variant="secondary">📊 Daily Report</Button>
            <Button variant="secondary">🔔 Notify Staff</Button>
            <Button variant="secondary">📦 Export Orders</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/**
 * Individual order card component
 */
function OrderCard({ order, statusBadge, priorityBadge }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card className="order-card" elevation="elevated">
      <div className="order-card__header">
        <div className="order-card__title-section">
          <h4 className="order-card__patient">{order.patientName}</h4>
          <p className="order-card__room">Room {order.room}</p>
        </div>
        <div className="order-card__badges">
          {statusBadge}
          {priorityBadge}
        </div>
      </div>

      <div className="order-card__body">
        <div className="order-info">
          <span className="order-label">Meal:</span>
          <span className="order-value">{order.mealType} ({order.time})</span>
        </div>

        {isExpanded && (
          <div className="order-items">
            <p className="items-label">Items:</p>
            {order.items.map((item, idx) => (
              <div key={idx} className="item">
                <span className="item-bullet">•</span>
                <span className="item-name">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="order-card__footer">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '▼' : '▶'} {isExpanded ? 'Hide' : 'Show'} Items
        </Button>
        <Button variant="primary" size="sm">
          {order.status === 'ready' ? '✓ Served' : 'Mark Ready'}
        </Button>
      </div>
    </Card>
  );
}
