'use client';

import React from 'react';
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
    gridTemplateColumns: '32px 1fr 1fr 48px 32px',
    gap: spacing[2],
    alignItems: 'center',
    padding: spacing[2],
    borderRadius: '8px',
    background: isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary,
    marginBottom: spacing[2],
  };

  const setNumberStyle: React.CSSProperties = {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.semibold,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    textAlign: 'center',
  };

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[1],
  };

  const inputStyle: React.CSSProperties & {
    WebkitAppearance?: string;
    MozAppearance?: string;
  } = {
    flex: 1,
    background: isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary,
    border: 'none',
    borderRadius: '6px',
    padding: `${spacing[2]} ${spacing[2]}`,
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.medium,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    textAlign: 'center',
    outline: 'none',
    width: '100%',
    // 숫자 input 스피너 제거
    MozAppearance: 'textfield',
    WebkitAppearance: 'none',
  };

  const unitStyle: React.CSSProperties = {
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
    color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
  };

  const completeButtonStyle: React.CSSProperties = {
    width: '48px',
    height: '32px',
    borderRadius: '16px',
    border: set.completed
      ? `2px solid ${colors.primary.neonGreen}`
      : `2px solid ${isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary}`,
    background: set.completed ? colors.primary.neonGreen : 'transparent',
    color: set.completed ? colors.dark.background : (isDark ? colors.text.dark.tertiary : colors.text.light.tertiary),
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.bold,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const deleteButtonStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    background: 'transparent',
    border: 'none',
    color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: typography.fontSize.h3,
    transition: 'all 0.2s ease',
  };

  return (
    <div style={rowStyle} role="listitem" aria-label={`${setNumber}번 세트`}>
      {/* 세트 번호 */}
      <span style={setNumberStyle}>{setNumber}</span>

      {/* 무게 입력 */}
      <div style={inputGroupStyle}>
        <input
          type="number"
          value={set.weight}
          onChange={(e) => onUpdate({ weight: Number(e.target.value) || 0 })}
          aria-label={`${setNumber}번 세트 무게`}
          min="0"
          step="0.5"
          style={inputStyle}
          className="no-spinner"
        />
        <span style={unitStyle}>kg</span>
      </div>

      {/* 횟수 입력 */}
      <div style={inputGroupStyle}>
        <input
          type="number"
          value={set.reps}
          onChange={(e) => onUpdate({ reps: Number(e.target.value) || 0 })}
          aria-label={`${setNumber}번 세트 횟수`}
          min="0"
          step="1"
          style={inputStyle}
          className="no-spinner"
        />
        <span style={unitStyle}>회</span>
      </div>
      <style jsx>{`
        input.no-spinner::-webkit-outer-spin-button,
        input.no-spinner::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input.no-spinner[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* 완료 버튼 */}
      <button
        onClick={() => onUpdate({ completed: !set.completed })}
        aria-label={`${setNumber}번 세트 완료`}
        aria-pressed={set.completed}
        style={completeButtonStyle}
        onMouseEnter={(e) => {
          if (!set.completed) {
            e.currentTarget.style.background = isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary;
          }
        }}
        onMouseLeave={(e) => {
          if (!set.completed) {
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        ✓
      </button>

      {/* 삭제 버튼 */}
      <button
        onClick={onDelete}
        aria-label={`${setNumber}번 세트 삭제`}
        style={deleteButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = colors.secondary.red;
          e.currentTarget.style.background = isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = isDark ? colors.text.dark.tertiary : colors.text.light.tertiary;
          e.currentTarget.style.background = 'transparent';
        }}
      >
        ×
      </button>
    </div>
  );
}
