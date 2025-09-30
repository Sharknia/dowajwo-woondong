'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/design-system';

interface CalendarProps {
  selectedDate: Date;
  workoutDates: Date[]; // 운동한 날짜들
  onDateSelect: (date: Date) => void;
}

/**
 * 캘린더 컴포넌트
 * 선택된 날짜와 운동한 날짜를 구분하여 표시
 */
export function Calendar({ selectedDate, workoutDates, onDateSelect }: CalendarProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 현재 보고 있는 월
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [displayMonth, setDisplayMonth] = React.useState(new Date());

  // 스와이프 상태
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);

  // 애니메이션 상태
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [slideDirection, setSlideDirection] = React.useState<'next' | 'prev' | null>(null);

  // 최소 스와이프 거리 (픽셀)
  const minSwipeDistance = 50;

  // 월의 첫째 날과 마지막 날 (displayMonth 사용)
  const firstDayOfMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 0);

  // 캘린더에 표시할 날짜들 계산
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay()); // 일요일부터 시작

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay())); // 토요일까지

  const calendarDays: Date[] = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    calendarDays.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  // 날짜 비교 헬퍼
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const isWorkoutDay = (date: Date) => {
    return workoutDates.some(workoutDate => isSameDay(date, workoutDate));
  };

  const isSelectedDay = (date: Date) => {
    return isSameDay(date, selectedDate);
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };

  // 이전/다음 달로 이동
  const goToPreviousMonth = () => {
    if (isAnimating) return;
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
    setSlideDirection('prev');
    setIsAnimating(true);

    // 애니메이션 시작 직전에 새로운 달로 변경
    requestAnimationFrame(() => {
      setDisplayMonth(newMonth);
      setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection(null);
      }, 300);
    });
  };

  const goToNextMonth = () => {
    if (isAnimating) return;
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
    setSlideDirection('next');
    setIsAnimating(true);

    // 애니메이션 시작 직전에 새로운 달로 변경
    requestAnimationFrame(() => {
      setDisplayMonth(newMonth);
      setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection(null);
      }, 300);
    });
  };

  // 스와이프 핸들러
  const onTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || isAnimating) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    setTouchEnd(currentTouch);
    setDragOffset(diff);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || isAnimating) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    setIsDragging(false);
    setDragOffset(0);

    if (isLeftSwipe) {
      goToNextMonth();
    } else if (isRightSwipe) {
      goToPreviousMonth();
    }
  };

  // 스타일
  const containerStyle: React.CSSProperties = {
    width: '100%',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
    padding: spacing[3],
  };

  const monthYearStyle: React.CSSProperties = {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
  };

  const navButtonStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
    cursor: 'pointer',
    padding: spacing[2],
    fontSize: typography.fontSize.xl,
    transition: 'all 0.2s ease',
  };

  const weekdaysStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: spacing[1],
    marginBottom: spacing[2],
  };

  const weekdayStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
    padding: spacing[2],
  };

  const calendarContentStyle: React.CSSProperties = {
    transform: isDragging
      ? `translateX(${dragOffset}px)`
      : slideDirection === 'next'
        ? 'translateX(0)'  // 다음 달: 오른쪽에서(100%) 중앙으로(0) 이동
        : slideDirection === 'prev'
          ? 'translateX(0)'  // 이전 달: 왼쪽에서(-100%) 중앙으로(0) 이동
          : 'translateX(0)',
    opacity: 1,
    transition: isDragging
      ? 'none'
      : slideDirection
        ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        : 'none',
  };

  const getInitialTransform = () => {
    if (!slideDirection) return 'translateX(0)';
    // next: 오른쪽에서 시작, prev: 왼쪽에서 시작
    return slideDirection === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
  };

  const daysGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: spacing[1],
  };

  const getDayStyle = (date: Date): React.CSSProperties => {
    const isSelected = isSelectedDay(date);
    const isWorkout = isWorkoutDay(date);
    const isCurrent = isCurrentMonth(date);
    const isTodayDate = isToday(date);

    let background = 'transparent';
    let color = isDark ? colors.text.dark.secondary : colors.text.light.secondary;
    let border = 'none';
    let boxShadow = 'none';

    if (isSelected) {
      background = colors.primary.neonGreen;
      color = colors.text.dark.primary;
      boxShadow = shadows.button.neonGreen;
    } else if (isWorkout) {
      background = isDark
        ? 'rgba(50, 215, 75, 0.15)'
        : 'rgba(50, 215, 75, 0.1)';
      color = colors.primary.neonGreen;
      border = `2px solid ${colors.primary.neonGreen}`;
    } else if (isTodayDate) {
      border = `2px solid ${isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary}`;
      color = isDark ? colors.text.dark.primary : colors.text.light.primary;
    }

    if (isCurrent) {
      color = isSelected
        ? colors.text.dark.primary
        : isWorkout
          ? colors.primary.neonGreen
          : isDark ? colors.text.dark.primary : colors.text.light.primary;
    }

    return {
      aspectRatio: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.lg,
      cursor: 'pointer',
      fontSize: typography.fontSize.sm,
      fontWeight: isWorkout || isSelected ? typography.fontWeight.bold : typography.fontWeight.regular,
      background,
      color,
      border,
      boxShadow,
      opacity: isCurrent ? 1 : 0.4,
      transition: 'all 0.2s ease',
      position: 'relative',
    };
  };

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div
      style={containerStyle}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div style={headerStyle}>
        <button
          style={navButtonStyle}
          onClick={goToPreviousMonth}
          aria-label="이전 달"
        >
          ‹
        </button>
        <div style={monthYearStyle}>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </div>
        <button
          style={navButtonStyle}
          onClick={goToNextMonth}
          aria-label="다음 달"
        >
          ›
        </button>
      </div>

      <div
        style={{
          ...calendarContentStyle,
          ...(slideDirection && { transform: getInitialTransform() })
        }}
        key={displayMonth.toISOString()}
      >
        <div style={weekdaysStyle}>
          {weekdays.map((day) => (
            <div key={day} style={weekdayStyle}>
              {day}
            </div>
          ))}
        </div>

        <div style={daysGridStyle}>
          {calendarDays.map((date, index) => (
            <button
              key={index}
              style={getDayStyle(date)}
              onClick={() => onDateSelect(date)}
              aria-label={`${date.getMonth() + 1}월 ${date.getDate()}일${isWorkoutDay(date) ? ' 운동한 날' : ''}`}
              aria-pressed={isSelectedDay(date)}
            >
              {date.getDate()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}