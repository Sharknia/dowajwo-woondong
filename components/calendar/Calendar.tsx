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

  // 월의 첫째 날과 마지막 날
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

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
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
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
    <div style={containerStyle}>
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
  );
}