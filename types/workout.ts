/**
 * 운동 데이터 타입 정의
 * 구조: 세션 > 운동 종목 > 세트
 */

// 개별 세트 데이터
export interface WorkoutSet {
  id: string;
  weight: number; // kg
  reps: number; // 반복 횟수
  completed: boolean;
}

// 운동 종목 (예: 벤치프레스)
export interface Exercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

// 운동 세션 (날짜별 운동 묶음)
export interface WorkoutSession {
  id: string;
  date: string;
  exercises: Exercise[];
  totalDuration?: number; // 총 운동 시간 (분)
  notes?: string;
}