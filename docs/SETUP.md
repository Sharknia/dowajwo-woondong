# 🚀 프로젝트 설정 가이드

Dowajwo-Woondong 프로젝트의 설치 및 초기 설정 방법

---

## 📋 필수 요구사항

- **Node.js**: 18.0.0 이상
- **npm**: 9.0.0 이상 (또는 yarn)
- **Google Gemini API Key**: AI 기능 사용 시 필요

---

## ⚙️ 설치 방법

### 1. 저장소 클론
```bash
git clone https://github.com/yourusername/dowajwo-woondong.git
cd dowajwo-woondong
```

### 2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

### 3. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일 생성:

```env
# Google Gemini API Key (필수)
GOOGLE_API_KEY=your_gemini_api_key_here

# 또는 (클라이언트에서도 사용 시)
NEXT_PUBLIC_GOOGLE_API_KEY=your_gemini_api_key_here
```

**API 키 발급**: [Google AI Studio](https://makersuite.google.com/app/apikey)

---

## 🏃 실행 방법

### 개발 서버
```bash
npm run dev
# 기본 포트: http://localhost:3000
```

### 프로덕션 빌드
```bash
npm run build
npm start
```

### 타입 체크
```bash
npm run type-check
```

### 린트
```bash
npm run lint
```

---

## 📁 프로젝트 구조

```
dowajwo-woondong/
├── app/                      # Next.js App Router
│   ├── page.tsx             # 홈 페이지
│   ├── login/               # 로그인 페이지
│   ├── signup/              # 회원가입 페이지
│   ├── layout.tsx           # 루트 레이아웃
│   └── api/                 # API Routes
│       └── workout/         # 운동 관련 API
├── components/              # React 컴포넌트
│   ├── ui/                  # 기본 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── auth/                # 인증 관련 컴포넌트
│   └── workout/             # 운동 관련 컴포넌트
├── contexts/                # React Context
│   └── ThemeContext.tsx    # 테마 관리
├── lib/                     # 유틸리티 및 라이브러리
│   ├── design-system/       # 디자인 토큰
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shadows.ts
│   │   ├── focus.ts        # 접근성 포커스 스타일
│   │   └── index.ts
│   ├── ai-trainer.ts        # Gemini API 통합
│   └── workout-types.ts     # 운동 데이터 타입
├── types/                   # TypeScript 타입 정의
│   └── workout.ts
├── docs/                    # 프로젝트 문서
│   ├── README.md
│   ├── SETUP.md            # 이 파일
│   ├── DESIGN_SYSTEM.md
│   ├── COMPONENTS.md
│   └── ACCESSIBILITY.md
├── public/                  # 정적 파일
├── .env.local              # 환경 변수 (gitignore)
├── package.json
├── tsconfig.json
└── next.config.js
```

---

## 🔧 핵심 파일 설명

### 디자인 시스템
**`lib/design-system/`**
- `colors.ts`: 애플워치 스타일 색상 팔레트
- `typography.ts`: 폰트 크기, 무게, 행간
- `spacing.ts`: 8px 기반 간격 시스템
- `shadows.ts`: 그림자 및 글로우 효과
- `focus.ts`: 접근성 포커스 스타일 (신규)

### AI 통합
**`lib/ai-trainer.ts`**
- Google Gemini API 클라이언트
- 운동 추천 및 피드백 생성
- 에러 처리 및 재시도 로직

### 타입 정의
**`lib/workout-types.ts`** / **`types/workout.ts`**
- 운동 데이터 구조 정의
- TypeScript 타입 안정성

### UI 컴포넌트
**`components/ui/`**
- 재사용 가능한 기본 UI 컴포넌트
- 디자인 시스템 토큰 사용
- 접근성 WCAG 2.1 AA 준수

---

## 🛠️ 기술 스택

### 프론트엔드
- **Next.js 15.5**: React 프레임워크 (App Router)
- **React 18**: UI 라이브러리
- **TypeScript**: 타입 안정성

### 스타일링
- **CSS-in-JS**: 인라인 스타일 (React Style Objects)
- **디자인 시스템**: 커스텀 디자인 토큰

### 상태 관리
- **React Context API**: 전역 상태 (테마)
- **useState/useEffect**: 로컬 상태

### AI 통합
- **Google Gemini API**: AI 운동 추천
- **@google/generative-ai**: Gemini SDK

### 개발 도구
- **ESLint**: 코드 린팅
- **TypeScript**: 타입 체크

---

## 📝 개발 규칙

### 코드 스타일
- ✅ TypeScript strict mode
- ✅ 한글 주석 및 문서
- ✅ 영문 변수명 및 함수명
- ✅ 공용 컴포넌트 우선 사용

### 커밋 규칙
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경 (기능 변경 없음)
refactor: 리팩토링
test: 테스트 추가/수정
chore: 빌드, 설정 변경
```

### 컴포넌트 작성 규칙
1. 디자인 시스템 토큰 사용 필수
2. 접근성 속성 (ARIA) 포함
3. 타입 안정성 (TypeScript)
4. 재사용 가능하도록 설계

---

## 🐛 문제 해결

### 포트 충돌
```bash
# 3000번 포트 사용 중일 경우
PORT=3001 npm run dev
```

### 캐시 문제
```bash
# .next 폴더 삭제
rm -rf .next
npm run dev
```

### 타입 오류
```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

### 환경 변수 미적용
- 서버 재시작 필요
- `.env.local` 파일 위치 확인 (프로젝트 루트)

---

## 📚 다음 단계

1. **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - 디자인 시스템 학습
2. **[COMPONENTS.md](./COMPONENTS.md)** - UI 컴포넌트 사용법
3. **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** - 접근성 가이드
4. **[../CLAUDE.md](../CLAUDE.md)** - AI 개발 가이드라인

---

## 🤝 도움이 필요한가요?

- **GitHub Issues**: 버그 리포트 및 기능 요청
- **문서**: [docs/README.md](./README.md)
- **메인 README**: [../README.md](../README.md)

---

**최종 업데이트**: 2025-10-01