'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/design-system';

interface LoginFormProps {
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void;
  onSignUpClick?: () => void;
}

export function LoginForm({ onSubmit, onSignUpClick }: LoginFormProps) {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const isDark = theme === 'dark';

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
      maxWidth: '400px',
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

    errorMessage: {
      fontSize: typography.fontSize.xs,
      color: colors.utility.error,
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

    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
      marginTop: spacing[2],
    },

    checkbox: {
      width: '20px',
      height: '20px',
      accentColor: colors.primary.neonGreen,
      cursor: 'pointer',
    },

    checkboxLabel: {
      fontSize: typography.fontSize.sm,
      color: isDark ? colors.text.dark.secondary : colors.text.light.secondary,
      cursor: 'pointer',
      userSelect: 'none' as const,
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

    signUpButton: {
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

    signUpButtonHover: {
      borderColor: colors.primary.neonGreen,
      color: colors.primary.neonGreen,
      boxShadow: `0 0 10px ${isDark ? 'rgba(50, 215, 75, 0.3)' : 'rgba(50, 215, 75, 0.2)'}`,
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
          <h1 style={styles.title}>Dowajwo-Woondong</h1>
          <p style={styles.subtitle}>AI 운동 트레이너에 오신 것을 환영합니다</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              placeholder="example@email.com"
              autoComplete="email"
              disabled={isLoading}
            />
            {errors.email && (
              <span style={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">
              비밀번호
            </label>
            <div style={styles.inputWrapper}>
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
                autoComplete="current-password"
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
            {errors.password && (
              <span style={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          <div style={styles.checkboxGroup}>
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={styles.checkbox}
              disabled={isLoading}
            />
            <label htmlFor="remember" style={styles.checkboxLabel}>
              자동 로그인
            </label>
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
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>또는</span>
          <div style={styles.dividerLine} />
        </div>

        <button
          type="button"
          style={styles.signUpButton}
          onClick={onSignUpClick}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, styles.signUpButtonHover);
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
          회원가입
        </button>
      </div>
    </div>
  );
}