'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CenteredCardLayout, PageHeader } from '@/components/ui';
import { ExerciseTemplateForm, ExerciseTemplateFormFooter } from '@/components/workout/ExerciseTemplateForm';
import { getExerciseTemplate, updateExerciseTemplate, deleteExerciseTemplate } from '@/lib/api/exercise-template';
import type { ExerciseTemplate } from '@/types/exercise-template';

export default function ExerciseTemplateDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [template, setTemplate] = useState<ExerciseTemplate | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadTemplate();
  }, [params.id]);

  const loadTemplate = async () => {
    const data = await getExerciseTemplate(params.id as string);
    if (data) {
      setTemplate(data);
    }
  };

  const handleSubmit = async (formData: any) => {
    setIsSaving(true);
    try {
      await updateExerciseTemplate(params.id as string, {
        name: formData.name.trim(),
        category: formData.category,
        equipmentType: formData.equipmentType,
        defaultWeightUnit: formData.defaultWeightUnit,
        notes: formData.notes.trim() || undefined,
      });
      router.push('/workout/library');
    } catch (error) {
      alert('저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('이 운동을 삭제하시겠습니까?')) return;

    try {
      await deleteExerciseTemplate(params.id as string);
      router.push('/workout/library');
    } catch (error) {
      alert('삭제에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!template) return <div>로딩 중...</div>;

  return (
    <CenteredCardLayout
      maxWidth="420px"
      header={<PageHeader title="운동 편집" layout="centered" />}
      footer={
        <ExerciseTemplateFormFooter
          onCancel={handleCancel}
          onSubmit={async () => {}}
          isSubmitting={isSaving}
          submitLabel="저장"
        />
      }
      hasFixedFooter={true}
    >
      <ExerciseTemplateForm
        initialData={{
          name: template.name,
          category: template.category,
          equipmentType: template.equipmentType,
          defaultWeightUnit: template.defaultWeightUnit,
          notes: template.notes || '',
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onDelete={handleDelete}
        submitLabel="저장"
        isSubmitting={isSaving}
        renderFooter={() => null}
      />
    </CenteredCardLayout>
  );
}
