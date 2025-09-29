'use client';

import React, { useState } from 'react';
import { Button, Input, Checkbox, Card, Form, Divider, Logo } from '@/components/ui';
import { spacing } from '@/lib/design-system';

interface LoginFormProps {
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void;
  onSignUpClick?: () => void;
}

export function LoginForm({ onSubmit, onSignUpClick }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit(email, password, rememberMe);
    }

    setIsLoading(false);
  };

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
    maxWidth: '400px',
  };

  const logoContainerStyle = {
    marginBottom: spacing[8],
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <Card>
          <div style={logoContainerStyle}>
            <Logo
              size="md"
              animated={true}
              showText={true}
              subtitle="AI 운동 트레이너에 오신 것을 환영합니다"
            />
          </div>

          <Form onSubmit={handleSubmit}>
            <Input
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={errors.email}
              placeholder="example@email.com"
              autoComplete="email"
              disabled={isLoading}
              fullWidth
            />

            <Input
              label="비밀번호"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              error={errors.password}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={isLoading}
              fullWidth
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'inherit'
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? '숨기기' : '보기'}
                </button>
              }
              onRightIconClick={() => setShowPassword(!showPassword)}
            />

            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              label="자동 로그인"
              disabled={isLoading}
            />

            <div style={{ marginTop: spacing[4] }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </div>
          </Form>

          <Divider text="또는" margin="lg" />

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onSignUpClick}
            disabled={isLoading}
          >
            회원가입
          </Button>
        </Card>
      </div>
    </div>
  );
}