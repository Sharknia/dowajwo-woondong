'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/design-system';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showText?: boolean;
  title?: string;
  subtitle?: string;
}

export function Logo({
  size = 'md',
  animated = true,
  showText = true,
  title = 'Dowajwo-Woondong',
  subtitle
}: LogoProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sizeMap = {
    sm: {
      icon: '48px',
      svg: '28',
      title: typography.fontSize.lg,
      subtitle: typography.fontSize.xs,
    },
    md: {
      icon: '80px',
      svg: '48',
      title: typography.fontSize['2xl'],
      subtitle: typography.fontSize.sm,
    },
    lg: {
      icon: '120px',
      svg: '72',
      title: typography.fontSize['3xl'],
      subtitle: typography.fontSize.base,
    },
  };

  const containerStyle = {
    textAlign: 'center' as const,
  };

  const logoIconStyle = {
    width: sizeMap[size].icon,
    height: sizeMap[size].icon,
    margin: '0 auto',
    marginBottom: showText ? spacing[4] : 0,
    background: colors.gradients.neonGlow,
    borderRadius: borderRadius.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: shadows.glow.green,
    animation: animated ? 'pulse 2s infinite' : 'none',
  };

  const titleStyle = {
    fontSize: sizeMap[size].title,
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    marginBottom: subtitle ? spacing[2] : 0,
    fontFamily: typography.fontFamily.sans,
  };

  const subtitleStyle = {
    fontSize: sizeMap[size].subtitle,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    fontFamily: typography.fontFamily.sans,
  };

  return (
    <div style={containerStyle}>
      <style jsx global>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 20px rgba(50, 215, 75, 0.5), 0 0 40px rgba(50, 215, 75, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(50, 215, 75, 0.7), 0 0 60px rgba(50, 215, 75, 0.5);
          }
          100% {
            box-shadow: 0 0 20px rgba(50, 215, 75, 0.5), 0 0 40px rgba(50, 215, 75, 0.3);
          }
        }
      `}</style>

      <div style={logoIconStyle}>
        <svg
          width={sizeMap[size].svg}
          height={sizeMap[size].svg}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 4l7 7-7 7M6 17l7-7-7-7" />
        </svg>
      </div>

      {showText && (
        <>
          <h1 style={titleStyle}>{title}</h1>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        </>
      )}
    </div>
  );
}