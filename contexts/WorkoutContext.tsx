'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { deleteWorkoutSession } from '@/lib/api/workout';

interface WorkoutContextType {
  handleSessionClick: (sessionId: string) => void;
  handleEditWorkout: (sessionId: string) => void;
  handleDeleteWorkout: (sessionId: string) => void;
  handleStartWorkout: () => void;
  handleAddWorkout: (date?: Date) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleSessionClick = (sessionId: string) => {
    console.log('운동 세션 클릭:', sessionId);
    // TODO: 운동 상세 페이지로 이동 (향후 구현)
    // router.push(`/workout/${sessionId}`);
  };

  const handleEditWorkout = (sessionId: string) => {
    console.log('운동 편집:', sessionId);
    // 운동 편집 페이지로 이동
    router.push(`/workout/edit?sessionId=${sessionId}`);
  };

  const handleDeleteWorkout = async (sessionId: string) => {
    console.log('운동 삭제:', sessionId);

    const confirmed = confirm('정말 이 운동 기록을 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      await deleteWorkoutSession(sessionId);
      // 페이지 새로고침하여 목록 갱신
      router.refresh();
    } catch (error) {
      console.error('Failed to delete workout:', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleStartWorkout = () => {
    console.log('운동 시작하기 클릭');
    // 현재 날짜로 새 운동 시작
    const today = new Date().toISOString().split('T')[0];
    router.push(`/workout/edit?date=${today}`);
  };

  const handleAddWorkout = (date?: Date) => {
    console.log('운동 추가하기:', date);
    // 선택된 날짜 또는 현재 날짜로 운동 추가
    const targetDate = date
      ? date.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
    router.push(`/workout/edit?date=${targetDate}`);
  };

  return (
    <WorkoutContext.Provider value={{
      handleSessionClick,
      handleEditWorkout,
      handleDeleteWorkout,
      handleStartWorkout,
      handleAddWorkout
    }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}
