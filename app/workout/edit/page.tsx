'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ExerciseInput, ExerciseFormData } from '@/components/workout/ExerciseInput';
import { SetFormData } from '@/components/workout/SetInput';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';
import {
  createWorkoutSession,
  updateWorkoutSession,
  getWorkoutSession,
  convertFormDataToWorkoutSession,
} from '@/lib/api/workout';
import type { WorkoutSession } from '@/types/workout';

interface WorkoutEditorState {
  date: string;
  exercises: ExerciseFormData[];
  totalDuration?: number;
  notes?: string;
  isDirty: boolean;
  isSaving: boolean;
}

function WorkoutEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [state, setState] = useState<WorkoutEditorState>({
    date: new Date().toISOString().split('T')[0],
    exercises: [],
    isDirty: false,
    isSaving: false,
  });

  // 초기 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      const id = searchParams.get('sessionId');
      const dateParam = searchParams.get('date');

      if (id) {
        // Edit 모드
        setMode('edit');
        setSessionId(id);
        const session = await getWorkoutSession(id);

        if (session) {
          setState({
            date: session.date,
            exercises: session.exercises.map(ex => ({
              id: ex.id,
              name: ex.name,
              sets: ex.sets.map(s => ({
                id: `set-${Date.now()}-${Math.random()}`,
                ...s,
              })),
              isEditing: false,
            })),
            totalDuration: session.totalDuration,
            notes: session.notes,
            isDirty: false,
            isSaving: false,
          });
        }
      } else if (dateParam) {
        // Create 모드 with date
        setState(prev => ({
          ...prev,
          date: dateParam,
        }));
      }
    };

    loadData();
  }, [searchParams]);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: isDark ? colors.dark.background : colors.light.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '120px', // 하단 고정 버튼 공간
  };

  const headerContainerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
    maxWidth: '420px',
    padding: `0 ${spacing[4]} ${spacing[4]} ${spacing[4]}`,
  };

  const dateStyle: React.CSSProperties = {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    textAlign: 'center',
  };

  const contentStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '420px',
    padding: `0 ${spacing[4]}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
    flex: 1,
  };

  const bottomBarStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: isDark ? colors.dark.surface : colors.light.surface,
    borderTop: `1px solid ${isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary}`,
    padding: spacing[4],
    display: 'flex',
    justifyContent: 'center',
    zIndex: 100,
  };

  const bottomBarContentStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '420px',
    display: 'flex',
    gap: spacing[2],
  };

  const emptyStateContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing[4],
  };

  const emptyStateIconStyle: React.CSSProperties = {
    fontSize: '48px',
    marginBottom: spacing[2],
  };

  const emptyStateTitleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    marginBottom: spacing[2],
  };

  const emptyStateDescStyle: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    marginBottom: spacing[4],
  };

  const addExerciseButtonStyle: React.CSSProperties = {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    marginTop: spacing[2],
  };

  const handleExerciseUpdate = (id: string, updates: Partial<ExerciseFormData>) => {
    setState(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex =>
        ex.id === id ? { ...ex, ...updates } : ex
      ),
      isDirty: true,
    }));
  };

  const handleExerciseDelete = (id: string) => {
    setState(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== id),
      isDirty: true,
    }));
  };

  const handleAddExercise = () => {
    const newExercise: ExerciseFormData = {
      id: `exercise-${Date.now()}-${Math.random()}`,
      name: '',
      sets: [
        {
          id: `set-${Date.now()}-${Math.random()}`,
          weight: 0,
          reps: 0,
          completed: false,
        },
      ],
      isEditing: true,
    };

    setState(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
      isDirty: true,
    }));

    // 새 운동명 입력에 포커스
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[aria-label="운동 이름"]');
      const lastInput = inputs[inputs.length - 1] as HTMLInputElement;
      lastInput?.focus();
    }, 0);
  };

  const handleSave = async () => {
    // 유효성 검증
    const hasEmptyExercise = state.exercises.some(ex => !ex.name.trim());
    if (hasEmptyExercise) {
      alert('모든 운동에 이름을 입력해주세요.');
      return;
    }

    if (state.exercises.length === 0) {
      alert('최소 한 개의 운동을 추가해주세요.');
      return;
    }

    setState(prev => ({ ...prev, isSaving: true }));

    try {
      const payload = convertFormDataToWorkoutSession({
        date: state.date,
        exercises: state.exercises.map(ex => ({
          id: ex.id,
          name: ex.name,
          sets: ex.sets,
        })),
        totalDuration: state.totalDuration,
        notes: state.notes,
      });

      if (mode === 'edit' && sessionId) {
        await updateWorkoutSession(sessionId, payload);
      } else {
        await createWorkoutSession(payload);
      }

      setState(prev => ({ ...prev, isDirty: false }));
      router.push('/');
    } catch (error) {
      console.error('Failed to save workout:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setState(prev => ({ ...prev, isSaving: false }));
    }
  };

  const handleCancel = () => {
    if (state.isDirty) {
      const confirmed = confirm('저장하지 않은 변경사항이 있습니다. 정말 나가시겠습니까?');
      if (!confirmed) return;
    }
    router.push('/');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  return (
    <div style={containerStyle}>
      {/* 헤더 */}
      <header style={headerContainerStyle}>
        <Card variant="default" padding="md">
          <h1 style={dateStyle}>{formatDate(state.date)}</h1>
        </Card>
      </header>

      {/* 운동 목록 */}
      <main style={contentStyle}>
        {state.exercises.length === 0 ? (
          <Card variant="elevated" padding="xl">
            <div style={emptyStateContainerStyle}>
              <div style={emptyStateIconStyle}>💪</div>
              <h2 style={emptyStateTitleStyle}>운동을 추가해보세요</h2>
              <p style={emptyStateDescStyle}>
                오늘의 운동 기록을 시작하세요
              </p>
            </div>
          </Card>
        ) : (
          state.exercises.map(exercise => (
            <ExerciseInput
              key={exercise.id}
              exercise={exercise}
              onUpdate={handleExerciseUpdate}
              onDelete={handleExerciseDelete}
            />
          ))
        )}

        {/* 운동 추가 버튼 */}
        <Button
          variant="primary"
          onClick={handleAddExercise}
          fullWidth
          style={addExerciseButtonStyle}
        >
          + 운동 추가
        </Button>
      </main>

      {/* 하단 고정 버튼 */}
      <div style={bottomBarStyle}>
        <div style={bottomBarContentStyle}>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={state.isSaving}
            fullWidth
          >
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            isLoading={state.isSaving}
            disabled={!state.isDirty || state.isSaving}
            fullWidth
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function WorkoutEditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkoutEditorContent />
    </Suspense>
  );
}
