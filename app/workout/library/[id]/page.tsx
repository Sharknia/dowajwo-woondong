'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';
import { getExerciseTemplate, updateExerciseTemplate, deleteExerciseTemplate } from '@/lib/api/exercise-template';
import type { ExerciseTemplate } from '@/types/exercise-template';
import { ExerciseCategory, EquipmentType, WeightUnit } from '@/types/exercise-template';

export default function ExerciseTemplateDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [template, setTemplate] = useState<ExerciseTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: ExerciseCategory.CHEST,
    equipmentType: EquipmentType.MACHINE,
    defaultWeightUnit: WeightUnit.KG,
    notes: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadTemplate();
  }, [params.id]);

  const loadTemplate = async () => {
    const data = await getExerciseTemplate(params.id as string);
    if (data) {
      setTemplate(data);
      setFormData({
        name: data.name,
        category: data.category,
        equipmentType: data.equipmentType,
        defaultWeightUnit: data.defaultWeightUnit,
        notes: data.notes || '',
      });
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('운동명을 입력해주세요.');
      return;
    }

    setIsSaving(true);
    try {
      await updateExerciseTemplate(params.id as string, {
        ...formData,
        notes: formData.notes.trim() || undefined,
      });
      await loadTemplate();
      setIsEditing(false);
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
    setIsEditing(false);
  };

  if (!template) return <div>로딩 중...</div>;

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: isDark ? colors.dark.background : colors.light.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '120px',
  };

  const headerContainerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
    maxWidth: '420px',
    padding: `0 ${spacing[4]} ${spacing[4]} ${spacing[4]}`,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    textAlign: 'center',
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
      <div style={headerContainerStyle}>
        <h1 style={titleStyle}>{isEditing ? '운동 편집' : template.name}</h1>
      </div>

      <main style={contentStyle}>
        {isEditing ? (
          <Card variant="default" padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
              <div>
                <label style={{
                  fontSize: typography.fontSize.sm,
                  color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
                  marginBottom: spacing[2],
                  display: 'block'
                }}>
                  운동명
                </label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{
                  fontSize: typography.fontSize.sm,
                  color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
                  marginBottom: spacing[2],
                  display: 'block'
                }}>
                  부위
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ExerciseCategory })}
                  style={inputStyle}
                >
                  {Object.entries(ExerciseCategory).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={{
                  fontSize: typography.fontSize.sm,
                  color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
                  marginBottom: spacing[2],
                  display: 'block'
                }}>
                  기구
                </label>
                <select
                  value={formData.equipmentType}
                  onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value as EquipmentType })}
                  style={inputStyle}
                >
                  {Object.entries(EquipmentType).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={{
                  fontSize: typography.fontSize.sm,
                  color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
                  marginBottom: spacing[2],
                  display: 'block'
                }}>
                  메모
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' as const }}
                />
              </div>
            </div>
          </Card>
        ) : (
          <>
            <Card variant="default" padding="lg">
              <h3 style={{
                marginBottom: spacing[2],
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
                color: isDark ? colors.text.dark.primary : colors.text.light.primary,
              }}>
                운동 정보
              </h3>
              <p style={{
                fontSize: typography.fontSize.sm,
                color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
                marginBottom: spacing[1],
              }}>
                부위: {template.category}
              </p>
              <p style={{
                fontSize: typography.fontSize.sm,
                color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
                marginBottom: spacing[1],
              }}>
                기구: {template.equipmentType}
              </p>
              <p style={{
                fontSize: typography.fontSize.sm,
                color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
              }}>
                단위: {template.defaultWeightUnit}
              </p>
            </Card>
            {template.notes && (
              <Card variant="default" padding="lg">
                <h3 style={{
                  marginBottom: spacing[2],
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.semibold,
                  color: isDark ? colors.text.dark.primary : colors.text.light.primary,
                }}>
                  메모
                </h3>
                <p style={{
                  fontSize: typography.fontSize.sm,
                  color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
                }}>
                  {template.notes}
                </p>
              </Card>
            )}
          </>
        )}
      </main>

      <div style={bottomBarStyle}>
        <div style={bottomBarContentStyle}>
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel} fullWidth>취소</Button>
              <Button variant="primary" onClick={handleSave} isLoading={isSaving} disabled={isSaving} fullWidth>저장</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleDelete} fullWidth>삭제</Button>
              <Button variant="primary" onClick={() => router.push(`/workout/edit?templateId=${template.id}`)} fullWidth>이 운동으로 세션 시작</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
