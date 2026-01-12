// Premium Enterprise Color System
const tintColorLight = '#0066FF';
const tintColorDark = '#fff';

export default {
  // Primary Brand Colors - Refined Blue Palette
  primary: '#0066FF', // Vibrant enterprise blue
  primaryDark: '#0052CC', // Darker blue for depth
  primaryLight: '#E6F0FF', // Light blue background
  primarySoft: '#4D94FF', // Softer blue for accents
  
  // Secondary Colors
  secondary: '#3B82F6',
  accent: '#8B5CF6', // Premium purple accent
  
  // Semantic Colors
  success: '#00C48C', // Modern green
  warning: '#FFB020', // Warm amber
  danger: '#FF4757', // Refined red
  info: '#00B4D8', // Cyan info
  
  // Text Colors
  text: '#0A1628', // Deep navy for text
  textPrimary: '#0A1628',
  textSecondary: '#475569', // Muted secondary text
  textTertiary: '#94A3B8', // Lighter tertiary
  textInverse: '#FFFFFF',
  
  // Background Colors
  background: '#F8FAFC', // Cool gray background
  backgroundElevated: '#FFFFFF',
  cardBackground: '#FFFFFF',
  
  // Border & Divider
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  divider: '#F1F5F9',
  
  // Legacy support
  secondaryText: '#64748B',
  tint: tintColorLight,
  tabIconDefault: '#94A3B8',
  tabIconSelected: '#0066FF',
  
  // Premium Header Gradient - Matching Home page
  gradientStart: '#0D3C75', // Deep enterprise blue
  gradientMiddle: '#165BAA', // Rich blue
  gradientEnd: '#2563EB', // Bright blue
  
  // Secondary gradients
  gradientPrimary: ['#0066FF', '#4D94FF'] as [string, string],
  gradientSuccess: ['#00C48C', '#00E5A0'] as [string, string],
  gradientPremium: ['#0D3C75', '#165BAA', '#2563EB'] as [string, string, string],
  
  // Design tokens
  spacing: 20,
  radius: 20,
  radiusSm: 12,
  radiusLg: 28,
  radiusXl: 32,
  
  // Premium shadows
  shadows: {
    small: {
      shadowColor: '#0A1628',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#0A1628',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 6,
    },
    large: {
      shadowColor: '#0A1628',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      elevation: 12,
    },
    glow: {
      shadowColor: '#0066FF',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 10,
    },
  },
};
