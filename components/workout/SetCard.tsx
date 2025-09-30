'use client';

import React from 'react';
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

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[1]} ${spacing[3]}`,
    background: isDark ? 'rgba(50, 215, 75, 0.08)' : 'rgba(50, 215, 75, 0.06)',
    border: `1px solid ${isDark ? 'rgba(50, 215, 75, 0.15)' : 'rgba(50, 215, 75, 0.12)'}`,
    borderRadius: borderRadius.full,
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
  };

  const textStyle: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary.neonGreen,
  };

  return (
    <div style={containerStyle} onClick={onClick}>
      <span style={textStyle}>
        {set.weight}kg × {set.reps}회
      </span>
    </div>
  );
}