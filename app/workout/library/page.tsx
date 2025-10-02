'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { ExerciseTemplateCard } from '@/components/workout/ExerciseTemplateCard';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';
import { getAllExerciseTemplates, deleteExerciseTemplate } from '@/lib/api/exercise-template';
import type { ExerciseTemplate } from '@/types/exercise-template';
import { ExerciseCategory, SortOption } from '@/types/exercise-template';

/**
 * 운동 템플릿 목록 페이지
 * 등록된 운동 템플릿을 조회하고 관리
 */
export default function WorkoutLibraryPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [templates, setTemplates] = useState<ExerciseTemplate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.RECENT);
  const [isLoading, setIsLoading] = useState(true);

  // 템플릿 로드
  useEffect(() => {
    loadTemplates();
  }, [selectedCategory, sortOption]);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      const data = await getAllExerciseTemplates({
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        sort: sortOption,
      });
      setTemplates(data);
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 운동을 삭제하시겠습니까?')) return;

    try {
      await deleteExerciseTemplate(id);
      await loadTemplates();
    } catch (error) {
      console.error('Failed to delete template:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: isDark ? colors.dark.background : colors.light.background,
    paddingBottom: '100px',
  };

  const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: isDark ? colors.dark.background : colors.light.background,
    padding: spacing[4],
    borderBottom: `1px solid ${isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary}`,
  };

  const headerContentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '420px',
    margin: '0 auto',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
  };

  const addButtonStyle: React.CSSProperties = {
    minWidth: '44px',
    minHeight: '44px',
    fontSize: typography.fontSize.xl,
  };

  const filtersStyle: React.CSSProperties = {
    display: 'flex',
    gap: spacing[2],
    padding: `${spacing[3]} ${spacing[4]}`,
    maxWidth: '420px',
    margin: '0 auto',
  };

  const selectStyle: React.CSSProperties = {
    flex: 1,
    background: isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary,
    border: 'none',
    borderRadius: '8px',
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    cursor: 'pointer',
  };

  const contentStyle: React.CSSProperties = {
    padding: `0 ${spacing[4]}`,
    maxWidth: '420px',
    margin: '0 auto',
  };

  const templatesListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  };

  const emptyStateStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: `${spacing[8]} ${spacing[4]}`,
  };

  const emptyIconStyle: React.CSSProperties = {
    fontSize: '64px',
    marginBottom: spacing[4],
  };

  const emptyTitleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    marginBottom: spacing[2],
  };

  const emptyDescStyle: React.CSSProperties = {
    fontSize: typography.fontSize.base,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    marginBottom: spacing[4],
  };

  return (
    <div style={containerStyle}>
      {/* 헤더 */}
      <header style={headerStyle}>
        <div style={headerContentStyle}>
          <h1 style={titleStyle}>내 운동</h1>
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push('/workout/library/new')}
            style={addButtonStyle}
            aria-label="운동 추가"
          >
            +
          </Button>
        </div>
      </header>

      {/* 필터/정렬 */}
      <div style={filtersStyle}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as ExerciseCategory | 'all')}
          style={selectStyle}
          aria-label="카테고리 필터"
        >
          <option value="all">전체</option>
          {Object.entries(ExerciseCategory).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          style={selectStyle}
          aria-label="정렬"
        >
          <option value={SortOption.RECENT}>최근 사용순</option>
          <option value={SortOption.NAME}>이름순</option>
          <option value={SortOption.CATEGORY}>부위별</option>
        </select>
      </div>

      {/* 템플릿 목록 */}
      <main style={contentStyle}>
        {isLoading ? (
          <p style={{ textAlign: 'center', padding: spacing[4] }}>로딩 중...</p>
        ) : templates.length === 0 ? (
          <Card variant="elevated" padding="xl">
            <div style={emptyStateStyle}>
              <div style={emptyIconStyle}>💪</div>
              <h2 style={emptyTitleStyle}>등록된 운동이 없습니다</h2>
              <p style={emptyDescStyle}>
                자주 하는 운동을 등록하고<br />
                빠르게 기록하세요
              </p>
              <Button
                variant="primary"
                onClick={() => router.push('/workout/library/new')}
              >
                첫 운동 추가하기
              </Button>
            </div>
          </Card>
        ) : (
          <div style={templatesListStyle}>
            {templates.map((template) => (
              <ExerciseTemplateCard
                key={template.id}
                template={template}
                onClick={() => router.push(`/workout/library/${template.id}`)}
                onEdit={(id) => router.push(`/workout/library/${id}`)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <NavigationBar activeItem="workout" />
    </div>
  );
}
