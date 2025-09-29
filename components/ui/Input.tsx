'use client';

import React, { forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, typography, spacing, borderRadius } from '@/lib/design-system';

export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style' | 'size'> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  size?: InputSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    success,
    hint,
    size = 'md',
    fullWidth = true,
    leftIcon,
    rightIcon,
    onRightIconClick,
    id,
    disabled,
    ...props
  }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [isFocused, setIsFocused] = React.useState(false);

    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

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

    const inputWrapperStyle = {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    };

    const inputStyle = {
      ...sizeStyles[size],
      width: '100%',
      fontFamily: typography.fontFamily.sans,
      background: isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary,
      color: isDark ? colors.text.dark.primary : colors.text.light.primary,
      border: `1px solid ${
        error
          ? colors.utility.error
          : success
          ? colors.utility.success
          : isFocused
          ? colors.primary.neonGreen
          : isDark
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)'
      }`,
      borderRadius: borderRadius.lg,
      outline: 'none',
      transition: 'all 0.3s ease',
      paddingLeft: leftIcon ? spacing[10] : sizeStyles[size].padding.split(' ')[1],
      paddingRight: rightIcon ? spacing[10] : sizeStyles[size].padding.split(' ')[1],
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
      boxShadow: error
        ? `0 0 0 3px ${isDark ? 'rgba(255, 59, 48, 0.2)' : 'rgba(255, 59, 48, 0.1)'}`
        : success
        ? `0 0 0 3px ${isDark ? 'rgba(52, 199, 89, 0.2)' : 'rgba(52, 199, 89, 0.1)'}`
        : isFocused
        ? `0 0 0 3px ${isDark ? 'rgba(50, 215, 75, 0.2)' : 'rgba(50, 215, 75, 0.1)'}`
        : 'none',
    };

    const iconStyle = {
      position: 'absolute' as const,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
    };

    const leftIconStyle = {
      ...iconStyle,
      left: spacing[3],
      pointerEvents: 'none' as const,
    };

    const rightIconStyle = {
      ...iconStyle,
      right: spacing[3],
      cursor: onRightIconClick ? 'pointer' : 'default',
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

    const successStyle = {
      ...messageStyle,
      color: colors.utility.success,
    };

    const hintStyle = {
      ...messageStyle,
      color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
    };

    return (
      <div style={containerStyle}>
        {label && (
          <label htmlFor={inputId} style={labelStyle}>
            {label}
          </label>
        )}
        <div style={inputWrapperStyle}>
          {leftIcon && <div style={leftIconStyle}>{leftIcon}</div>}
          <input
            ref={ref}
            id={inputId}
            style={inputStyle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            {...props}
          />
          {rightIcon && (
            <div
              style={rightIconStyle}
              onClick={onRightIconClick}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span style={errorStyle}>{error}</span>}
        {success && !error && <span style={successStyle}>{success}</span>}
        {hint && !error && !success && <span style={hintStyle}>{hint}</span>}
        <style jsx global>{`
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 30px ${isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary} inset !important;
            -webkit-text-fill-color: ${isDark ? colors.text.dark.primary : colors.text.light.primary} !important;
          }
        `}</style>
      </div>
    );
  }
);

Input.displayName = 'Input';