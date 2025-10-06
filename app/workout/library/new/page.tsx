'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, PageHeader, Input, Select, Textarea, Form, FormGroup } from '@/components/ui';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing } from '@/lib/design-system';
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
  const [errors, setErrors] = useState<{ name?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = '운동명을 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
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

  const categoryOptions = Object.entries(ExerciseCategory).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const equipmentOptions = Object.entries(EquipmentType).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  return (
    <div style={containerStyle}>
      <PageHeader title="운동 추가" layout="centered" sticky />

      <main style={contentStyle}>
        <Card variant="default" padding="lg">
          <Form onSubmit={handleSave} gap="md">
            <Input
              label="운동명 *"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              error={errors.name}
              placeholder="예: 체스트프레스"
              disabled={isSaving}
              fullWidth
            />

            <Select
              label="부위 *"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ExerciseCategory })}
              options={categoryOptions}
              disabled={isSaving}
              fullWidth
            />

            <Select
              label="기구 *"
              value={formData.equipmentType}
              onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value as EquipmentType })}
              options={equipmentOptions}
              disabled={isSaving}
              fullWidth
            />

            <FormGroup gap="sm">
              <label style={{
                fontSize: '14px',
                fontWeight: 500,
                color: isDark ? colors.text.dark.primary : colors.text.light.primary,
              }}>
                무게 단위 *
              </label>
              <div style={{ display: 'flex', gap: spacing[3] }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: isDark ? colors.text.dark.primary : colors.text.light.primary,
                }}>
                  <input
                    type="radio"
                    value={WeightUnit.KG}
                    checked={formData.defaultWeightUnit === WeightUnit.KG}
                    onChange={() => setFormData({ ...formData, defaultWeightUnit: WeightUnit.KG })}
                    disabled={isSaving}
                  />
                  kg
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: isDark ? colors.text.dark.primary : colors.text.light.primary,
                }}>
                  <input
                    type="radio"
                    value={WeightUnit.LBS}
                    checked={formData.defaultWeightUnit === WeightUnit.LBS}
                    onChange={() => setFormData({ ...formData, defaultWeightUnit: WeightUnit.LBS })}
                    disabled={isSaving}
                  />
                  lbs
                </label>
              </div>
            </FormGroup>

            <Textarea
              label="메모"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="운동 설명이나 팁을 입력하세요"
              disabled={isSaving}
              resize="vertical"
              fullWidth
            />
          </Form>
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
