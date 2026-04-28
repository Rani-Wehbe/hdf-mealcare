/**
 * API Request Utilities
 * Centralized API communication layer
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(status, message, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

/**
 * Generic fetch wrapper with error handling
 */
export const apiCall = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    headers = {},
    body = null,
    ...otherOptions
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...otherOptions,
  };

  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || 'API request failed',
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, error.message, null);
  }
};

/**
 * Convenience methods for common HTTP verbs
 */

export const apiGet = (endpoint, options = {}) =>
  apiCall(endpoint, { method: 'GET', ...options });

export const apiPost = (endpoint, body, options = {}) =>
  apiCall(endpoint, { method: 'POST', body, ...options });

export const apiPut = (endpoint, body, options = {}) =>
  apiCall(endpoint, { method: 'PUT', body, ...options });

export const apiPatch = (endpoint, body, options = {}) =>
  apiCall(endpoint, { method: 'PATCH', body, ...options });

export const apiDelete = (endpoint, options = {}) =>
  apiCall(endpoint, { method: 'DELETE', ...options });

/**
 * Mock API for development (replace with real API later)
 */

export const mockApiPatientMeals = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Breakfast',
          time: '07:00',
          status: 'completed',
          items: ['Toast with jam', 'Orange juice', 'Yogurt'],
          calories: 320,
        },
        {
          id: 2,
          name: 'Lunch',
          time: '12:00',
          status: 'pending',
          items: ['Grilled chicken', 'Rice', 'Vegetables'],
          calories: 580,
        },
        {
          id: 3,
          name: 'Dinner',
          time: '18:30',
          status: 'upcoming',
          items: ['Fish', 'Sweet potato', 'Greens'],
          calories: 420,
        },
        {
          id: 4,
          name: 'Snack',
          time: '15:00',
          status: 'upcoming',
          items: ['Apple', 'Almonds'],
          calories: 150,
        },
      ]);
    }, 500);
  });
};

export const mockApiPatients = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'P001',
          name: 'Mireille Khoury',
          room: '214',
          ward: 'B',
          status: 'stable',
          lastMeal: '12:00',
        },
        {
          id: 'P002',
          name: 'Jean Dupont',
          room: '215',
          ward: 'B',
          status: 'pending',
          lastMeal: '10:30',
        },
        {
          id: 'P003',
          name: 'Marie Laurent',
          room: '216',
          ward: 'C',
          status: 'overdue',
          lastMeal: '08:00',
        },
      ]);
    }, 500);
  });
};

export const mockApiKitchenOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'K001',
          patientName: 'Mireille Khoury',
          room: '214',
          mealType: 'Lunch',
          time: '12:00',
          items: ['Grilled chicken', 'Rice', 'Vegetables'],
          status: 'ready',
          priority: 'normal',
        },
        {
          id: 'K002',
          patientName: 'Jean Dupont',
          room: '215',
          mealType: 'Lunch',
          time: '12:00',
          items: ['Soup', 'Bread', 'Fruit'],
          status: 'preparing',
          priority: 'normal',
        },
        {
          id: 'K003',
          patientName: 'Marie Laurent',
          room: '216',
          mealType: 'Lunch',
          time: '12:00',
          items: ['Salad', 'Grilled fish', 'Water'],
          status: 'pending',
          priority: 'high',
        },
      ]);
    }, 500);
  });
};
