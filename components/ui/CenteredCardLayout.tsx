'use client';

import React, { ReactNode } from 'react';
import { Card } from './Card';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing } from '@/lib/design-system';

interface CenteredCardLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  hasFixedFooter?: boolean;
  maxWidth?: '400px' | '420px' | '500px';
}

/**
 * 중앙 정렬 카드 레이아웃 컴포넌트
 * 인증 페이지, 폼 페이지 등에 사용되는 공용 레이아웃
 */
export function CenteredCardLayout({
  children,
  header,
  footer,
  hasFixedFooter = false,
  maxWidth = '420px',
}: CenteredCardLayoutProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: isDark ? colors.dark.background : colors.light.background,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
    paddingBottom: hasFixedFooter ? '120px' : spacing[4],
  };

  const contentWrapperStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: maxWidth,
  };

  const fixedFooterStyle: React.CSSProperties = {
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

  const fixedFooterContentStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: maxWidth,
  };

  return (
    <div style={containerStyle}>
      <div style={contentWrapperStyle}>
        <Card>
          {header}
          {children}
        </Card>
      </div>

      {footer && hasFixedFooter && (
        <div style={fixedFooterStyle}>
          <div style={fixedFooterContentStyle}>
            {footer}
          </div>
        </div>
      )}

      {footer && !hasFixedFooter && footer}
    </div>
  );
}
