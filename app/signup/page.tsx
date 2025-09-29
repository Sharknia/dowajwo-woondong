'use client';

import { SignUpForm } from '@/components/auth/SignUpForm';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = (nickname: string, email: string, password: string) => {
    console.log('회원가입 정보:', { nickname, email, password });
    // TODO: 실제 회원가입 API 호출
    alert('회원가입이 완료되었습니다!');
    router.push('/login');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <ThemeProvider>
      <SignUpForm
        onSubmit={handleSignUp}
        onLoginClick={handleLoginClick}
      />
    </ThemeProvider>
  );
}