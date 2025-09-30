'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography, borderRadius } from '@/lib/design-system';
import { SetCard } from './SetCard';
import type { Exercise } from '@/types/workout';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
}

/**
 * 운동 종목 카드 컴포넌트
 * 벤치프레스 등 운동명과 세트 리스트를 표시
 */
export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
    paddingBottom: spacing[3],
    borderBottom: `1px solid ${isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary}`,
    cursor: onClick ? 'pointer' : 'default',
  };

  const exerciseNameStyle: React.CSSProperties = {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    marginBottom: spacing[2],
  };

  const setsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[2],
  };

  return (
    <div style={containerStyle} onClick={onClick}>
      <h4 style={exerciseNameStyle}>{exercise.name}</h4>
      <div style={setsContainerStyle}>
        {exercise.sets.map((set, index) => (
          <SetCard
            key={set.id}
            set={set}
            setNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
}