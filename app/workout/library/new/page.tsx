'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, CenteredCardLayout, PageHeader, Input, Select, Textarea, Form, RadioGroup } from '@/components/ui';
import { spacing } from '@/lib/design-system';
import { createExerciseTemplate } from '@/lib/api/exercise-template';
import { ExerciseCategory, EquipmentType, WeightUnit } from '@/types/exercise-template';

export default function NewExerciseTemplatePage() {
  const router = useRouter();

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

  const footerButtonsStyle: React.CSSProperties = {
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

  const weightUnitOptions = [
    { value: WeightUnit.KG, label: 'kg' },
    { value: WeightUnit.LBS, label: 'lbs' },
  ];

  return (
    <CenteredCardLayout
      maxWidth="420px"
      header={<PageHeader title="운동 추가" layout="centered" />}
      footer={
        <div style={footerButtonsStyle}>
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
      }
      hasFixedFooter={true}
    >
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

        <RadioGroup
          label="무게 단위 *"
          name="weightUnit"
          value={formData.defaultWeightUnit}
          onChange={(value) => setFormData({ ...formData, defaultWeightUnit: value as WeightUnit })}
          options={weightUnitOptions}
          orientation="horizontal"
          disabled={isSaving}
        />

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
    </CenteredCardLayout>
  );
}
