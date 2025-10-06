'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { WorkoutListItem, WorkoutSession } from './WorkoutListItem';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';

interface RecentWorkoutCardProps {
  workouts: WorkoutSession[];
  onWorkoutClick?: (workout: WorkoutSession) => void;
  maxItems?: number;
}

/**
 * 최근 운동 카드 컴포넌트
 * 카드 안에 운동 리스트를 표시
 */
export function RecentWorkoutCard({
  workouts,
  onWorkoutClick,
  maxItems = 5
}: RecentWorkoutCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.h2,
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    marginBottom: spacing[4],
  };

  const emptyStateStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: spacing[8],
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
  };

  const emptyIconStyle: React.CSSProperties = {
    fontSize: '48px',
    marginBottom: spacing[3],
  };

  const emptyTextStyle: React.CSSProperties = {
    fontSize: typography.fontSize.body,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    marginBottom: spacing[2],
  };

  const displayWorkouts = workouts.slice(0, maxItems);

  if (workouts.length === 0) {
    return (
      <div>
        <h2 style={titleStyle}>최근 운동</h2>
        <Card variant="default" padding="xl">
          <div style={emptyStateStyle}>
            <div style={emptyIconStyle}>📝</div>
            <p style={emptyTextStyle}>아직 운동 기록이 없습니다</p>
            <p style={{...emptyTextStyle, fontSize: typography.fontSize.caption}}>
              첫 운동을 시작해보세요!
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 style={titleStyle}>최근 운동</h2>
      <Card variant="default" padding="sm">
        {displayWorkouts.map((workout, index) => (
          <WorkoutListItem
            key={workout.id}
            workout={workout}
            onClick={() => onWorkoutClick?.(workout)}
            showDivider={index < displayWorkouts.length - 1}
          />
        ))}
      </Card>
    </div>
  );
}