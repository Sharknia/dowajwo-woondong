'use client';

import { LoginForm } from '@/components/auth/LoginForm';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    // TODO: Implement actual authentication logic here
    console.log('Login attempt:', { email, password, rememberMe });

    // Simulate successful login and redirect
    // In a real app, this would validate credentials with an API
    setTimeout(() => {
      // router.push('/dashboard'); // Redirect after login
      alert(`로그인 시도:\n이메일: ${email}\n자동 로그인: ${rememberMe ? '활성화' : '비활성화'}`);
    }, 500);
  };

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  return (
    <ThemeProvider>
      <LoginForm
        onSubmit={handleLogin}
        onSignUpClick={handleSignUpClick}
      />
    </ThemeProvider>
  );
}