/**
 * 운동 데이터 타입 정의
 * Next.js 앱에서 사용할 운동 데이터 모델
 */

// 세트 데이터
export interface SetData {
  set: number;
  weight_kg: number;
  reps: number;
}

// 운동 세션 (특정 날짜의 특정 운동)
export interface ExerciseSession {
  date: string; // YYYY-MM-DD format
  sets_data: SetData[];
}

// 일별 운동 로그
export interface DayLog {
  date: string; // YYYY-MM-DD format
  summary: string | null; // e.g., "등, 이두"
  details: string[]; // 수행한 운동 목록
}

// 전체 운동 데이터 구조
export interface WorkoutData {
  last_week_log: DayLog[];
  exercise_records: Record<string, ExerciseSession[]>; // 운동명 -> 세션 기록
}

/**
 * 운동 데이터 유효성 검증
 */
export function validateWorkoutData(data: any): data is WorkoutData {
  if (!data || typeof data !== 'object') return false;

  // last_week_log 검증
  if (!Array.isArray(data.last_week_log)) return false;

  for (const log of data.last_week_log) {
    if (!log.date || typeof log.date !== 'string') return false;
    if (log.summary !== null && typeof log.summary !== 'string') return false;
    if (!Array.isArray(log.details)) return false;
  }

  // exercise_records 검증
  if (!data.exercise_records || typeof data.exercise_records !== 'object') return false;

  for (const sessions of Object.values(data.exercise_records)) {
    if (!Array.isArray(sessions)) return false;

    for (const session of sessions as any[]) {
      if (!session.date || !Array.isArray(session.sets_data)) return false;

      for (const set of session.sets_data) {
        if (
          typeof set.set !== 'number' ||
          typeof set.weight_kg !== 'number' ||
          typeof set.reps !== 'number'
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

/**
 * 운동명 정규화 (공백을 언더스코어로 변환)
 */
export function normalizeExerciseName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w_가-힣]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * 샘플 운동 데이터 생성 (테스트용)
 */
export function createSampleWorkoutData(): WorkoutData {
  const today = new Date();
  const dates: string[] = [];

  // 지난 7일 날짜 생성
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }

  return {
    last_week_log: [
      {
        date: dates[0],
        summary: "가슴, 삼두",
        details: ["Bench Press", "Dumbbell Press", "Tricep Dips"]
      },
      {
        date: dates[1],
        summary: null,
        details: []
      },
      {
        date: dates[2],
        summary: "등, 이두",
        details: ["Lat Pull Down", "Seated Cable Row", "Barbell Curl"]
      },
      {
        date: dates[3],
        summary: "하체",
        details: ["Squat", "Leg Press", "Leg Curl"]
      },
      {
        date: dates[4],
        summary: null,
        details: []
      },
      {
        date: dates[5],
        summary: "어깨",
        details: ["Shoulder Press", "Lateral Raise", "Rear Delt Fly"]
      },
      {
        date: dates[6],
        summary: null,
        details: []
      }
    ],
    exercise_records: {
      "bench_press": [
        {
          date: dates[0],
          sets_data: [
            { set: 1, weight_kg: 60, reps: 12 },
            { set: 2, weight_kg: 70, reps: 10 },
            { set: 3, weight_kg: 75, reps: 8 },
            { set: 4, weight_kg: 75, reps: 6 }
          ]
        }
      ],
      "squat": [
        {
          date: dates[3],
          sets_data: [
            { set: 1, weight_kg: 80, reps: 10 },
            { set: 2, weight_kg: 90, reps: 8 },
            { set: 3, weight_kg: 100, reps: 6 }
          ]
        }
      ],
      "lat_pull_down": [
        {
          date: dates[2],
          sets_data: [
            { set: 1, weight_kg: 35, reps: 12 },
            { set: 2, weight_kg: 40, reps: 10 },
            { set: 3, weight_kg: 40, reps: 8 }
          ]
        }
      ]
    }
  };
}