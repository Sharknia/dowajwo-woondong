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

  const [isHovered, setIsHovered] = React.useState(false);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
    paddingBottom: spacing[3],
    borderBottom: `1px solid ${isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary}`,
  };

  const exerciseNameButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: onClick ? 'pointer' : 'default',
    background: 'none',
    border: 'none',
    padding: 0,
    width: '100%',
    minHeight: '44px', // 터치 타겟 최소 크기
    transition: 'opacity 0.2s ease',
    opacity: isHovered ? 0.8 : 1,
  };

  const exerciseNameStyle: React.CSSProperties = {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semibold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    textAlign: 'left',
  };

  const chevronStyle: React.CSSProperties = {
    fontSize: '14px',
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    opacity: isHovered ? 1 : 0.4,
    transition: 'all 0.2s ease',
    transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
  };

  const setsContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[2],
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      {onClick ? (
        <button
          style={exerciseNameButtonStyle}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={`${exercise.name} 상세 기록 보기`}
        >
          <h4 style={exerciseNameStyle}>{exercise.name}</h4>
          <span style={chevronStyle}>›</span>
        </button>
      ) : (
        <h4 style={exerciseNameStyle}>{exercise.name}</h4>
      )}
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