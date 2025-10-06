'use client';

import React from 'react';
import { CenteredCardLayout } from './CenteredCardLayout';

interface AuthLayoutProps {
  children: React.ReactNode;
  maxWidth?: '400px' | '420px' | '500px';
}

/**
 * 인증 페이지 레이아웃 컴포넌트
 * CenteredCardLayout을 래핑한 단순 레이아웃
 */
export function AuthLayout({ children, maxWidth = '420px' }: AuthLayoutProps) {
  return (
    <CenteredCardLayout maxWidth={maxWidth}>
      {children}
    </CenteredCardLayout>
  );
}