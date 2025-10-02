'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';
import type { ExerciseTemplate } from '@/types/exercise-template';
import { CATEGORY_ICONS } from '@/types/exercise-template';

interface ExerciseTemplateCardProps {
  template: ExerciseTemplate;
  onClick?: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * 운동 템플릿 카드 컴포넌트
 * 운동 템플릿 정보를 표시하고 편집/삭제 기능 제공
 */
export function ExerciseTemplateCard({ template, onClick, onEdit, onDelete }: ExerciseTemplateCardProps) {
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

  const containerStyle: React.CSSProperties = {
    cursor: onClick ? 'pointer' : 'default',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
  };

  const titleContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[1],
  };

  const iconStyle: React.CSSProperties = {
    fontSize: typography.fontSize.xl,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
  };

  const metaStyle: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    marginBottom: template.notes ? spacing[2] : 0,
  };

  const notesStyle: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    wordBreak: 'break-word',
  };

  const menuButtonContainerStyle: React.CSSProperties = {
    position: 'relative',
  };

  const menuButtonStyle: React.CSSProperties = {
    background: isMenuHovered ? (isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary) : 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: spacing[2],
    minWidth: '44px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'background 0.2s ease',
  };

  const menuIconStyle: React.CSSProperties = {
    fontSize: typography.fontSize.xl,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    lineHeight: 1,
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
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    transition: 'background 0.2s ease',
  };

  const menuItemEditStyle: React.CSSProperties = {
    ...menuItemStyle,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
  };

  const menuItemDeleteStyle: React.CSSProperties = {
    ...menuItemStyle,
    color: colors.secondary.red,
  };

  const handleCardClick = () => {
    if (onClick && !isMenuOpen) {
      onClick();
    }
  };

  return (
    <Card variant="default" padding="lg" style={containerStyle} onClick={handleCardClick}>
      <div style={headerStyle}>
        <div style={contentStyle}>
          <div style={titleContainerStyle}>
            <span style={iconStyle}>{CATEGORY_ICONS[template.category]}</span>
            <h3 style={titleStyle}>{template.name}</h3>
          </div>
          <p style={metaStyle}>
            {template.category} • {template.equipmentType} • {template.defaultWeightUnit}
          </p>
          {template.notes && (
            <p style={notesStyle}>"{template.notes}"</p>
          )}
        </div>

        <div style={menuButtonContainerStyle} ref={menuRef}>
          <button
            style={menuButtonStyle}
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            onMouseEnter={() => setIsMenuHovered(true)}
            onMouseLeave={() => setIsMenuHovered(false)}
            aria-label="운동 템플릿 메뉴"
          >
            <span style={menuIconStyle}>⋯</span>
          </button>
          <div style={menuStyle}>
            <button
              style={menuItemEditStyle}
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(false);
                onEdit(template.id);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
              }}
            >
              수정하기
            </button>
            <button
              style={menuItemDeleteStyle}
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(false);
                onDelete(template.id);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
              }}
            >
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
