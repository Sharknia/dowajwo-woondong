'use client';

import React, { forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, typography, spacing, borderRadius, focus } from '@/lib/design-system';

export type SelectSize = 'sm' | 'md' | 'lg';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'style' | 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: SelectSize;
  fullWidth?: boolean;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    label,
    error,
    hint,
    size = 'md',
    fullWidth = true,
    options,
    id,
    disabled,
    ...props
  }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [isFocused, setIsFocused] = React.useState(false);

    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const sizeStyles = {
      sm: {
        padding: `${spacing[2]} ${spacing[3]}`,
        fontSize: typography.fontSize.sm,
      },
      md: {
        padding: `${spacing[3]} ${spacing[4]}`,
        fontSize: typography.fontSize.base,
      },
      lg: {
        padding: `${spacing[4]} ${spacing[5]}`,
        fontSize: typography.fontSize.lg,
      },
    };

    const containerStyle = {
      width: fullWidth ? '100%' : 'auto',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: spacing[2],
    };

    const labelStyle = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: isDark ? colors.text.dark.primary : colors.text.light.primary,
      fontFamily: typography.fontFamily.sans,
    };

    const selectStyle = {
      ...sizeStyles[size],
      width: '100%',
      fontFamily: typography.fontFamily.sans,
      background: isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary,
      color: isDark ? colors.text.dark.primary : colors.text.light.primary,
      border: error
        ? `2px solid ${colors.utility.error}`
        : isFocused
        ? (isDark ? focus.input.dark.border : focus.input.light.border)
        : `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      borderRadius: borderRadius.lg,
      outline: 'none',
      transition: `all 0.3s ease, ${focus.transition}`,
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: error
        ? (isDark ? focus.danger.dark.boxShadow : focus.danger.light.boxShadow)
        : isFocused
        ? (isDark ? focus.input.dark.boxShadow : focus.input.light.boxShadow)
        : 'none',
    };

    const messageStyle = {
      fontSize: typography.fontSize.xs,
      fontFamily: typography.fontFamily.sans,
      marginTop: spacing[1],
    };

    const errorStyle = {
      ...messageStyle,
      color: colors.utility.error,
    };

    const hintStyle = {
      ...messageStyle,
      color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
    };

    return (
      <div style={containerStyle}>
        {label && (
          <label htmlFor={selectId} style={labelStyle}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          style={selectStyle}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${selectId}-error` :
            hint ? `${selectId}-hint` :
            undefined
          }
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span id={`${selectId}-error`} style={errorStyle} role="alert">{error}</span>}
        {hint && !error && <span id={`${selectId}-hint`} style={hintStyle}>{hint}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
