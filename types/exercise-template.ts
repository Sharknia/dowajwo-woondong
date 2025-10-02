/**
 * 운동 템플릿 타입 정의
 * 사용자가 자주 하는 운동을 템플릿으로 등록하여 관리
 */

// 운동 부위 카테고리
export enum ExerciseCategory {
  CHEST = '가슴',
  BACK = '등',
  LEGS = '다리',
  SHOULDERS = '어깨',
  ARMS = '팔',
  ABS = '복근',
  OTHERS = '기타'
}

// 운동 기구 타입
export enum EquipmentType {
  MACHINE = '머신',
  BARBELL = '바벨',
  DUMBBELL = '덤벨',
  CABLE = '케이블',
  BODYWEIGHT = '맨몸'
}

// 무게 단위
export enum WeightUnit {
  KG = 'kg',
  LBS = 'lbs'
}

// 운동 템플릿 인터페이스
export interface ExerciseTemplate {
  id: string;
  name: string;                    // 운동명
  category: ExerciseCategory;      // 부위
  equipmentType: EquipmentType;    // 기구
  defaultWeightUnit: WeightUnit;   // 무게 단위
  notes?: string;                  // 메모
  createdAt: string;
  lastUsedAt?: string;
}

// 부위별 아이콘 매핑
export const CATEGORY_ICONS: Record<ExerciseCategory, string> = {
  [ExerciseCategory.CHEST]: '💪',
  [ExerciseCategory.BACK]: '🦾',
  [ExerciseCategory.LEGS]: '🦵',
  [ExerciseCategory.SHOULDERS]: '💪',
  [ExerciseCategory.ARMS]: '💪',
  [ExerciseCategory.ABS]: '💪',
  [ExerciseCategory.OTHERS]: '💪',
};

// 정렬 옵션
export enum SortOption {
  RECENT = 'recent',      // 최근 사용순
  NAME = 'name',          // 이름순
  CATEGORY = 'category'   // 부위별
}
