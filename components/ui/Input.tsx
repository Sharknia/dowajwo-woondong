'use client';

import React, { forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, typography, spacing, borderRadius, focus, getTypographyStyle } from '@/lib/design-system';

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
        fontSize: typography.fontSize.caption,
      },
      md: {
        padding: `${spacing[3]} ${spacing[4]}`,
        fontSize: typography.fontSize.body,
      },
      lg: {
        padding: `${spacing[4]} ${spacing[5]}`,
        fontSize: typography.fontSize.h3,
      },
    };

    const containerStyle = {
      width: fullWidth ? '100%' : 'auto',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: spacing[2],
    };

    const labelStyle = {
      ...getTypographyStyle('label'),
      color: isDark ? colors.text.dark.primary : colors.text.light.primary,
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
      border: error
        ? `2px solid ${colors.utility.error}`
        : success
        ? `2px solid ${colors.utility.success}`
        : isFocused
        ? (isDark ? focus.input.dark.border : focus.input.light.border)
        : `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
      borderRadius: borderRadius.lg,
      outline: 'none',
      transition: `all 0.3s ease, ${focus.transition}`,
      paddingLeft: leftIcon ? spacing[10] : sizeStyles[size].padding.split(' ')[1],
      paddingRight: rightIcon ? spacing[10] : sizeStyles[size].padding.split(' ')[1],
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
      boxShadow: error
        ? (isDark ? focus.danger.dark.boxShadow : focus.danger.light.boxShadow)
        : success
        ? (isDark ? focus.success.dark.boxShadow : focus.success.light.boxShadow)
        : isFocused
        ? (isDark ? focus.input.dark.boxShadow : focus.input.light.boxShadow)
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
      ...getTypographyStyle('small'),
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

    // Required asterisk 분리 처리
    const labelText = label?.replace(/\s*\*\s*$/, '') || '';
    const isRequired = label?.includes('*');

    const requiredStyle = {
      color: colors.primary.neonGreen,
      marginLeft: '2px',
    };

    return (
      <div style={containerStyle}>
        {label && (
          <label htmlFor={inputId} style={labelStyle}>
            {labelText}
            {isRequired && <span style={requiredStyle}> *</span>}
          </label>
        )}
        <div style={inputWrapperStyle}>
          {leftIcon && <div style={leftIconStyle} aria-hidden="true">{leftIcon}</div>}
          <input
            ref={ref}
            id={inputId}
            style={inputStyle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` :
              success ? `${inputId}-success` :
              hint ? `${inputId}-hint` :
              undefined
            }
            {...props}
          />
          {rightIcon && (
            <div
              style={rightIconStyle}
              onClick={onRightIconClick}
              role={onRightIconClick ? 'button' : undefined}
              tabIndex={onRightIconClick ? 0 : undefined}
              aria-label={onRightIconClick ? '입력 필드 추가 동작' : undefined}
              onKeyDown={(e) => {
                if (onRightIconClick && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onRightIconClick();
                }
              }}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span id={`${inputId}-error`} style={errorStyle} role="alert">{error}</span>}
        {success && !error && <span id={`${inputId}-success`} style={successStyle} role="status">{success}</span>}
        {hint && !error && !success && <span id={`${inputId}-hint`} style={hintStyle}>{hint}</span>}
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