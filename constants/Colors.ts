const tintColorLight = '#4E5FBF'; // Indigo
const tintColorDark = '#fff';

export default {
  primary: '#4E5FBF', // Indigo
  primaryLight: '#EEF2FF', // Very Light Indigo
  secondary: '#A78BFA', // Light Purple accent
  accent: '#EC4899', // Pink accent
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  text: '#1F2937', // Dark Grey/Black
  secondaryText: '#6B7280', // Grey
  background: '#F3F4F9', // Soft Lavender/Grey Background
  cardBackground: '#FFFFFF', // White for cards
  border: '#E5E7EB',
  tint: tintColorLight,
  tabIconDefault: '#9CA3AF',
  tabIconSelected: tintColorLight,
  spacing: 24, // Increased spacing
  radius: 24, // Increased radius
  shadows: {
    small: {
      shadowColor: '#4E5FBF',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    medium: {
      shadowColor: '#4E5FBF',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 3,
    },
    large: {
      shadowColor: '#4E5FBF',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 5,
    },
  },
};
