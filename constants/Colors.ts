const tintColorLight = '#2563EB'; // Blue
const tintColorDark = '#fff';

export default {
  primary: '#2563EB', // Blue 600
  primaryLight: '#EFF6FF', // Blue 50
  secondary: '#3B82F6', // Blue 500
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
  tabIconSelected: '#2563EB', // Blue 600
  // Header gradient colors (slightly darker for premium look)
  gradientStart: '#1A3A9C', // Darker blue
  gradientMiddle: '#2D6FE8', // Rich medium blue
  gradientEnd: '#4A90F4', // Slightly darker light blue
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
