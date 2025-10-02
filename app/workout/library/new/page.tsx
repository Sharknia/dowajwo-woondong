'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';
import { createExerciseTemplate } from '@/lib/api/exercise-template';
import { ExerciseCategory, EquipmentType, WeightUnit } from '@/types/exercise-template';

export default function NewExerciseTemplatePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    category: ExerciseCategory.CHEST,
    equipmentType: EquipmentType.MACHINE,
    defaultWeightUnit: WeightUnit.KG,
    notes: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('운동명을 입력해주세요.');
      return;
    }

    setIsSaving(true);
    try {
      await createExerciseTemplate({
        name: formData.name.trim(),
        category: formData.category,
        equipmentType: formData.equipmentType,
        defaultWeightUnit: formData.defaultWeightUnit,
        notes: formData.notes.trim() || undefined,
      });
      router.push('/workout/library');
    } catch (error) {
      console.error('Failed to save template:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: isDark ? colors.dark.background : colors.light.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '120px',
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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary,
    border: 'none',
    borderRadius: '8px',
    padding: `${spacing[3]} ${spacing[3]}`,
    fontSize: typography.fontSize.base,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
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

  return (
    <div style={containerStyle}>
      <PageHeader title="운동 추가" layout="centered" sticky />

      <main style={contentStyle}>
        <Card variant="default" padding="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
            <div>
              <label style={{
                fontSize: typography.fontSize.sm,
                color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
                marginBottom: spacing[2],
                display: 'block',
              }}>
                운동명 *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="예: 체스트프레스"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{
                fontSize: typography.fontSize.sm,
                color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
                marginBottom: spacing[2],
                display: 'block',
              }}>
                부위 *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ExerciseCategory })}
                style={inputStyle}
              >
                {Object.entries(ExerciseCategory).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                fontSize: typography.fontSize.sm,
                color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
                marginBottom: spacing[2],
                display: 'block',
              }}>
                기구 *
              </label>
              <select
                value={formData.equipmentType}
                onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value as EquipmentType })}
                style={inputStyle}
              >
                {Object.entries(EquipmentType).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                fontSize: typography.fontSize.sm,
                color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
                marginBottom: spacing[2],
                display: 'block',
              }}>
                무게 단위 *
              </label>
              <div style={{ display: 'flex', gap: spacing[3] }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  cursor: 'pointer',
                  fontSize: typography.fontSize.base,
                  color: isDark ? colors.text.dark.primary : colors.text.light.primary,
                }}>
                  <input
                    type="radio"
                    value={WeightUnit.KG}
                    checked={formData.defaultWeightUnit === WeightUnit.KG}
                    onChange={() => setFormData({ ...formData, defaultWeightUnit: WeightUnit.KG })}
                  />
                  kg
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  cursor: 'pointer',
                  fontSize: typography.fontSize.base,
                  color: isDark ? colors.text.dark.primary : colors.text.light.primary,
                }}>
                  <input
                    type="radio"
                    value={WeightUnit.LBS}
                    checked={formData.defaultWeightUnit === WeightUnit.LBS}
                    onChange={() => setFormData({ ...formData, defaultWeightUnit: WeightUnit.LBS })}
                  />
                  lbs
                </label>
              </div>
            </div>

            <div>
              <label style={{
                fontSize: typography.fontSize.sm,
                color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
                marginBottom: spacing[2],
                display: 'block',
              }}>
                메모
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="운동 설명이나 팁을 입력하세요"
                style={{
                  ...inputStyle,
                  minHeight: '100px',
                  resize: 'vertical' as const,
                }}
              />
            </div>
          </div>
        </Card>
      </main>

      <div style={bottomBarStyle}>
        <div style={bottomBarContentStyle}>
          <Button variant="outline" onClick={handleCancel} fullWidth>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            isLoading={isSaving}
            disabled={isSaving}
            fullWidth
          >
            추가하기
          </Button>
        </div>
      </div>
    </div>
  );
}
