import type { ExerciseTemplate, ExerciseCategory, SortOption } from '@/types/exercise-template';

/**
 * 운동 템플릿 API 유틸리티
 *
 * 현재는 localStorage 기반으로 구현되어 있으며,
 * 향후 실제 API로 마이그레이션할 수 있도록 설계되었습니다.
 */

const STORAGE_KEY = 'workout-templates';

/**
 * localStorage에서 모든 운동 템플릿 가져오기
 */
function getStoredTemplates(): ExerciseTemplate[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load exercise templates:', error);
    return [];
  }
}

/**
 * localStorage에 운동 템플릿 저장하기
 */
function saveStoredTemplates(templates: ExerciseTemplate[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (error) {
    console.error('Failed to save exercise templates:', error);
    throw new Error('저장에 실패했습니다.');
  }
}

/**
 * 새로운 운동 템플릿 생성
 */
export async function createExerciseTemplate(
  data: Omit<ExerciseTemplate, 'id' | 'createdAt'>
): Promise<ExerciseTemplate> {
  const templates = getStoredTemplates();
  const newTemplate: ExerciseTemplate = {
    ...data,
    id: `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };

  templates.push(newTemplate);
  saveStoredTemplates(templates);

  return newTemplate;
}

/**
 * 운동 템플릿 업데이트
 */
export async function updateExerciseTemplate(
  id: string,
  data: Partial<Omit<ExerciseTemplate, 'id' | 'createdAt'>>
): Promise<ExerciseTemplate> {
  const templates = getStoredTemplates();
  const index = templates.findIndex(t => t.id === id);

  if (index === -1) {
    throw new Error('운동 템플릿을 찾을 수 없습니다.');
  }

  templates[index] = { ...templates[index], ...data };
  saveStoredTemplates(templates);

  return templates[index];
}

/**
 * 운동 템플릿 삭제
 */
export async function deleteExerciseTemplate(id: string): Promise<void> {
  const templates = getStoredTemplates();
  const filtered = templates.filter(t => t.id !== id);

  if (filtered.length === templates.length) {
    throw new Error('운동 템플릿을 찾을 수 없습니다.');
  }

  saveStoredTemplates(filtered);
}

/**
 * 특정 운동 템플릿 가져오기
 */
export async function getExerciseTemplate(id: string): Promise<ExerciseTemplate | null> {
  const templates = getStoredTemplates();
  return templates.find(t => t.id === id) || null;
}

/**
 * 모든 운동 템플릿 가져오기 (필터/정렬 지원)
 */
export async function getAllExerciseTemplates(options?: {
  category?: ExerciseCategory;
  sort?: SortOption;
}): Promise<ExerciseTemplate[]> {
  let templates = getStoredTemplates();

  // 카테고리 필터
  if (options?.category) {
    templates = templates.filter(t => t.category === options.category);
  }

  // 정렬
  if (options?.sort) {
    switch (options.sort) {
      case 'recent':
        templates.sort((a, b) => {
          const aDate = a.lastUsedAt || a.createdAt;
          const bDate = b.lastUsedAt || b.createdAt;
          return new Date(bDate).getTime() - new Date(aDate).getTime();
        });
        break;
      case 'name':
        templates.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
        break;
      case 'category':
        templates.sort((a, b) => a.category.localeCompare(b.category, 'ko'));
        break;
    }
  }

  return templates;
}

/**
 * 템플릿 사용 시간 업데이트
 */
export async function updateTemplateUsage(id: string): Promise<void> {
  const templates = getStoredTemplates();
  const index = templates.findIndex(t => t.id === id);

  if (index !== -1) {
    templates[index].lastUsedAt = new Date().toISOString();
    saveStoredTemplates(templates);
  }
}
