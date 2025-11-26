import { Platform, ViewStyle } from 'react-native';

interface ShadowOptions {
  offsetHeight?: number;
  offsetWidth?: number;
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}

/**
 * Creates cross-platform shadow styles.
 * On web, uses CSS box-shadow. On native, uses shadowOffset, shadowOpacity, etc.
 */
export function createShadow(options: ShadowOptions = {}): ViewStyle {
  const {
    offsetHeight = 2,
    offsetWidth = 0,
    shadowOpacity = 0.05,
    shadowRadius = 8,
    elevation = 2,
  } = options;

  if (Platform.OS === 'web') {
    // On web, use boxShadow CSS property
    return {
      boxShadow: `${offsetWidth}px ${offsetHeight}px ${shadowRadius}px rgba(0, 0, 0, ${shadowOpacity})`,
    } as ViewStyle;
  }

  // On native platforms
  return {
    shadowColor: '#000',
    shadowOffset: {
      width: offsetWidth,
      height: offsetHeight,
    },
    shadowOpacity,
    shadowRadius,
    elevation,
  };
}

// Predefined shadow styles
export const shadows = {
  small: createShadow({
    offsetHeight: 2,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  }),
  medium: createShadow({
    offsetHeight: 4,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  }),
  large: createShadow({
    offsetHeight: 8,
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  }),
};
