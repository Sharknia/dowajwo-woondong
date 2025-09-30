'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { WorkoutStartCard } from '@/components/workout/WorkoutStartCard';
import { RecentWorkoutCard } from '@/components/workout/RecentWorkoutCard';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing } from '@/lib/design-system';

// 샘플 데이터 (나중에 API로 교체 예정)
const sampleWorkouts = [
  {
    id: '1',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 어제
    exerciseName: '벤치 프레스',
    duration: 45,
    sets: 4,
    reps: 10,
    weight: 80,
  },
  {
    id: '2',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3일 전
    exerciseName: '스쿼트',
    duration: 50,
    sets: 5,
    reps: 12,
    weight: 100,
  },
  {
    id: '3',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5일 전
    exerciseName: '데드리프트',
    duration: 40,
    sets: 3,
    reps: 8,
    weight: 120,
  },
];

function HomeContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeNavItem, setActiveNavItem] = useState('home');

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

  const handleStartWorkout = () => {
    console.log('운동 시작하기 클릭');
    // TODO: 운동 시작 페이지로 이동
  };

  const handleWorkoutClick = (workout: any) => {
    console.log('운동 카드 클릭:', workout);
    // TODO: 운동 상세 페이지로 이동
  };

  const handleNavClick = (itemId: string) => {
    console.log('네비게이션 아이템 클릭:', itemId);
    setActiveNavItem(itemId);
    // TODO: 페이지 네비게이션 구현
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <WorkoutStartCard onStartWorkout={handleStartWorkout} />
        <RecentWorkoutCard
          workouts={sampleWorkouts}
          onWorkoutClick={handleWorkoutClick}
          maxItems={5}
        />
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
      <HomeContent />
    </ThemeProvider>
  );
}