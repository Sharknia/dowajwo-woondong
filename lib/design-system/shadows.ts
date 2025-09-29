/**
 * Shadow and glow effects for Dowajwo-Woondong
 * Apple Watch-inspired glow effects
 */

export const shadows = {
  // Standard shadows for light mode
  light: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  // Dark mode shadows (subtle)
  dark: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    default: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)',
  },

  // Neon glow effects
  glow: {
    green: '0 0 20px rgba(50, 215, 75, 0.5), 0 0 40px rgba(50, 215, 75, 0.3)',
    greenStrong: '0 0 30px rgba(50, 215, 75, 0.7), 0 0 60px rgba(50, 215, 75, 0.4)',
    greenSubtle: '0 0 10px rgba(50, 215, 75, 0.3), 0 0 20px rgba(50, 215, 75, 0.2)',
    blue: '0 0 20px rgba(0, 122, 255, 0.5), 0 0 40px rgba(0, 122, 255, 0.3)',
    orange: '0 0 20px rgba(255, 149, 0, 0.5), 0 0 40px rgba(255, 149, 0, 0.3)',
    red: '0 0 20px rgba(255, 59, 48, 0.5), 0 0 40px rgba(255, 59, 48, 0.3)',
  },

  // Button shadows
  button: {
    default: '0 2px 8px rgba(0, 0, 0, 0.15)',
    hover: '0 4px 12px rgba(0, 0, 0, 0.2)',
    active: '0 1px 4px rgba(0, 0, 0, 0.15)',
    neonGreen: '0 0 15px rgba(50, 215, 75, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)',
    neonGreenHover: '0 0 25px rgba(50, 215, 75, 0.6), 0 4px 12px rgba(0, 0, 0, 0.3)',
  },
};

export type Shadows = typeof shadows;