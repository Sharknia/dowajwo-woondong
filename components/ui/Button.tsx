'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/design-system';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = React.useState(false);

  const sizeStyles = {
    sm: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.fontSize.sm,
    },
    md: {
      padding: `${spacing[3]} ${spacing[5]}`,
      fontSize: typography.fontSize.base,
    },
    lg: {
      padding: `${spacing[4]} ${spacing[6]}`,
      fontSize: typography.fontSize.lg,
    },
  };

  const variantStyles = {
    primary: {
      background: isHovered && !disabled && !isLoading
        ? 'linear-gradient(135deg, rgba(50, 215, 75, 0.95) 0%, rgba(46, 160, 67, 0.95) 100%)'
        : colors.gradients.glowButton,
      color: colors.text.dark.primary,
      border: 'none',
      boxShadow: isHovered && !disabled && !isLoading
        ? shadows.button.neonGreenHover
        : shadows.button.neonGreen,
      transform: isHovered && !disabled && !isLoading ? 'translateY(-2px)' : 'translateY(0)',
    },
    secondary: {
      background: isDark
        ? isHovered && !disabled && !isLoading
          ? colors.dark.surfaceTertiary
          : colors.dark.surfaceSecondary
        : isHovered && !disabled && !isLoading
          ? colors.light.surfaceTertiary
          : colors.light.surfaceSecondary,
      color: isDark ? colors.text.dark.primary : colors.text.light.primary,
      border: 'none',
      boxShadow: isDark ? shadows.dark.sm : shadows.light.sm,
      transform: isHovered && !disabled && !isLoading ? 'translateY(-1px)' : 'translateY(0)',
    },
    outline: {
      background: 'transparent',
      color: isHovered && !disabled && !isLoading
        ? colors.primary.neonGreen
        : isDark ? colors.text.dark.primary : colors.text.light.primary,
      border: `2px solid ${
        isHovered && !disabled && !isLoading
          ? colors.primary.neonGreen
          : isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary
      }`,
      boxShadow: isHovered && !disabled && !isLoading
        ? `0 0 10px ${isDark ? 'rgba(50, 215, 75, 0.3)' : 'rgba(50, 215, 75, 0.2)'}`
        : 'none',
      transform: 'translateY(0)',
    },
    ghost: {
      background: isHovered && !disabled && !isLoading
        ? isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
        : 'transparent',
      color: isDark ? colors.text.dark.primary : colors.text.light.primary,
      border: 'none',
      boxShadow: 'none',
      transform: 'translateY(0)',
    },
  };

  const buttonStyle = {
    ...sizeStyles[size],
    ...variantStyles[variant],
    width: fullWidth ? '100%' : 'auto',
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.sans,
    borderRadius: borderRadius.lg,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.6 : 1,
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    outline: 'none',
    position: 'relative' as const,
    overflow: 'hidden',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  return (
    <button
      style={buttonStyle}
      disabled={disabled || isLoading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {isLoading ? (
        <>
          <span style={{ animation: 'spin 1s linear infinite' }}>⟳</span>
          처리 중...
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}