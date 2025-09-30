# 프로젝트 설정

## 필수 요구사항

- Node.js 18.0+
- npm 9.0+
- Google Gemini API Key (AI 기능)

## 설치

```bash
git clone https://github.com/yourusername/dowajwo-woondong.git
cd dowajwo-woondong
npm install
```

## 환경변수

`.env.local`:
```env
GOOGLE_API_KEY=your_api_key
NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key  # 클라이언트 사용시
```

## 실행

```bash
npm run dev      # 개발 (localhost:3000)
npm run build    # 프로덕션 빌드
npm start        # 프로덕션 실행
```

## 프로젝트 구조

```
/
├── app/                # Next.js App Router
│   ├── page.tsx       # 홈
│   ├── login/         # 로그인
│   ├── signup/        # 회원가입
│   └── api/workout/   # API
├── components/
│   ├── ui/            # 기본 UI (Button, Input, Card...)
│   ├── auth/          # 인증 (LoginForm, SignUpForm)
│   └── workout/       # 운동 (SetCard, ExerciseCard...)
├── contexts/
│   └── ThemeContext.tsx  # 테마
├── lib/
│   ├── design-system/    # 디자인 토큰
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shadows.ts
│   │   └── focus.ts      # 접근성
│   ├── ai-trainer.ts     # Gemini API
│   └── workout-types.ts  # 타입
├── types/
│   └── workout.ts        # 운동 데이터 타입
└── docs/                 # 문서
```

## 기술 스택

**Frontend**: Next.js 15.5, React 18, TypeScript
**Styling**: CSS-in-JS, 디자인 시스템
**State**: React Context API
**AI**: Google Gemini API

## 개발 규칙

- TypeScript strict mode
- 한글 주석/문서
- 영문 변수/함수명
- 디자인 토큰 사용
- ARIA 속성 필수

## 문제 해결

```bash
# 포트 충돌
PORT=3001 npm run dev

# 캐시 정리
rm -rf .next && npm run dev

# 재설치
rm -rf node_modules package-lock.json && npm install
```

**최종 업데이트**: 2025-10-01