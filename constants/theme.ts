export const COLORS = {
  primary: '#0095F6', // Instagram Blue
  primaryLight: '#EAF6FF',
  secondary: '#262626', // Dark Gray/Black
  background: '#FFFFFF', // Pure White
  card: '#FFFFFF',
  text: '#262626',
  textSecondary: '#8E8E8E', // Instagram Gray
  border: '#DBDBDB', // Light Border
  success: '#0095F6',
  warning: '#ED4956', // Instagram Red
  danger: '#ED4956',
  white: '#FFFFFF',
  storyRing: ['#FBAA47', '#D91A46', '#A60F93'], // Instagram Gradient approximation
};

export const SHADOWS = {
  // Minimal or no shadows for this style
  small: {
    shadowColor: 'transparent',
    elevation: 0,
    borderWidth: 1,
    borderColor: '#DBDBDB',
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 12, // Slightly tighter spacing
  l: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  s: 4,
  m: 8,
  l: 12,
  xl: 20,
  full: 9999,
};
