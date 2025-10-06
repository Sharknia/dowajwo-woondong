'use client';

import React, { useState } from 'react';
import { Button, Input, Select, Textarea, Form, RadioGroup } from '@/components/ui';
import { spacing } from '@/lib/design-system';
import { ExerciseCategory, EquipmentType, WeightUnit } from '@/types/exercise-template';

interface ExerciseTemplateFormData {
  name: string;
  category: ExerciseCategory;
  equipmentType: EquipmentType;
  defaultWeightUnit: WeightUnit;
  notes: string;
}

interface ExerciseTemplateFormProps {
  initialData?: ExerciseTemplateFormData;
  onSubmit: (data: ExerciseTemplateFormData) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => Promise<void>;
  submitLabel?: string;
  isSubmitting?: boolean;
  renderFooter?: (props: { onCancel: () => void; onSubmit: () => void; isSubmitting: boolean; submitLabel: string }) => React.ReactNode;
}

export function ExerciseTemplateForm({
  initialData = {
    name: '',
    category: ExerciseCategory.CHEST,
    equipmentType: EquipmentType.MACHINE,
    defaultWeightUnit: WeightUnit.KG,
    notes: '',
  },
  onSubmit,
  onCancel,
  onDelete,
  submitLabel = '저장',
  isSubmitting = false,
  renderFooter,
}: ExerciseTemplateFormProps) {
  const [formData, setFormData] = useState<ExerciseTemplateFormData>(initialData);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = '운동명을 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
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
    <>
      <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} gap="md">
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
          disabled={isSubmitting}
          fullWidth
        />

        <Select
          label="부위 *"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as ExerciseCategory })}
          options={categoryOptions}
          disabled={isSubmitting}
          fullWidth
        />

        <Select
          label="기구 *"
          value={formData.equipmentType}
          onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value as EquipmentType })}
          options={equipmentOptions}
          disabled={isSubmitting}
          fullWidth
        />

        <RadioGroup
          label="무게 단위 *"
          name="weightUnit"
          value={formData.defaultWeightUnit}
          onChange={(value) => setFormData({ ...formData, defaultWeightUnit: value as WeightUnit })}
          options={weightUnitOptions}
          orientation="horizontal"
          disabled={isSubmitting}
        />

        <Textarea
          label="메모"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="운동 설명이나 팁을 입력하세요"
          disabled={isSubmitting}
          resize="vertical"
          fullWidth
        />

        {onDelete && (
          <Button
            variant="outline"
            onClick={onDelete}
            fullWidth
          >
            삭제하기
          </Button>
        )}
      </Form>

      {renderFooter && renderFooter({ onCancel, onSubmit: handleSubmit, isSubmitting, submitLabel })}
    </>
  );
}

export function ExerciseTemplateFormFooter({
  onCancel,
  onSubmit,
  isSubmitting,
  submitLabel,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitLabel: string;
}) {
  return (
    <div style={{ display: 'flex', gap: spacing[2] }}>
      <Button variant="outline" onClick={onCancel} fullWidth>
        취소
      </Button>
      <Button
        variant="primary"
        onClick={onSubmit}
        isLoading={isSubmitting}
        disabled={isSubmitting}
        fullWidth
      >
        {submitLabel}
      </Button>
    </div>
  );
}
