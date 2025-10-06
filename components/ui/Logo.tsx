'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, getTypographyStyle } from '@/lib/design-system';
import type { TypographyPreset } from '@/lib/design-system';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center';
}

export function Logo({ size = 'md', align = 'left' }: LogoProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sizeMap = {
    sm: { title: 'h3', subtitle: 'small' as TypographyPreset },
    md: { title: 'h1', subtitle: 'caption' as TypographyPreset },
    lg: { title: 'display', subtitle: 'body' as TypographyPreset },
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: align === 'center' ? 'center' : 'flex-start',
    gap: spacing[1],
  };

  const titleStyle = {
    ...getTypographyStyle(sizeMap[size].title as TypographyPreset),
    background: colors.gradients.neonGlow,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const subtitleStyle = {
    ...getTypographyStyle(sizeMap[size].subtitle),
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>도와줘 운동</h1>
      <p style={subtitleStyle}>AI 운동 트레이너</p>
    </div>
  );
}