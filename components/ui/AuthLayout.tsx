'use client';

import React from 'react';
import { Card } from './Card';
import { spacing } from '@/lib/design-system';

interface AuthLayoutProps {
  children: React.ReactNode;
  maxWidth?: '400px' | '450px' | '500px';
}

export function AuthLayout({ children, maxWidth = '420px' }: AuthLayoutProps) {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  };

  const formContainerStyle = {
    width: '100%',
    maxWidth: maxWidth,
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <Card>
          {children}
        </Card>
      </div>
    </div>
  );
}