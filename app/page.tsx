'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { WorkoutProvider, useWorkout } from '@/contexts/WorkoutContext';
import { WorkoutStartCard } from '@/components/workout/WorkoutStartCard';
import { WorkoutSessionCard } from '@/components/workout/WorkoutSessionCard';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';
import type { WorkoutSession } from '@/types/workout';

// 샘플 데이터 (나중에 API로 교체 예정)
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
          { id: 'set9', weight: 100, reps: 8, completed: true },
        ],
      },
      {
        id: 'ex4',
        name: '레그 프레스',
        sets: [
          { id: 'set10', weight: 150, reps: 15, completed: true },
          { id: 'set11', weight: 150, reps: 12, completed: true },
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
          { id: 'set15', weight: 120, reps: 8, completed: true },
          { id: 'set16', weight: 120, reps: 8, completed: true },
          { id: 'set17', weight: 120, reps: 6, completed: true },
          { id: 'set18', weight: 120, reps: 6, completed: true },
          { id: 'set19', weight: 100, reps: 10, completed: true },
          { id: 'set20', weight: 100, reps: 10, completed: true },
          { id: 'set21', weight: 100, reps: 8, completed: true },
          { id: 'set22', weight: 80, reps: 12, completed: true },
          { id: 'set23', weight: 80, reps: 12, completed: true },
        ],
      },
    ],
  },
];

function HomeContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeNavItem, setActiveNavItem] = useState('home');
  const {
    handleSessionClick,
    handleEditWorkout,
    handleDeleteWorkout,
    handleStartWorkout
  } = useWorkout();

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
    maxWidth: '420px', // AuthLayout와 동일한 너비
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[6],
  };

  const handleNavClick = (itemId: string) => {
    console.log('네비게이션 아이템 클릭:', itemId);
    setActiveNavItem(itemId);
    // TODO: 페이지 네비게이션 구현
  };

  const recentWorkoutsTitleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.h2,
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    marginBottom: spacing[4],
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <WorkoutStartCard onStartWorkout={handleStartWorkout} />

        <div>
          <h2 style={recentWorkoutsTitleStyle}>최근 운동</h2>
          {sampleWorkouts.map((session) => (
            <div key={session.id} style={{ marginBottom: spacing[4] }}>
              <WorkoutSessionCard
                session={session}
                onClick={() => handleSessionClick(session.id)}
                onEdit={handleEditWorkout}
                onDelete={handleDeleteWorkout}
              />
            </div>
          ))}
        </div>
      </div>
      <NavigationBar
        activeItem={activeNavItem}
        onItemClick={handleNavClick}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <WorkoutProvider>
        <HomeContent />
      </WorkoutProvider>
    </ThemeProvider>
  );
}