'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { ExerciseCard } from './ExerciseCard';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';
import type { WorkoutSession } from '@/types/workout';

interface WorkoutSessionCardProps {
  session: WorkoutSession;
  onClick?: () => void;
  onEdit?: () => void;
}

/**
 * 운동 세션 카드 컴포넌트
 * 날짜별 운동 묶음을 표시 (9월 15일 운동)
 */
export function WorkoutSessionCard({ session, onClick, onEdit }: WorkoutSessionCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isEditHovered, setIsEditHovered] = React.useState(false);

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
    paddingBottom: spacing[3],
    borderBottom: `2px solid ${isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary}`,
  };

  const headerLeftStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
  };

  const dateStyle: React.CSSProperties = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
  };

  const statsStyle: React.CSSProperties = {
    fontSize: typography.fontSize.xs,
    color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
  };

  const editButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: onEdit ? 'pointer' : 'default',
    padding: spacing[2],
    minWidth: '44px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    opacity: isEditHovered ? 1 : 0.7,
    transition: 'opacity 0.2s ease',
  };

  const editIconStyle: React.CSSProperties = {
    fontSize: typography.fontSize.xl,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    lineHeight: 1,
  };

  const exercisesContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '오늘 운동';
    if (diffDays === 1) return '어제 운동';

    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    }) + ' 운동';
  };

  const totalExercises = session.exercises.length;
  const totalSets = session.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);

  return (
    <Card variant="default" padding="lg">
      <div>
        <div style={headerStyle}>
          <div style={headerLeftStyle}>
            <h3 style={dateStyle}>{formatDate(session.date)}</h3>
            <span style={statsStyle}>
              {totalExercises}개 · {totalSets}세트
              {session.totalDuration && ` · ${session.totalDuration}분`}
            </span>
          </div>
          {onEdit && (
            <button
              style={editButtonStyle}
              onClick={onEdit}
              onMouseEnter={() => setIsEditHovered(true)}
              onMouseLeave={() => setIsEditHovered(false)}
              aria-label="운동 기록 수정"
            >
              <span style={editIconStyle}>⋯</span>
            </button>
          )}
        </div>
        <div style={exercisesContainerStyle}>
          {session.exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={onClick}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}