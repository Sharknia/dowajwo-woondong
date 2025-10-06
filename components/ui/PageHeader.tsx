'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, getTypographyStyle } from '@/lib/design-system';

interface PageHeaderAction {
  label: string;
  onClick: () => void;
  icon?: string;
}

interface PageHeaderProps {
  title: string;
  action?: PageHeaderAction;
  layout?: 'default' | 'centered';
  sticky?: boolean;
}

/**
 * 페이지 헤더 컴포넌트
 * 일관된 헤더 디자인을 위한 재사용 가능한 컴포넌트
 */
export function PageHeader({
  title,
  action,
  layout = 'default',
  sticky = false,
}: PageHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isActionHovered, setIsActionHovered] = useState(false);

  const containerStyle: React.CSSProperties = {
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? 0 : undefined,
    zIndex: sticky ? 100 : undefined,
    width: '100%',
    maxWidth: '420px',
    margin: '0 auto',
    padding: layout === 'centered'
      ? `0 ${spacing[4]} ${spacing[4]} ${spacing[4]}`
      : `${spacing[5]} ${spacing[4]}`,
    background: sticky ? (isDark ? colors.dark.background : colors.light.background) : 'transparent',
  };

  const headerStyle: React.CSSProperties = {
    display: layout === 'centered' ? 'block' : 'flex',
    justifyContent: layout === 'default' ? 'space-between' : undefined,
    alignItems: layout === 'default' ? 'center' : undefined,
    textAlign: layout === 'centered' ? 'center' : 'left',
  };

  const titleStyle: React.CSSProperties = {
    ...getTypographyStyle(layout === 'centered' ? 'h2' : 'h1'),
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    margin: 0,
  };

  const actionButtonStyle: React.CSSProperties = {
    ...getTypographyStyle('body'),
    minWidth: '44px',
    minHeight: '44px',
    background: isActionHovered
      ? (isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary)
      : 'transparent',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.primary.neonGreen,
    transition: 'background 0.2s ease',
    padding: action?.icon ? 0 : `${spacing[2]} ${spacing[3]}`,
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>{title}</h1>
        {action && layout === 'default' && (
          <button
            style={actionButtonStyle}
            onClick={action.onClick}
            onMouseEnter={() => setIsActionHovered(true)}
            onMouseLeave={() => setIsActionHovered(false)}
            aria-label={action.label}
          >
            {action.icon || action.label}
          </button>
        )}
      </div>
    </div>
  );
}
