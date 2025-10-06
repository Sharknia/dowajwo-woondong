'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography, borderRadius } from '@/lib/design-system';

export interface WorkoutSession {
  id: string;
  date: string;
  exerciseName: string;
  duration: number; // 분 단위
  sets: number;
  reps: number;
  weight?: number; // kg 단위
}

interface WorkoutListItemProps {
  workout: WorkoutSession;
  onClick?: () => void;
  showDivider?: boolean;
}

/**
 * 운동 리스트 아이템 공용 컴포넌트
 * 운동 기록을 표시하는 재사용 가능한 리스트 아이템
 */
export function WorkoutListItem({ workout, onClick, showDivider = true }: WorkoutListItemProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = React.useState(false);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
    padding: spacing[4],
    cursor: onClick ? 'pointer' : 'default',
    borderRadius: borderRadius.lg,
    background: isHovered && onClick
      ? isDark
        ? 'rgba(255, 255, 255, 0.03)'
        : 'rgba(0, 0, 0, 0.02)'
      : 'transparent',
    transition: 'all 0.2s ease',
    borderBottom: showDivider
      ? `1px solid ${isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary}`
      : 'none',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const exerciseNameStyle: React.CSSProperties = {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semibold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    margin: 0,
  };

  const dateStyle: React.CSSProperties = {
    fontSize: typography.fontSize.small,
    color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
  };

  const statsContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: spacing[4],
    flexWrap: 'wrap',
  };

  const statItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'baseline',
    gap: spacing[1],
  };

  const statValueStyle: React.CSSProperties = {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.neonGreen,
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: typography.fontSize.small,
    color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
    >
      <div style={headerStyle}>
        <h4 style={exerciseNameStyle}>{workout.exerciseName}</h4>
        <span style={dateStyle}>{formatDate(workout.date)}</span>
      </div>

      <div style={statsContainerStyle}>
        <div style={statItemStyle}>
          <span style={statValueStyle}>{workout.duration}분</span>
          <span style={statLabelStyle}>시간</span>
        </div>

        <div style={statItemStyle}>
          <span style={statValueStyle}>{workout.sets}</span>
          <span style={statLabelStyle}>세트</span>
        </div>

        <div style={statItemStyle}>
          <span style={statValueStyle}>{workout.reps}</span>
          <span style={statLabelStyle}>반복</span>
        </div>

        {workout.weight && (
          <div style={statItemStyle}>
            <span style={statValueStyle}>{workout.weight}kg</span>
            <span style={statLabelStyle}>중량</span>
          </div>
        )}
      </div>
    </div>
  );
}