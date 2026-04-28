/**
 * Demo Data & Constants
 * All demo accounts, meals, patients, and motivations from the HTML
 */

export const ROLES = {
  patient: {
    label: 'Patient',
    creds: 'Room 214 · No password needed',
    icon: '🛏️',
  },
  nurse: {
    label: 'Nurse',
    creds: 'Username: nurse1 · Password: hdf2024',
    icon: '👩‍⚕️',
  },
  dietitian: {
    label: 'Dietitian',
    creds: 'Username: diet1 · Password: hdf2024',
    icon: '🥗',
  },
  kitchen: {
    label: 'Kitchen',
    creds: 'Username: kitchen1 · Password: hdf2024',
    icon: '👨‍🍳',
  },
  admin: {
    label: 'Admin',
    creds: 'Username: admin1 · Password: hdf2024',
    icon: '📊',
  },
};

export const MOTIVATIONS = [
  'Every meal is a step toward your recovery. Small choices, big strength.',
  'Good nutrition is one of the most powerful tools in your healing journey.',
  'Nourishing your body today helps you get back to what you love tomorrow.',
  'Your strength grows with every bite. Keep going — you\'re doing great.',
  'Healing takes time and care. Let each meal be an act of kindness to yourself.',
];

export const MEALS = [
  {
    id: 1,
    name: 'Grilled Chicken Breast',
    emoji: '🍗',
    desc: 'Lean protein with herb seasoning',
    tags: ['Low-fat', 'High protein'],
    restricted: false,
  },
  {
    id: 2,
    name: 'Lebanese Lentil Soup',
    emoji: '🥣',
    desc: 'Traditional mujadara with cumin',
    tags: ['Vegetarian', 'Low-sodium'],
    restricted: false,
  },
  {
    id: 3,
    name: 'Grilled Sea Bass',
    emoji: '🐟',
    desc: 'Fresh catch with lemon & thyme',
    tags: ['Omega-3', 'Low-calorie'],
    restricted: false,
  },
  {
    id: 4,
    name: 'Stuffed Zucchini',
    emoji: '🫑',
    desc: 'Kousa with rice and minced meat',
    tags: ['Lebanese', 'Balanced'],
    restricted: false,
  },
  {
    id: 5,
    name: 'Fattoush Salad',
    emoji: '🥗',
    desc: 'Fresh greens with pomegranate dressing',
    tags: ['Vegan', 'Light'],
    restricted: false,
  },
  {
    id: 6,
    name: 'Lamb Ouzi',
    emoji: '🍖',
    desc: 'Slow-cooked lamb with spiced rice',
    tags: ['High-calorie'],
    restricted: true,
  },
];

export const PATIENTS = [
  {
    id: 1,
    name: 'Mireille Khoury',
    room: '214',
    diet: 'Low Sodium',
    appetite: 72,
    lastMeal: 'Lunch',
    alert: false,
    status: 'Ordered',
  },
  {
    id: 2,
    name: 'Georges Nassar',
    room: '215',
    diet: 'Diabetic',
    appetite: 45,
    lastMeal: 'Breakfast',
    alert: false,
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Fatima Al-Hassan',
    room: '216',
    diet: 'Standard',
    appetite: 88,
    lastMeal: 'Lunch',
    alert: false,
    status: 'Ordered',
  },
  {
    id: 4,
    name: 'Pierre Karam',
    room: '217',
    diet: 'Soft Foods',
    appetite: 30,
    lastMeal: 'Dinner',
    alert: true,
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Nada Saab',
    room: '218',
    diet: 'Low Calorie',
    appetite: 15,
    lastMeal: '—',
    alert: true,
    status: 'None',
  },
  {
    id: 6,
    name: 'Rami Abi-Nader',
    room: '219',
    diet: 'High Protein',
    appetite: 91,
    lastMeal: 'Lunch',
    alert: false,
    status: 'Ordered',
  },
  {
    id: 7,
    name: 'Lara Sfeir',
    room: '220',
    diet: 'Standard',
    appetite: 68,
    lastMeal: 'Lunch',
    alert: false,
    status: 'Pending',
  },
];

export const PRODUCTION = [
  {
    name: 'Grilled Chicken Breast',
    small: 8,
    normal: 18,
    large: 6,
    status: 'In Progress',
    icon: '🍗',
  },
  {
    name: 'Lebanese Lentil Soup',
    small: 5,
    normal: 12,
    large: 3,
    status: 'Ready',
    icon: '🥣',
  },
  {
    name: 'Grilled Sea Bass',
    small: 3,
    normal: 9,
    large: 4,
    status: 'Prep',
    icon: '🐟',
  },
  {
    name: 'Stuffed Zucchini',
    small: 4,
    normal: 11,
    large: 2,
    status: 'Prep',
    icon: '🫑',
  },
  {
    name: 'Fattoush Salad',
    small: 6,
    normal: 8,
    large: 1,
    status: 'Ready',
    icon: '🥗',
  },
];

/**
 * Demo users by role with their specific settings
 */
export const DEMO_USERS = {
  patient: {
    name: 'Mireille Khoury',
    room: '214',
    ward: 'B',
    diet: 'Low Sodium',
    allergies: 'Peanuts, Shellfish',
    restrictions: 'Low sodium, Low sugar',
    preferences: 'Mediterranean diet',
  },
  nurse: {
    name: 'Nurse Rima Haddad',
    department: 'Medical Ward',
  },
  dietitian: {
    name: 'Dr. Sara Rizk',
    specialization: 'Clinical Nutrition',
  },
  kitchen: {
    name: 'Chef Marwan Bou',
    station: 'Main Kitchen',
  },
  admin: {
    name: 'Director Hala Khoury',
    department: 'Administration',
  },
};

/**
 * Get a random motivation message
 */
export const getRandomMotivation = () => {
  return MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
};

/**
 * Get demo credentials for a role
 */
export const getDemoCredentials = (role) => {
  return ROLES[role]?.creds || 'Demo credentials not available';
};
