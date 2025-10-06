'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CenteredCardLayout } from '@/components/ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ExerciseTemplateForm, ExerciseTemplateFormFooter } from '@/components/workout/ExerciseTemplateForm';
import { createExerciseTemplate } from '@/lib/api/exercise-template';

export default function NewExerciseTemplatePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (formData: any) => {
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

  return (
    <CenteredCardLayout
      maxWidth="420px"
      header={<PageHeader title="운동 추가" layout="centered" />}
      footer={
        <ExerciseTemplateFormFooter
          onCancel={handleCancel}
          onSubmit={async () => {}}
          isSubmitting={isSaving}
          submitLabel="추가하기"
        />
      }
      hasFixedFooter={true}
    >
      <ExerciseTemplateForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="추가하기"
        isSubmitting={isSaving}
        renderFooter={() => null}
      />
    </CenteredCardLayout>
  );
}
