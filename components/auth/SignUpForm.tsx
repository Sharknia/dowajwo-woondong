'use client';

import React, { useState } from 'react';
import { Button, Input, Form, FormRow, Divider, Logo, AuthLayout } from '@/components/ui';
import { spacing } from '@/lib/design-system';

interface SignUpFormProps {
  onSubmit?: (nickname: string, email: string, password: string) => void;
  onLoginClick?: () => void;
}

export function SignUpForm({ onSubmit, onLoginClick }: SignUpFormProps) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    nickname?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
  }>({});

  const validateNickname = () => {
    if (!nickname) {
      return '닉네임을 입력해주세요';
    }
    if (nickname.length < 2 || nickname.length > 20) {
      return '닉네임은 2자 이상 20자 이하로 입력해주세요';
    }
    return '';
  };

  const validateEmail = () => {
    if (!email) {
      return '이메일을 입력해주세요';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return '올바른 이메일 형식이 아닙니다';
    }
    return '';
  };

  const validatePassword = () => {
    if (!password) {
      return '비밀번호를 입력해주세요';
    }
    if (password.length < 8) {
      return '비밀번호는 8자 이상이어야 합니다';
    }
    return '';
  };

  const validatePasswordConfirm = () => {
    if (!passwordConfirm) {
      return '비밀번호를 다시 입력해주세요';
    }
    if (password !== passwordConfirm) {
      return '비밀번호가 일치하지 않습니다';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    const nicknameError = validateNickname();
    if (nicknameError) newErrors.nickname = nicknameError;

    const emailError = validateEmail();
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword();
    if (passwordError) newErrors.password = passwordError;

    const passwordConfirmError = validatePasswordConfirm();
    if (passwordConfirmError) newErrors.passwordConfirm = passwordConfirmError;

    if (!isEmailVerified) {
      newErrors.email = '이메일 중복 검사를 완료해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailCheck = async () => {
    const emailError = validateEmail();
    if (emailError) {
      setErrors({ ...errors, email: emailError });
      return;
    }

    setIsCheckingEmail(true);

    // 이메일 중복 검사 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 여기서는 항상 사용 가능한 것으로 가정
    // 실제로는 API 호출하여 확인
    const isAvailable = true;

    if (isAvailable) {
      setIsEmailVerified(true);
      setErrors({ ...errors, email: undefined });
    } else {
      setIsEmailVerified(false);
      setErrors({ ...errors, email: '이미 사용 중인 이메일입니다.' });
    }

    setIsCheckingEmail(false);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsEmailVerified(false); // 이메일이 변경되면 재검증 필요
    if (errors.email) setErrors({ ...errors, email: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit(nickname, email, password);
    }

    setIsLoading(false);
  };

  const logoContainerStyle = {
    marginBottom: spacing[8],
  };

  return (
    <AuthLayout>
      <div style={logoContainerStyle}>
        <Logo size="md" align="center" />
      </div>

          <Form onSubmit={handleSubmit}>
            <Input
              label="닉네임"
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                if (errors.nickname) setErrors({ ...errors, nickname: undefined });
              }}
              error={errors.nickname}
              placeholder="2-20자 사이로 입력"
              autoComplete="username"
              disabled={isLoading}
              fullWidth
            />

            <div>
              <FormRow gap="sm" align="start">
                <div style={{ flex: 1 }}>
                  <Input
                    label="이메일"
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    error={errors.email}
                    success={isEmailVerified && !errors.email ? '사용 가능한 이메일입니다' : undefined}
                    placeholder="example@email.com"
                    autoComplete="email"
                    disabled={isLoading || isEmailVerified}
                    fullWidth
                  />
                </div>
                <div style={{ paddingTop: '28px' }}>
                  <Button
                    type="button"
                    variant={isEmailVerified ? "secondary" : "outline"}
                    size="md"
                    onClick={handleEmailCheck}
                    disabled={isCheckingEmail || isLoading || isEmailVerified}
                    isLoading={isCheckingEmail}
                  >
                    {isCheckingEmail ? '확인 중...' : isEmailVerified ? '확인완료' : '중복확인'}
                  </Button>
                </div>
              </FormRow>
            </div>

            <Input
              label="비밀번호"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              error={errors.password}
              hint={!errors.password && password.length === 0 ? '8자 이상 입력해주세요' : undefined}
              placeholder="••••••••"
              autoComplete="new-password"
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

            <Input
              label="비밀번호 확인"
              type={showPasswordConfirm ? 'text' : 'password'}
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                if (errors.passwordConfirm) setErrors({ ...errors, passwordConfirm: undefined });
              }}
              error={errors.passwordConfirm}
              success={!errors.passwordConfirm && passwordConfirm && password === passwordConfirm ? '비밀번호가 일치합니다' : undefined}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={isLoading}
              fullWidth
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'inherit'
                  }}
                  tabIndex={-1}
                >
                  {showPasswordConfirm ? '숨기기' : '보기'}
                </button>
              }
              onRightIconClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
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
                {isLoading ? '가입 처리 중...' : '회원가입'}
              </Button>
            </div>
          </Form>

          <Divider text="이미 계정이 있으신가요?" margin="lg" />

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onLoginClick}
            disabled={isLoading}
          >
            로그인
          </Button>
    </AuthLayout>
  );
}