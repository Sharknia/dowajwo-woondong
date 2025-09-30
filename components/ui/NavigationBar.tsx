'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography, shadows } from '@/lib/design-system';

type NavigationItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

interface NavigationBarProps {
  items?: NavigationItem[];
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

const defaultItems: NavigationItem[] = [
  { id: 'home', label: '홈', icon: 'home', href: '/' },
  { id: 'calendar', label: '캘린더', icon: 'calendar', href: '/calendar' },
  { id: 'workout', label: '운동', icon: 'dumbbell', href: '/workout' },
  { id: 'profile', label: '프로필', icon: 'user', href: '/profile' },
];

/**
 * 네비게이션 바 컴포넌트
 * 하단에 고정되는 애플워치 스타일 네비게이션
 */
export function NavigationBar({
  items = defaultItems,
  activeItem = 'home',
  onItemClick,
}: NavigationBarProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: `${spacing[3]} ${spacing[4]}`,
    background: isDark ? colors.dark.surface : colors.light.surface,
    borderTop: `1px solid ${isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary}`,
    boxShadow: isDark ? shadows.dark.xl : shadows.light.xl,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  const itemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing[1],
    cursor: 'pointer',
    padding: spacing[2],
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    background: isActive
      ? isDark
        ? 'rgba(50, 215, 75, 0.1)'
        : 'rgba(50, 215, 75, 0.05)'
      : 'transparent',
    minWidth: '64px',
  });

  // SVG 아이콘 렌더링 함수
  const renderIcon = (iconName: string, isActive: boolean) => {
    const iconColor = isActive
      ? colors.primary.neonGreen
      : isDark
        ? colors.text.dark.secondary
        : colors.text.light.secondary;

    const iconStyle: React.CSSProperties = {
      width: '24px',
      height: '24px',
      transition: 'all 0.3s ease',
      filter: isActive ? 'drop-shadow(0 0 8px rgba(50, 215, 75, 0.5))' : 'none',
    };

    switch (iconName) {
      case 'home':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'dumbbell':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.4 14.4L9.6 9.6" />
            <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
            <path d="M21.5 21.5l-1.4-1.4" />
            <path d="M3.9 3.9l1.4 1.4" />
            <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
      case 'user':
        return (
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      default:
        return null;
    }
  };

  const labelStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: typography.fontSize.xs,
    fontWeight: isActive ? typography.fontWeight.semibold : typography.fontWeight.regular,
    color: isActive
      ? colors.primary.neonGreen
      : isDark
        ? colors.text.dark.secondary
        : colors.text.light.secondary,
    transition: 'all 0.3s ease',
  });

  const handleItemClick = (item: NavigationItem) => {
    onItemClick?.(item.id);
  };

  return (
    <nav style={navStyle}>
      {items.map((item) => {
        const isActive = item.id === activeItem;
        return (
          <Link
            key={item.id}
            href={item.href}
            style={{
              ...itemStyle(isActive),
              textDecoration: 'none',
            }}
            onClick={() => handleItemClick(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleItemClick(item);
              }
            }}
          >
            {renderIcon(item.icon, isActive)}
            <span style={labelStyle(isActive)}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}