'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography } from '@/lib/design-system';

function WorkoutPageContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeNavItem, setActiveNavItem] = useState('workout');

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: isDark ? colors.dark.background : colors.light.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing[6],
    paddingBottom: '100px',
    paddingLeft: spacing[4],
    paddingRight: spacing[4],
  };

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    maxWidth: '420px',
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '64px',
    marginBottom: spacing[4],
  };

  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    marginBottom: spacing[2],
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: typography.fontSize.base,
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    lineHeight: '1.6',
  };

  const handleNavClick = (itemId: string) => {
    console.log('네비게이션 아이템 클릭:', itemId);
    setActiveNavItem(itemId);
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={iconStyle}>💪</div>
        <h1 style={titleStyle}>운동</h1>
        <p style={descriptionStyle}>
          운동 기록과 분석을 제공합니다.
          <br />
          곧 멋진 기능들이 추가될 예정입니다!
        </p>
      </div>

      <NavigationBar
        activeItem={activeNavItem}
        onItemClick={handleNavClick}
      />
    </div>
  );
}

export default function WorkoutPage() {
  return (
    <ThemeProvider>
      <WorkoutPageContent />
    </ThemeProvider>
  );
}