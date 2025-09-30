'use client';

import React, { forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, typography, spacing, focus } from '@/lib/design-system';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'style' | 'size'> {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, size = 'md', id, disabled, ...props }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [isFocused, setIsFocused] = React.useState(false);

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
      outline: isFocused && !disabled
        ? (isDark ? focus.dark.outline : focus.light.outline)
        : 'none',
      outlineOffset: isFocused && !disabled ? '2px' : '0',
      transition: focus.transition,
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={!!error}
            aria-describedby={error ? `${checkboxId}-error` : undefined}
            {...props}
          />
          {label && (
            <label htmlFor={checkboxId} style={labelStyle}>
              {label}
            </label>
          )}
        </div>
        {error && <span id={`${checkboxId}-error`} style={errorStyle} role="alert">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';