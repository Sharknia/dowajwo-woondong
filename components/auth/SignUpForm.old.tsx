'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/design-system';

interface SignUpFormProps {
  onSubmit?: (nickname: string, email: string, password: string) => void;
  onLoginClick?: () => void;
}

export function SignUpForm({ onSubmit, onLoginClick }: SignUpFormProps) {
  const { theme } = useTheme();
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

  const isDark = theme === 'dark';

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
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다';
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
      alert('사용 가능한 이메일입니다.');
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

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing[4],
      background: isDark ? colors.dark.background : colors.light.background,
      transition: 'background 0.3s ease',
    },

    formCard: {
      width: '100%',
      maxWidth: '450px',
      padding: spacing[8],
      background: isDark ? colors.dark.surface : colors.light.surface,
      borderRadius: borderRadius['2xl'],
      boxShadow: isDark ? shadows.dark.xl : shadows.light.xl,
    },

    logo: {
      textAlign: 'center' as const,
      marginBottom: spacing[8],
    },

    logoIcon: {
      width: '80px',
      height: '80px',
      margin: '0 auto',
      marginBottom: spacing[4],
      background: colors.gradients.neonGlow,
      borderRadius: borderRadius.full,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: shadows.glow.green,
      animation: 'pulse 2s infinite',
    },

    title: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.bold,
      color: isDark ? colors.text.dark.primary : colors.text.light.primary,
      marginBottom: spacing[2],
    },

    subtitle: {
      fontSize: typography.fontSize.sm,
      color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
      marginBottom: spacing[6],
    },

    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: spacing[4],
    },

    inputGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: spacing[2],
    },

    label: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: isDark ? colors.text.dark.primary : colors.text.light.primary,
    },

    inputWrapper: {
      position: 'relative' as const,
      display: 'flex',
      gap: spacing[2],
    },

    input: {
      width: '100%',
      padding: `${spacing[3]} ${spacing[4]}`,
      fontSize: typography.fontSize.base,
      fontFamily: typography.fontFamily.sans,
      background: isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary,
      color: isDark ? colors.text.dark.primary : colors.text.light.primary,
      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      borderRadius: borderRadius.lg,
      outline: 'none',
      transition: 'all 0.3s ease',
    },

    inputFocus: {
      borderColor: colors.primary.neonGreen,
      boxShadow: `0 0 0 3px ${isDark ? 'rgba(50, 215, 75, 0.2)' : 'rgba(50, 215, 75, 0.1)'}`,
    },

    inputError: {
      borderColor: colors.utility.error,
      boxShadow: `0 0 0 3px ${isDark ? 'rgba(255, 59, 48, 0.2)' : 'rgba(255, 59, 48, 0.1)'}`,
    },

    inputSuccess: {
      borderColor: colors.utility.success,
      boxShadow: `0 0 0 3px ${isDark ? 'rgba(52, 199, 89, 0.2)' : 'rgba(52, 199, 89, 0.1)'}`,
    },

    errorMessage: {
      fontSize: typography.fontSize.xs,
      color: colors.utility.error,
      marginTop: spacing[1],
    },

    successMessage: {
      fontSize: typography.fontSize.xs,
      color: colors.utility.success,
      marginTop: spacing[1],
    },

    passwordToggle: {
      position: 'absolute' as const,
      right: spacing[3],
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'transparent',
      border: 'none',
      color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
      cursor: 'pointer',
      padding: spacing[2],
      fontSize: typography.fontSize.sm,
    },

    emailCheckButton: {
      padding: `${spacing[3]} ${spacing[4]}`,
      background: isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary,
      color: isDark ? colors.text.dark.primary : colors.text.light.primary,
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
      borderRadius: borderRadius.lg,
      cursor: isCheckingEmail ? 'not-allowed' : 'pointer',
      whiteSpace: 'nowrap' as const,
      transition: 'all 0.3s ease',
      opacity: isCheckingEmail ? 0.7 : 1,
    },

    emailCheckButtonHover: {
      background: colors.primary.neonGreen,
      color: colors.text.dark.primary,
      borderColor: colors.primary.neonGreen,
    },

    submitButton: {
      marginTop: spacing[6],
      padding: `${spacing[4]} ${spacing[6]}`,
      background: colors.gradients.glowButton,
      color: colors.text.dark.primary,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
      fontFamily: typography.fontFamily.sans,
      border: 'none',
      borderRadius: borderRadius.lg,
      cursor: isLoading ? 'not-allowed' : 'pointer',
      boxShadow: shadows.button.neonGreen,
      transition: 'all 0.3s ease',
      opacity: isLoading ? 0.7 : 1,
    },

    submitButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: shadows.button.neonGreenHover,
    },

    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[4],
      marginTop: spacing[6],
      marginBottom: spacing[6],
    },

    dividerLine: {
      flex: 1,
      height: '1px',
      background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    },

    dividerText: {
      fontSize: typography.fontSize.sm,
      color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
    },

    loginButton: {
      width: '100%',
      padding: `${spacing[4]} ${spacing[6]}`,
      background: 'transparent',
      color: isDark ? colors.text.dark.primary : colors.text.light.primary,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.sans,
      border: `2px solid ${isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary}`,
      borderRadius: borderRadius.lg,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },

    loginButtonHover: {
      borderColor: colors.primary.neonGreen,
      color: colors.primary.neonGreen,
      boxShadow: `0 0 10px ${isDark ? 'rgba(50, 215, 75, 0.3)' : 'rgba(50, 215, 75, 0.2)'}`,
    },

    passwordHint: {
      fontSize: typography.fontSize.xs,
      color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
      marginTop: spacing[1],
    },
  };

  return (
    <div style={styles.container}>
      <style jsx global>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 20px rgba(50, 215, 75, 0.5), 0 0 40px rgba(50, 215, 75, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(50, 215, 75, 0.7), 0 0 60px rgba(50, 215, 75, 0.5);
          }
          100% {
            box-shadow: 0 0 20px rgba(50, 215, 75, 0.5), 0 0 40px rgba(50, 215, 75, 0.3);
          }
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 30px ${isDark ? colors.dark.surfaceSecondary : colors.light.surfaceSecondary} inset !important;
          -webkit-text-fill-color: ${isDark ? colors.text.dark.primary : colors.text.light.primary} !important;
        }
      `}</style>

      <div style={styles.formCard}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 4l7 7-7 7M6 17l7-7-7-7" />
            </svg>
          </div>
          <h1 style={styles.title}>회원가입</h1>
          <p style={styles.subtitle}>AI 운동 트레이너와 함께 시작하세요</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="nickname">
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                if (errors.nickname) setErrors({ ...errors, nickname: undefined });
              }}
              style={{
                ...styles.input,
                ...(errors.nickname ? styles.inputError : {}),
              }}
              placeholder="2-20자 사이로 입력"
              autoComplete="username"
              disabled={isLoading}
            />
            {errors.nickname && (
              <span style={styles.errorMessage}>{errors.nickname}</span>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">
              이메일
            </label>
            <div style={styles.inputWrapper}>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                style={{
                  ...styles.input,
                  flex: 1,
                  ...(errors.email ? styles.inputError : {}),
                  ...(isEmailVerified ? styles.inputSuccess : {}),
                }}
                placeholder="example@email.com"
                autoComplete="email"
                disabled={isLoading || isEmailVerified}
              />
              <button
                type="button"
                onClick={handleEmailCheck}
                style={styles.emailCheckButton}
                onMouseEnter={(e) => {
                  if (!isCheckingEmail && !isEmailVerified) {
                    Object.assign(e.currentTarget.style, styles.emailCheckButtonHover);
                  }
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, {
                    background: isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary,
                    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  });
                }}
                disabled={isCheckingEmail || isLoading || isEmailVerified}
              >
                {isCheckingEmail ? '확인 중...' : isEmailVerified ? '확인완료' : '중복확인'}
              </button>
            </div>
            {errors.email && (
              <span style={styles.errorMessage}>{errors.email}</span>
            )}
            {isEmailVerified && !errors.email && (
              <span style={styles.successMessage}>사용 가능한 이메일입니다</span>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">
              비밀번호
            </label>
            <div style={{ ...styles.inputWrapper, position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                style={{
                  ...styles.input,
                  paddingRight: spacing[12],
                  ...(errors.password ? styles.inputError : {}),
                }}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
                tabIndex={-1}
              >
                {showPassword ? '숨기기' : '보기'}
              </button>
            </div>
            {!errors.password && password.length === 0 && (
              <span style={styles.passwordHint}>
                대문자, 소문자, 숫자를 포함한 8자 이상
              </span>
            )}
            {errors.password && (
              <span style={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="passwordConfirm">
              비밀번호 확인
            </label>
            <div style={{ ...styles.inputWrapper, position: 'relative' }}>
              <input
                id="passwordConfirm"
                type={showPasswordConfirm ? 'text' : 'password'}
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                  if (errors.passwordConfirm) setErrors({ ...errors, passwordConfirm: undefined });
                }}
                style={{
                  ...styles.input,
                  paddingRight: spacing[12],
                  ...(errors.passwordConfirm ? styles.inputError : {}),
                  ...(passwordConfirm && password === passwordConfirm ? styles.inputSuccess : {}),
                }}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                style={styles.passwordToggle}
                tabIndex={-1}
              >
                {showPasswordConfirm ? '숨기기' : '보기'}
              </button>
            </div>
            {errors.passwordConfirm && (
              <span style={styles.errorMessage}>{errors.passwordConfirm}</span>
            )}
            {!errors.passwordConfirm && passwordConfirm && password === passwordConfirm && (
              <span style={styles.successMessage}>비밀번호가 일치합니다</span>
            )}
          </div>

          <button
            type="submit"
            style={styles.submitButton}
            onMouseEnter={(e) => {
              if (!isLoading) {
                Object.assign(e.currentTarget.style, styles.submitButtonHover);
              }
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, {
                transform: 'translateY(0)',
                boxShadow: shadows.button.neonGreen,
              });
            }}
            disabled={isLoading}
          >
            {isLoading ? '가입 처리 중...' : '회원가입'}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>이미 계정이 있으신가요?</span>
          <div style={styles.dividerLine} />
        </div>

        <button
          type="button"
          style={styles.loginButton}
          onClick={onLoginClick}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, styles.loginButtonHover);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, {
              borderColor: isDark ? colors.dark.surfaceTertiary : colors.light.surfaceTertiary,
              color: isDark ? colors.text.dark.primary : colors.text.light.primary,
              boxShadow: 'none',
            });
          }}
          disabled={isLoading}
        >
          로그인
        </button>
      </div>
    </div>
  );
}