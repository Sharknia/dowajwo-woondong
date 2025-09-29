/**
 * Apple Watch-inspired color palette for Dowajwo-Woondong
 * Neon green accent colors with dark backgrounds
 */

export const colors = {
  // Primary colors - Apple Watch Activity Ring inspired
  primary: {
    neonGreen: '#32D74B', // Main accent color (Activity ring green)
    lightGreen: '#64E35D',
    darkGreen: '#28A23C',
  },

  // Secondary colors
  secondary: {
    electricBlue: '#007AFF', // iOS blue
    orange: '#FF9500', // Activity ring orange
    red: '#FF3B30', // Activity ring red
    yellow: '#FFD60A', // Warning yellow
  },

  // Background colors for dark mode
  dark: {
    background: '#000000', // Pure black for OLED
    surface: '#1C1C1E', // Elevated surface
    surfaceSecondary: '#2C2C2E', // Secondary surface
    surfaceTertiary: '#3A3A3C', // Tertiary surface
  },

  // Background colors for light mode
  light: {
    background: '#FFFFFF',
    surface: '#F2F2F7',
    surfaceSecondary: '#E5E5EA',
    surfaceTertiary: '#D1D1D6',
  },

  // Text colors
  text: {
    dark: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      tertiary: 'rgba(255, 255, 255, 0.5)',
      disabled: 'rgba(255, 255, 255, 0.3)',
    },
    light: {
      primary: '#000000',
      secondary: 'rgba(0, 0, 0, 0.7)',
      tertiary: 'rgba(0, 0, 0, 0.5)',
      disabled: 'rgba(0, 0, 0, 0.3)',
    },
  },

  // Utility colors
  utility: {
    success: '#32D74B',
    error: '#FF3B30',
    warning: '#FFD60A',
    info: '#007AFF',
  },

  // Gradient combinations
  gradients: {
    neonGlow: 'linear-gradient(135deg, #32D74B 0%, #64E35D 100%)',
    darkFade: 'linear-gradient(180deg, #000000 0%, #1C1C1E 100%)',
    glowButton: 'linear-gradient(135deg, #32D74B 0%, #28A23C 100%)',
  },
};

export type ColorScheme = typeof colors;