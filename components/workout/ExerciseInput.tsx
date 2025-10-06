'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SetInput, SetFormData } from './SetInput';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';

// 운동 종목 목록
const EXERCISE_OPTIONS = [
  '벤치프레스',
  '인클라인 벤치프레스',
  '디클라인 벤치프레스',
  '스쿼트',
  '레그 프레스',
  '데드리프트',
  '풀업',
  '랫 풀다운',
  '바벨 로우',
  '덤벨 로우',
  '숄더 프레스',
  '레터럴 레이즈',
  '바이셉 컬',
  '트라이셉 익스텐션',
  '레그 컬',
  '레그 익스텐션',
];

export interface ExerciseFormData {
  id: string;
  name: string;
  sets: SetFormData[];
  isEditing: boolean;
}

interface ExerciseInputProps {
  exercise: ExerciseFormData;
  onUpdate: (id: string, updates: Partial<ExerciseFormData>) => void;
  onDelete: (id: string) => void;
}

/**
 * 운동 종목 입력 컴포넌트
 * 운동명과 여러 세트를 관리합니다.
 */
export function ExerciseInput({ exercise, onUpdate, onDelete }: ExerciseInputProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMenuOpen]);

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
    paddingBottom: spacing[2],
    borderBottom: `1px solid ${isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary}`,
  };

  const exerciseNameStyle: React.CSSProperties = {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semibold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    background: isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary,
    border: `2px solid ${colors.primary.neonGreen}`,
    borderRadius: '8px',
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.medium,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    outline: 'none',
    cursor: 'pointer',
  };

  const editButtonStyle: React.CSSProperties = {
    padding: spacing[1],
    minWidth: '36px',
    minHeight: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    background: isMenuHovered ? (isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary) : 'transparent',
    transition: 'background 0.2s ease',
  };

  const menuButtonStyle: React.CSSProperties = {
    position: 'relative',
  };

  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '48px',
    right: 0,
    background: isDark ? colors.dark.surface : colors.light.surface,
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    minWidth: '120px',
    padding: spacing[1],
    display: isMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '2px',
    zIndex: 10,
  };

  const menuItemStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: `${spacing[2]} ${spacing[3]}`,
    textAlign: 'left',
    borderRadius: '6px',
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.medium,
    transition: 'background 0.2s ease',
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
  };

  const menuItemDeleteStyle: React.CSSProperties = {
    ...menuItemStyle,
    color: colors.secondary.red,
  };

  const setListStyle: React.CSSProperties = {
    marginBottom: spacing[2],
  };

  const handleNameChange = (name: string) => {
    onUpdate(exercise.id, { name });
  };

  const handleSetUpdate = (setId: string, updates: Partial<SetFormData>) => {
    const updatedSets = exercise.sets.map(s =>
      s.id === setId ? { ...s, ...updates } : s
    );
    onUpdate(exercise.id, { sets: updatedSets });
  };

  const handleSetDelete = (setId: string) => {
    const updatedSets = exercise.sets.filter(s => s.id !== setId);
    onUpdate(exercise.id, { sets: updatedSets });
  };

  const handleAddSet = () => {
    const newSet: SetFormData = {
      id: `set-${Date.now()}-${Math.random()}`,
      weight: exercise.sets.length > 0 ? exercise.sets[exercise.sets.length - 1].weight : 0,
      reps: exercise.sets.length > 0 ? exercise.sets[exercise.sets.length - 1].reps : 0,
      completed: false,
    };
    onUpdate(exercise.id, { sets: [...exercise.sets, newSet] });
  };

  const toggleEditMode = () => {
    onUpdate(exercise.id, { isEditing: !exercise.isEditing });
  };

  return (
    <Card variant="default" padding="lg">
      <div>
        {/* 운동 헤더 */}
        <div style={headerStyle}>
          {exercise.isEditing ? (
            <select
              value={exercise.name}
              onChange={(e) => {
                handleNameChange(e.target.value);
                if (e.target.value) {
                  onUpdate(exercise.id, { isEditing: false });
                }
              }}
              aria-label="운동 선택"
              style={selectStyle}
              autoFocus
            >
              <option value="">운동 선택</option>
              {EXERCISE_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <h3 style={exerciseNameStyle} id={`exercise-${exercise.id}`}>
              {exercise.name || '운동 이름 없음'}
            </h3>
          )}

          {exercise.name && (
            <div style={menuButtonStyle} ref={menuRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                onMouseEnter={() => setIsMenuHovered(true)}
                onMouseLeave={() => setIsMenuHovered(false)}
                aria-label="운동 메뉴"
                aria-expanded={isMenuOpen}
              >
                ⋯
              </Button>
              <div style={menuStyle} role="menu">
                <button
                  style={menuItemStyle}
                  onClick={() => {
                    setIsMenuOpen(false);
                    toggleEditMode();
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                  }}
                  role="menuitem"
                >
                  수정하기
                </button>
                <button
                  style={menuItemDeleteStyle}
                  onClick={() => {
                    setIsMenuOpen(false);
                    onDelete(exercise.id);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                  }}
                  role="menuitem"
                >
                  삭제하기
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 세트 목록 */}
        <div style={setListStyle} role="list" aria-label="세트 목록">
          {exercise.sets.map((set, index) => (
            <SetInput
              key={set.id}
              setNumber={index + 1}
              set={set}
              onUpdate={(updates) => handleSetUpdate(set.id, updates)}
              onDelete={() => handleSetDelete(set.id)}
            />
          ))}
        </div>

        {/* 세트 추가 버튼 */}
        <Button
          variant="secondary"
          size="sm"
          onClick={handleAddSet}
          fullWidth
          aria-label="세트 추가"
        >
          + 세트 추가
        </Button>
      </div>
    </Card>
  );
}
