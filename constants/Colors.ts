const tintColorLight = '#4E5FBF'; // Indigo
const tintColorDark = '#fff';

export default {
  primary: '#4338ca', // Deep Indigo
  primaryLight: '#e0e7ff', // Very Light Indigo
  secondary: '#6366f1', // Indigo
  accent: '#f472b6', // Pink
  success: '#10b981', // Emerald
  warning: '#f59e0b', // Amber
  danger: '#ef4444', // Red
  text: '#111827', // Gray 900
  secondaryText: '#6b7280', // Gray 500
  background: '#f3f4f6', // Gray 100
  cardBackground: '#ffffff',
  border: '#e5e7eb', // Gray 200
  tint: tintColorLight,
  tabIconDefault: '#9ca3af', // Gray 400
  tabIconSelected: '#4338ca', // Deep Indigo
  spacing: 20,
  radius: 20,
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 10,
    },
  },
};
