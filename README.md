# HDF MealCare — Smart Nutrition System

A modern, modular React application for hospital meal management and nutritional planning. Built from the ground up with clean architecture, accessibility, and role-based workflows.

## 🏥 Overview

HDF MealCare is a comprehensive meal management system for the Hôtel-Dieu de France hospital, featuring:

- **5 Role-Based Dashboards**: Patient, Nurse, Dietitian, Kitchen, Administrator
- **Live Demo Accounts**: Pre-configured with realistic data from the Lebanese healthcare context
- **Professional UI**: HDF design system with warm, institutional colors
- **Modular Architecture**: Clean separation of concerns with utilities, hooks, and components
- **Fully Functional**: Demo orders, meal scheduling, patient monitoring, and analytics

## 🎯 Quick Start

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Accounts

Click any role button to see credentials. No password needed for patients:

- **👤 Patient**: Room 214 · No password needed
- **👨‍⚕️ Nurse**: `nurse1` / `hdf2024`
- **🥗 Dietitian**: `diet1` / `hdf2024`
- **👨‍🍳 Kitchen**: `kitchen1` / `hdf2024`
- **⚙️ Admin**: `admin1` / `hdf2024`

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Button, Card, Badge
│   ├── layout/         # PageHeader, navigation
│   ├── Login.jsx       # Authentication
│   └── Dashboard.jsx   # Main layout
├── pages/              # Role-based pages
│   ├── PatientPage.jsx
│   ├── NursePage.jsx
│   ├── DietitianPage.jsx
│   ├── KitchenPage.jsx
│   └── AdminPage.jsx
├── context/            # App state management
│   └── AppContext.jsx
├── hooks/              # Custom React hooks
│   └── index.js        # useAsync, useForm, useCountdown, etc
├── utils/              # Utility functions
│   ├── api.js          # API calls and mock data
│   └── helpers.js      # Date, string, array utilities
├── data/               # Demo data and constants
│   └── demo.js         # MEALS, PATIENTS, MOTIVATIONS, etc
├── styles/             # CSS modules
│   ├── index.css       # Global design tokens
│   ├── components/     # Component styles
│   └── pages/          # Page-specific styles
└── App.jsx             # Root component
```

## 🎨 Design System

### Colors (HDF Palette)

```css
--hdf-navy:    #1B2B4B   /* Primary */
--hdf-gold:    #B8933A   /* Accent */
--hdf-cream:   #F7F3EE   /* Background */
--hdf-red:     #8C1F28   /* Alert */
--hdf-teal:    #2A7B7B   /* Success */
--hdf-mid:     #4A5E7A   /* Text */
```

### Typography

- **Display**: Playfair Display (headings)
- **Body**: DM Sans (content)

## 🧩 Key Components

### UI Components

```jsx
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import Badge from './components/ui/Badge';
import PageHeader from './components/layout/PageHeader';

<Button variant="primary" size="md">Click me</Button>
<Card elevation="elevated">Content</Card>
<Badge variant="success">Active</Badge>
<PageHeader title="Page Title" icon="🏥" subtitle="Subtitle" />
```

### Custom Hooks

```jsx
import {
  useAsync,        // Handle async operations
  useForm,         // Form state and validation
  useLocalStorage, // Persist state
  usePagination,   // Pagination logic
  useCountdown,    // Countdown timer
  useToggle,       // Boolean toggle
  useDebounce      // Debounce values
} from './hooks';
```

### Utilities

```jsx
import {
  formatDate,
  capitalize,
  groupBy,
  sortBy,
  isValidEmail,
  calculatePercentage,
  formatCurrency
} from './utils/helpers';
```

## 📊 Features by Role

### 👤 Patient
- View personalized meal schedule
- See dietary restrictions and allergies
- Track daily calorie intake
- Real-time countdown to meal deadlines
- Request special meals

### 👨‍⚕️ Nurse
- Monitor all patients in ward
- View meal compliance status
- Manage patient dietary notes
- Alert system for patients needing attention

### 🥗 Dietitian
- Create and manage meal plans
- Approve/deny restricted meals
- View dietary trends and analytics
- Manage ingredient database
- Create meal templates

### 👨‍🍳 Kitchen
- View daily meal orders
- Filter by status (pending, preparing, ready)
- Track portion quantities
- Manage food waste reporting
- Print labels and reports

### ⚙️ Admin
- User management and permissions
- System analytics and reports
- Database maintenance
- System configuration

## 🚀 Development

### Build Production

```bash
npm run build
```

### Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
```

## 📝 Code Quality

- **Modular Components**: Single responsibility principle
- **Prop Documentation**: JSDoc comments instead of PropTypes
- **Custom Hooks**: Reusable stateful logic
- **Utility Functions**: Pure, testable helpers
- **CSS Organization**: BEM naming, design tokens

## 🔄 Data Flow

```
Login (demo account selection)
    ↓
AppContext (set role, user data)
    ↓
Dashboard (route to role page)
    ↓
Role Pages (display specific UI)
    ↓
Components + Hooks + Utils (render + interact)
```

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactive elements
- Readable typography at all sizes

## 🎓 Learning Resources

This project demonstrates:

- React hooks and context API
- Component composition and reusability
- CSS-in-JS patterns (CSS modules)
- Form handling and validation
- Custom hook creation
- Utility function organization
- Clean code architecture

## 🛠️ Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling (no CSS-in-JS library)
- **JavaScript ES6+** - Language

## 📄 License

Created for Hôtel-Dieu de France

## 👥 Demo Data

All demo data is realistic and includes:

- 7 patient profiles with different dietary needs
- 6 menu items with Lebanese cuisine focus
- 5 production items with preparation status
- Motivational messages for patient encouragement

## ✨ Next Steps

To extend this project:

1. **Connect Real API**: Replace mock data in `utils/api.js`
2. **Add Authentication**: Implement proper login with tokens
3. **Add Testing**: Jest + React Testing Library
4. **Add Internationalization**: Support Arabic and French
5. **Add Real-time Updates**: WebSocket or server polling
6. **Mobile App**: React Native version

---

**Built with ❤️ for HDF**
