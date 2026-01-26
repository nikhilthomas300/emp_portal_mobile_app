// 2026 Premium Enterprise Color System
const tintColorLight = '#2563EB';
const tintColorDark = '#fff';

export default {
  // Primary Brand Colors - Modern 2026 Blue Palette
  primary: '#2563EB', // Enterprise blue
  primaryDark: '#1D4ED8', // Deep blue for depth
  primaryLight: '#EFF6FF', // Light blue background
  primarySoft: '#3B82F6', // Softer blue for accents
  
  // Secondary Colors
  secondary: '#3B82F6',
  accent: '#7C3AED', // Premium purple accent
  
  // Semantic Colors
  success: '#10B981', // Modern emerald green
  warning: '#F59E0B', // Warm amber
  danger: '#EF4444', // Clean red
  info: '#0EA5E9', // Sky blue info
  
  // Text Colors - Refined Slate palette
  text: '#0F172A', // Deep slate for text
  textPrimary: '#0F172A',
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
  tabIconSelected: '#2563EB',
  
  // Premium Header Gradient - Rich Enterprise Blue
  gradientStart: '#0B1E42', // Deep navy
  gradientMiddle: '#153E75', // Rich blue
  gradientEnd: '#2563EB', // Bright blue
  
  // Secondary gradients
  gradientPrimary: ['#2563EB', '#3B82F6'] as [string, string],
  gradientSuccess: ['#10B981', '#34D399'] as [string, string],
  gradientPremium: ['#0B1E42', '#153E75', '#2563EB'] as [string, string, string],
  
  // Design tokens
  spacing: 20,
  radius: 24,
  radiusSm: 14,
  radiusLg: 28,
  radiusXl: 32,
  
  // Premium shadows
  shadows: {
    small: {
      shadowColor: '#64748B',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#64748B',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.06,
      shadowRadius: 16,
      elevation: 6,
    },
    large: {
      shadowColor: '#64748B',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.08,
      shadowRadius: 28,
      elevation: 12,
    },
    glow: {
      shadowColor: '#2563EB',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 10,
    },
  },
};
