'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius, shadows } from '@/lib/design-system';

interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'elevated' | 'outlined';
  fullWidth?: boolean;
  className?: string;
}

export function Card({
  children,
  padding = 'lg',
  variant = 'default',
  fullWidth = false,
  className = ''
}: CardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const paddingMap = {
    sm: spacing[4],
    md: spacing[6],
    lg: spacing[8],
    xl: spacing[10],
  };

  const variantStyles = {
    default: {
      background: isDark ? colors.dark.surface : colors.light.surface,
      border: 'none',
      boxShadow: isDark ? shadows.dark.md : shadows.light.md,
    },
    elevated: {
      background: isDark ? colors.dark.surface : colors.light.surface,
      border: 'none',
      boxShadow: isDark ? shadows.dark.xl : shadows.light.xl,
    },
    outlined: {
      background: 'transparent',
      border: `1px solid ${isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary}`,
      boxShadow: 'none',
    },
  };

  const cardStyle = {
    ...variantStyles[variant],
    padding: paddingMap[padding],
    borderRadius: borderRadius['2xl'],
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={cardStyle} className={className}>
      {children}
    </div>
  );
}