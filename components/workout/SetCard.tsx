'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography, borderRadius } from '@/lib/design-system';
import type { WorkoutSet } from '@/types/workout';

interface SetCardProps {
  set: WorkoutSet;
  setNumber: number;
  onClick?: () => void;
}

/**
 * 세트 카드 컴포넌트
 * 개별 세트 정보를 표시 (10kg 12번)
 */
export function SetCard({ set, setNumber, onClick }: SetCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
    padding: `${spacing[1]} ${spacing[2]}`,
    backgroundColor: isHovered && onClick
      ? isDark
        ? 'rgba(28, 28, 30, 0.8)'
        : 'rgba(242, 242, 247, 0.8)'
      : isDark
        ? 'rgba(28, 28, 30, 0.6)'
        : 'rgba(242, 242, 247, 0.6)',
    borderRadius: borderRadius.md,
    border: `1px solid ${
      isHovered && onClick
        ? colors.primary.neonGreen
        : isDark
          ? 'rgba(58, 58, 60, 0.3)'
          : 'rgba(209, 209, 214, 0.3)'
    }`,
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    width: '100%',
  };

  const weightStyle: React.CSSProperties = {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.neonGreen,
  };

  const separatorStyle: React.CSSProperties = {
    fontSize: typography.fontSize.small,
    color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
    fontWeight: typography.fontWeight.regular,
  };

  const repsStyle: React.CSSProperties = {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.medium,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
  };

  return (
    <div
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={weightStyle}>{set.weight}kg</span>
      <span style={separatorStyle}>×</span>
      <span style={repsStyle}>{set.reps}</span>
    </div>
  );
}