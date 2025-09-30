'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Calendar } from '@/components/calendar/Calendar';
import { WorkoutSessionCard } from '@/components/workout/WorkoutSessionCard';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';
import type { WorkoutSession } from '@/types/workout';

// 샘플 운동 데이터 (나중에 API로 교체 예정)
const sampleWorkouts: WorkoutSession[] = [
  {
    id: '1',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 어제
    totalDuration: 45,
    exercises: [
      {
        id: 'ex1',
        name: '벤치 프레스',
        sets: [
          { id: 'set1', weight: 80, reps: 12, completed: true },
          { id: 'set2', weight: 80, reps: 10, completed: true },
          { id: 'set3', weight: 80, reps: 8, completed: true },
        ],
      },
      {
        id: 'ex2',
        name: '인클라인 벤치 프레스',
        sets: [
          { id: 'set4', weight: 60, reps: 12, completed: true },
          { id: 'set5', weight: 60, reps: 10, completed: true },
        ],
      },
    ],
  },
  {
    id: '2',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3일 전
    totalDuration: 50,
    exercises: [
      {
        id: 'ex3',
        name: '스쿼트',
        sets: [
          { id: 'set6', weight: 100, reps: 12, completed: true },
          { id: 'set7', weight: 100, reps: 10, completed: true },
          { id: 'set8', weight: 100, reps: 8, completed: true },
        ],
      },
    ],
  },
  {
    id: '3',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5일 전
    totalDuration: 60,
    exercises: [
      {
        id: 'ex5',
        name: '데드리프트',
        sets: [
          { id: 'set12', weight: 120, reps: 10, completed: true },
          { id: 'set13', weight: 120, reps: 10, completed: true },
          { id: 'set14', weight: 120, reps: 8, completed: true },
        ],
      },
    ],
  },
];

function CalendarPageContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeNavItem, setActiveNavItem] = useState('calendar');

  // 운동한 날짜들 추출
  const workoutDates = sampleWorkouts.map(workout => new Date(workout.date));

  // 선택된 날짜의 운동 데이터 찾기
  const selectedWorkout = sampleWorkouts.find(workout => {
    const workoutDate = new Date(workout.date);
    return workoutDate.getFullYear() === selectedDate.getFullYear() &&
           workoutDate.getMonth() === selectedDate.getMonth() &&
           workoutDate.getDate() === selectedDate.getDate();
  });

  const hasWorkout = !!selectedWorkout;

  // 스타일
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: isDark ? colors.dark.background : colors.light.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: spacing[6],
    paddingBottom: '100px', // 네비게이션 바 공간 확보
    paddingLeft: spacing[4],
    paddingRight: spacing[4],
  };

  const contentStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '420px',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[6],
  };

  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    marginBottom: spacing[2],
  };

  const selectedDateStyle: React.CSSProperties = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    marginBottom: spacing[4],
  };

  const emptyStateStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: spacing[8],
    color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
  };

  const emptyStateTitleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing[4],
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddWorkout = () => {
    console.log('운동 추가하기:', selectedDate);
    // TODO: 운동 추가 페이지로 이동
  };

  const handleNavClick = (itemId: string) => {
    console.log('네비게이션 아이템 클릭:', itemId);
    setActiveNavItem(itemId);
    // TODO: 페이지 네비게이션 구현
  };

  const formatSelectedDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div>
          <h1 style={titleStyle}>운동 캘린더</h1>
        </div>

        <Calendar
          selectedDate={selectedDate}
          workoutDates={workoutDates}
          onDateSelect={handleDateSelect}
        />

        <div>
          <div style={selectedDateStyle}>
            {formatSelectedDate(selectedDate)}
          </div>

          {hasWorkout && selectedWorkout ? (
            <WorkoutSessionCard
              session={selectedWorkout}
              onClick={() => console.log('운동 상세 보기')}
            />
          ) : (
            <div style={emptyStateStyle}>
              <div style={emptyStateTitleStyle}>
                이 날은 운동 기록이 없습니다
              </div>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddWorkout}
              >
                운동 추가하기
              </Button>
            </div>
          )}
        </div>
      </div>

      <NavigationBar
        activeItem={activeNavItem}
        onItemClick={handleNavClick}
      />
    </div>
  );
}

export default function CalendarPage() {
  return (
    <ThemeProvider>
      <CalendarPageContent />
    </ThemeProvider>
  );
}