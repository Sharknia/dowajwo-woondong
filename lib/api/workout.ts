import type { WorkoutSession, Exercise, WorkoutSet } from '@/types/workout';

/**
 * 운동 세션 API 유틸리티
 *
 * 현재는 localStorage 기반으로 구현되어 있으며,
 * 향후 실제 API로 마이그레이션할 수 있도록 설계되었습니다.
 */

const STORAGE_KEY = 'workout-sessions';

/**
 * localStorage에서 모든 운동 세션 가져오기
 */
function getStoredSessions(): WorkoutSession[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load workout sessions:', error);
    return [];
  }
}

/**
 * localStorage에 운동 세션 저장하기
 */
function saveStoredSessions(sessions: WorkoutSession[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('Failed to save workout sessions:', error);
    throw new Error('저장에 실패했습니다.');
  }
}

/**
 * 새로운 운동 세션 생성
 */
export async function createWorkoutSession(data: Omit<WorkoutSession, 'id'>): Promise<WorkoutSession> {
  // TODO: 실제 API 구현
  // const response = await fetch('/api/workout/sessions', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) throw new Error('Failed to create session');
  // return response.json();

  const sessions = getStoredSessions();
  const newSession: WorkoutSession = {
    ...data,
    id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };

  sessions.push(newSession);
  saveStoredSessions(sessions);

  return newSession;
}

/**
 * 운동 세션 업데이트
 */
export async function updateWorkoutSession(
  id: string,
  data: Partial<Omit<WorkoutSession, 'id'>>
): Promise<WorkoutSession> {
  // TODO: 실제 API 구현
  // const response = await fetch(`/api/workout/sessions/${id}`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) throw new Error('Failed to update session');
  // return response.json();

  const sessions = getStoredSessions();
  const index = sessions.findIndex(s => s.id === id);

  if (index === -1) {
    throw new Error('운동 세션을 찾을 수 없습니다.');
  }

  sessions[index] = { ...sessions[index], ...data };
  saveStoredSessions(sessions);

  return sessions[index];
}

/**
 * 운동 세션 삭제
 */
export async function deleteWorkoutSession(id: string): Promise<void> {
  // TODO: 실제 API 구현
  // const response = await fetch(`/api/workout/sessions/${id}`, {
  //   method: 'DELETE',
  // });
  // if (!response.ok) throw new Error('Failed to delete session');

  const sessions = getStoredSessions();
  const filtered = sessions.filter(s => s.id !== id);

  if (filtered.length === sessions.length) {
    throw new Error('운동 세션을 찾을 수 없습니다.');
  }

  saveStoredSessions(filtered);
}

/**
 * 특정 운동 세션 가져오기
 */
export async function getWorkoutSession(id: string): Promise<WorkoutSession | null> {
  // TODO: 실제 API 구현
  // const response = await fetch(`/api/workout/sessions/${id}`);
  // if (!response.ok) {
  //   if (response.status === 404) return null;
  //   throw new Error('Failed to fetch session');
  // }
  // return response.json();

  const sessions = getStoredSessions();
  return sessions.find(s => s.id === id) || null;
}

/**
 * 모든 운동 세션 가져오기
 */
export async function getAllWorkoutSessions(): Promise<WorkoutSession[]> {
  // TODO: 실제 API 구현
  // const response = await fetch('/api/workout/sessions');
  // if (!response.ok) throw new Error('Failed to fetch sessions');
  // return response.json();

  return getStoredSessions();
}

/**
 * 날짜별 운동 세션 가져오기
 */
export async function getWorkoutSessionsByDate(date: string): Promise<WorkoutSession[]> {
  // TODO: 실제 API 구현
  // const response = await fetch(`/api/workout/sessions?date=${date}`);
  // if (!response.ok) throw new Error('Failed to fetch sessions');
  // return response.json();

  const sessions = getStoredSessions();
  return sessions.filter(s => s.date === date);
}

/**
 * 폼 데이터를 WorkoutSession으로 변환
 */
export function convertFormDataToWorkoutSession(
  formData: {
    date: string;
    exercises: Array<{
      id: string;
      name: string;
      sets: Array<{ weight: number; reps: number; completed: boolean }>;
    }>;
    totalDuration?: number;
    notes?: string;
  }
): Omit<WorkoutSession, 'id'> {
  return {
    date: formData.date,
    exercises: formData.exercises.map(ex => ({
      id: ex.id,
      name: ex.name,
      sets: ex.sets.map(s => ({
        weight: s.weight,
        reps: s.reps,
        completed: s.completed,
      })),
    })),
    totalDuration: formData.totalDuration,
    notes: formData.notes,
  };
}
