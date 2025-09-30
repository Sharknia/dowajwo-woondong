/**
 * Focus styles for accessibility
 * WCAG 2.1 compliant focus indicators
 */

import { colors } from './colors';

export const focus = {
  // 기본 포커스 스타일 (3px outline)
  default: {
    outline: `3px solid ${colors.primary.neonGreen}`,
    outlineOffset: '2px',
  },

  // 다크 모드 포커스 스타일
  dark: {
    outline: `3px solid ${colors.primary.neonGreen}`,
    outlineOffset: '2px',
    boxShadow: `0 0 0 4px rgba(50, 215, 75, 0.2)`,
  },

  // 라이트 모드 포커스 스타일
  light: {
    outline: `3px solid ${colors.primary.neonGreen}`,
    outlineOffset: '2px',
    boxShadow: `0 0 0 4px rgba(50, 215, 75, 0.15)`,
  },

  // 인풋 포커스 스타일
  input: {
    dark: {
      outline: 'none',
      border: `2px solid ${colors.primary.neonGreen}`,
      boxShadow: `0 0 0 3px rgba(50, 215, 75, 0.2)`,
    },
    light: {
      outline: 'none',
      border: `2px solid ${colors.primary.neonGreen}`,
      boxShadow: `0 0 0 3px rgba(50, 215, 75, 0.1)`,
    },
  },

  // 위험 요소 포커스 스타일
  danger: {
    dark: {
      outline: `3px solid ${colors.utility.error}`,
      outlineOffset: '2px',
      boxShadow: `0 0 0 4px rgba(255, 59, 48, 0.2)`,
    },
    light: {
      outline: `3px solid ${colors.utility.error}`,
      outlineOffset: '2px',
      boxShadow: `0 0 0 4px rgba(255, 59, 48, 0.15)`,
    },
  },

  // 성공 요소 포커스 스타일
  success: {
    dark: {
      outline: `3px solid ${colors.utility.success}`,
      outlineOffset: '2px',
      boxShadow: `0 0 0 4px rgba(50, 215, 75, 0.2)`,
    },
    light: {
      outline: `3px solid ${colors.utility.success}`,
      outlineOffset: '2px',
      boxShadow: `0 0 0 4px rgba(50, 215, 75, 0.15)`,
    },
  },

  // 포커스 트랜지션
  transition: 'outline 0.2s ease, box-shadow 0.2s ease, border 0.2s ease',
};

export type Focus = typeof focus;