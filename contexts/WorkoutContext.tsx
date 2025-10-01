'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface WorkoutContextType {
  handleSessionClick: (sessionId: string) => void;
  handleEditWorkout: (sessionId: string) => void;
  handleDeleteWorkout: (sessionId: string) => void;
  handleStartWorkout: () => void;
  handleAddWorkout: (date?: Date) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const handleSessionClick = (sessionId: string) => {
    console.log('운동 세션 클릭:', sessionId);
    // TODO: 운동 상세 페이지로 이동
  };

  const handleEditWorkout = (sessionId: string) => {
    console.log('운동 편집:', sessionId);
    // TODO: 운동 편집 페이지로 이동
  };

  const handleDeleteWorkout = (sessionId: string) => {
    console.log('운동 삭제:', sessionId);
    // TODO: 삭제 확인 모달 및 실제 삭제 처리
  };

  const handleStartWorkout = () => {
    console.log('운동 시작하기 클릭');
    // TODO: 운동 시작 페이지로 이동
  };

  const handleAddWorkout = (date?: Date) => {
    console.log('운동 추가하기:', date);
    // TODO: 운동 추가 페이지로 이동
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
