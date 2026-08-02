export const APP_NAME = 'BondCircle';
export const APP_DESCRIPTION = 'Preserving friendships through intelligent memory management';

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Memories', href: '/memories', icon: 'BookHeart' },
  { label: 'Timeline', href: '/timeline', icon: 'Clock' },
  { label: 'Friends', href: '/friends', icon: 'Users' },
  { label: 'Messages', href: '/messages', icon: 'MessageCircle' },
  { label: 'Profile', href: '/profile', icon: 'User' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
] as const;

export const PROTECTED_ROUTES = [
  '/dashboard',
  '/memories',
  '/timeline',
  '/friends',
  '/messages',
  '/profile',
  '/settings',
];

export const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password'];

export const COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  accent: {
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
  },
  navy: {
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
} as const;
