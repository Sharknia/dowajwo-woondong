'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, typography, spacing } from '@/lib/design-system';

interface DividerProps {
  text?: string;
  orientation?: 'horizontal' | 'vertical';
  margin?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Divider({
  text,
  orientation = 'horizontal',
  margin = 'md'
}: DividerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const marginMap = {
    sm: spacing[2],
    md: spacing[4],
    lg: spacing[6],
    xl: spacing[8],
  };

  if (orientation === 'vertical') {
    const verticalStyle = {
      width: '1px',
      height: '100%',
      background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      margin: `0 ${marginMap[margin]}`,
    };

    return <div style={verticalStyle} />;
  }

  if (text) {
    const containerStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[4],
      margin: `${marginMap[margin]} 0`,
    };

    const lineStyle = {
      flex: 1,
      height: '1px',
      background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    };

    const textStyle = {
      fontSize: typography.fontSize.caption,
      color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
      fontFamily: typography.fontFamily.sans,
    };

    return (
      <div style={containerStyle}>
        <div style={lineStyle} />
        <span style={textStyle}>{text}</span>
        <div style={lineStyle} />
      </div>
    );
  }

  const horizontalStyle = {
    width: '100%',
    height: '1px',
    background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    margin: `${marginMap[margin]} 0`,
  };

  return <div style={horizontalStyle} />;
}