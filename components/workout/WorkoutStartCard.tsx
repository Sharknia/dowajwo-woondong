'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';

interface WorkoutStartCardProps {
  onStartWorkout?: () => void;
}

/**
 * 운동 시작 카드 컴포넌트
 * 홈 화면 상단에 표시되는 운동 시작 버튼 카드
 */
export function WorkoutStartCard({ onStartWorkout }: WorkoutStartCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[4],
    alignItems: 'center',
    textAlign: 'center' as const,
  };

  const titleStyle = {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    margin: 0,
  };

  const descriptionStyle = {
    fontSize: typography.fontSize.sm,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    margin: 0,
  };

  const iconStyle = {
    fontSize: '48px',
    marginBottom: spacing[2],
  };

  return (
    <Card variant="elevated" padding="xl">
      <div style={containerStyle}>
        <div style={iconStyle}>💪</div>
        <h2 style={titleStyle}>오늘의 운동을 시작해보세요</h2>
        <p style={descriptionStyle}>
          AI가 당신의 운동 기록을 분석하여 최적의 운동 계획을 제안합니다
        </p>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onStartWorkout}
        >
          운동 시작하기
        </Button>
      </div>
    </Card>
  );
}