# 프로젝트 설정

## 환경 설정
```bash
# 설치
npm install

# 환경변수 (.env.local)
GOOGLE_API_KEY=your_api_key
NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key

# 실행
npm run dev  # localhost:3000
```

## 프로젝트 구조
```
/app           → 페이지 (login, signup, api)
/components    → UI 컴포넌트 (ui/, auth/)
/contexts      → React Context (ThemeContext)
/lib           → 유틸리티 (design-system/, ai-trainer.ts)
/document      → 문서
```

## 핵심 파일
- `lib/ai-trainer.ts`: Gemini API 통합
- `lib/workout-types.ts`: 타입 정의
- `lib/design-system/`: 디자인 토큰
- `components/ui/`: 재사용 컴포넌트

## 기술 스택
- Next.js 14 (App Router)
- TypeScript
- Google Gemini API
- CSS-in-JS

## 개발 규칙
- TypeScript strict mode
- 한글 주석/문서
- 영문 변수명
- 공용 컴포넌트 사용 필수