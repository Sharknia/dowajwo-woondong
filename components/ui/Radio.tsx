'use client';

import React, { forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, typography, spacing, focus } from '@/lib/design-system';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'style' | 'size'> {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, size = 'md', id, disabled, ...props }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [isFocused, setIsFocused] = React.useState(false);

    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

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

    const radioStyle = {
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
            type="radio"
            id={radioId}
            style={radioStyle}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={!!error}
            aria-describedby={error ? `${radioId}-error` : undefined}
            {...props}
          />
          {label && (
            <label htmlFor={radioId} style={labelStyle}>
              {label}
            </label>
          )}
        </div>
        {error && <span id={`${radioId}-error`} style={errorStyle} role="alert">{error}</span>}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
