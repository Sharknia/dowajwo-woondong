'use client';

import React from 'react';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';

export interface SetFormData {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
}

interface SetInputProps {
  setNumber: number;
  set: SetFormData;
  onUpdate: (updates: Partial<SetFormData>) => void;
  onDelete: () => void;
}

/**
 * 세트 입력 컴포넌트
 * 단일 세트의 무게, 횟수, 완료 상태를 입력받습니다.
 */
export function SetInput({ setNumber, set, onUpdate, onDelete }: SetInputProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '32px 1fr 1fr 40px 40px',
    gap: spacing[1],
    alignItems: 'center',
    padding: spacing[2],
    borderRadius: '8px',
    background: isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary,
    marginBottom: spacing[2],
  };

  const setNumberStyle: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    textAlign: 'center',
  };

  const unitStyle: React.CSSProperties = {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
  };

  const deleteButtonStyle: React.CSSProperties = {
    padding: spacing[1],
    minWidth: '36px',
    minHeight: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const inputWrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={rowStyle} role="listitem" aria-label={`${setNumber}번 세트`}>
      {/* 세트 번호 */}
      <span style={setNumberStyle}>{setNumber}</span>

      {/* 무게 입력 */}
      <div style={inputWrapperStyle}>
        <Input
          type="number"
          value={set.weight.toString()}
          onChange={(e) => onUpdate({ weight: Number(e.target.value) || 0 })}
          rightIcon={<span style={unitStyle}>kg</span>}
          aria-label={`${setNumber}번 세트 무게`}
          min="0"
          step="0.5"
          size="sm"
          fullWidth={true}
        />
      </div>

      {/* 횟수 입력 */}
      <div style={inputWrapperStyle}>
        <Input
          type="number"
          value={set.reps.toString()}
          onChange={(e) => onUpdate({ reps: Number(e.target.value) || 0 })}
          rightIcon={<span style={unitStyle}>회</span>}
          aria-label={`${setNumber}번 세트 횟수`}
          min="0"
          step="1"
          size="sm"
          fullWidth={true}
        />
      </div>

      {/* 완료 체크 */}
      <Checkbox
        checked={set.completed}
        onChange={(checked) => onUpdate({ completed: checked })}
        aria-label={`${setNumber}번 세트 완료`}
      />

      {/* 삭제 버튼 */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        aria-label={`${setNumber}번 세트 삭제`}
        style={deleteButtonStyle}
      >
        🗑️
      </Button>
    </div>
  );
}
