'use client';

import React, { forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, typography, spacing } from '@/lib/design-system';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'style'> {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, size = 'md', id, disabled, ...props }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const sizeMap = {
      sm: '16px',
      md: '20px',
      lg: '24px',
    };

    const containerStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
    };

    const checkboxStyle = {
      width: sizeMap[size],
      height: sizeMap[size],
      accentColor: colors.primary.neonGreen,
      cursor: disabled ? 'not-allowed' : 'pointer',
    };

    const labelStyle = {
      fontSize: size === 'sm' ? typography.fontSize.xs : size === 'md' ? typography.fontSize.sm : typography.fontSize.base,
      color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
      fontFamily: typography.fontFamily.sans,
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none' as const,
    };

    const errorStyle = {
      fontSize: typography.fontSize.xs,
      color: colors.utility.error,
      marginTop: spacing[1],
      fontFamily: typography.fontFamily.sans,
    };

    return (
      <div>
        <div style={containerStyle}>
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            style={checkboxStyle}
            disabled={disabled}
            {...props}
          />
          {label && (
            <label htmlFor={checkboxId} style={labelStyle}>
              {label}
            </label>
          )}
        </div>
        {error && <span style={errorStyle}>{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';