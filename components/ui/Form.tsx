'use client';

import React from 'react';
import { spacing } from '@/lib/design-system';

interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'style'> {
  children: React.ReactNode;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Form({
  children,
  gap = 'md',
  ...props
}: FormProps) {
  const gapMap = {
    sm: spacing[2],
    md: spacing[4],
    lg: spacing[6],
    xl: spacing[8],
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: gapMap[gap],
    width: '100%',
  };

  return (
    <form style={formStyle} {...props}>
      {children}
    </form>
  );
}

interface FormGroupProps {
  children: React.ReactNode;
  gap?: 'sm' | 'md';
}

export function FormGroup({
  children,
  gap = 'sm'
}: FormGroupProps) {
  const gapMap = {
    sm: spacing[2],
    md: spacing[4],
  };

  const groupStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: gapMap[gap],
  };

  return (
    <div style={groupStyle}>
      {children}
    </div>
  );
}

interface FormRowProps {
  children: React.ReactNode;
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
}

export function FormRow({
  children,
  gap = 'md',
  align = 'center'
}: FormRowProps) {
  const gapMap = {
    sm: spacing[2],
    md: spacing[4],
    lg: spacing[6],
  };

  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
  };

  const rowStyle = {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: gapMap[gap],
    alignItems: alignMap[align],
    width: '100%',
  };

  return (
    <div style={rowStyle}>
      {children}
    </div>
  );
}