# 🏃‍♂️ Dowajwo-Woondong (도와줘 운동)

AI 기반 개인 맞춤형 운동 트레이너 애플리케이션

## 📱 프로젝트 소개

Dowajwo-Woondong은 애플워치 운동 앱에서 영감을 받은 디자인과 Google Gemini AI를 활용한 지능형 운동 트레이너 앱입니다. 사용자의 운동 데이터를 분석하여 개인 맞춤형 운동 계획과 피드백을 제공합니다.

### ✨ 주요 특징

- 🎨 **애플워치 스타일 UI**: 네온 그린 강조 색상과 다크 모드 최적화
- 🔐 **사용자 인증**: 안전한 로그인 시스템과 자동 로그인 기능
- 🌙 **다크/라이트 모드**: 시스템 설정 연동 및 수동 전환 가능
- 📱 **모바일 우선 디자인**: 모든 디바이스에서 완벽한 반응형 UI
- ♿ **웹 접근성 준수**: WCAG 2.1 AA 기준 충족 (접근성 점수 92/100)
- 🤖 **AI 운동 코칭** (개발 중): Gemini API를 활용한 맞춤형 운동 추천

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn 패키지 매니저
- Google Gemini API 키 (AI 기능 사용 시)

### 설치 방법

1. 저장소 클론
```bash
git clone https://github.com/yourusername/dowajwo-woondong.git
cd dowajwo-woondong
```

2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

3. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 내용을 추가:
```env
GOOGLE_API_KEY=your_gemini_api_key_here
# 또는
NEXT_PUBLIC_GOOGLE_API_KEY=your_gemini_api_key_here
```

4. 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

5. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 📁 프로젝트 구조

```
dowajwo-woondong/
├── app/                    # Next.js 13+ App Router
│   ├── login/             # 로그인 페이지
│   └── api/workout/       # 운동 관련 API 엔드포인트
├── components/            # React 컴포넌트
│   ├── auth/             # 인증 관련 컴포넌트
│   └── workout/          # 운동 관련 컴포넌트
├── contexts/             # React Context Providers
│   └── ThemeContext.tsx  # 테마 관리
├── lib/                  # 유틸리티 및 라이브러리
│   ├── design-system/    # 디자인 시스템
│   ├── ai-trainer.ts     # AI 트레이너 서비스
│   └── workout-types.ts  # TypeScript 타입 정의
├── docs/                 # 프로젝트 문서
└── public/               # 정적 파일
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: 네온 그린 (#32D74B) - 애플워치 액티비티 링 스타일
- **Background**: 다크 모드 최적화 (#000000)
- **Surface**: 계층적 UI를 위한 단계별 회색 톤

### 주요 컴포넌트
- 로그인 폼 (이메일/비밀번호)
- 테마 전환 시스템
- 반응형 레이아웃

## 📚 주요 기능

### 현재 구현된 기능
- ✅ 로그인 페이지 UI
- ✅ 다크/라이트 모드 전환
- ✅ 폼 유효성 검증
- ✅ 자동 로그인 설정
- ✅ 애플워치 스타일 디자인 시스템

### 개발 중인 기능
- 🚧 회원가입 페이지
- 🚧 대시보드 페이지
- 🚧 AI 운동 추천 시스템
- 🚧 운동 기록 및 통계
- 🚧 소셜 기능

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: CSS-in-JS, 커스텀 디자인 시스템
- **State Management**: React Context API
- **AI Integration**: Google Gemini API
- **Development**: ESLint, Prettier

## 📖 문서

### 핵심 문서
- **[CLAUDE.md](./CLAUDE.md)** - AI 개발 가이드라인 및 규칙
- **[docs/](./docs/)** - 전체 기술 문서 디렉토리

### 상세 가이드
- **[시작하기](./docs/SETUP.md)** - 프로젝트 설치 및 설정
- **[디자인 시스템](./docs/DESIGN_SYSTEM.md)** - 색상, 타이포, 간격 시스템
- **[컴포넌트](./docs/COMPONENTS.md)** - UI 컴포넌트 라이브러리
- **[접근성](./docs/ACCESSIBILITY.md)** - WCAG 2.1 AA 준수 가이드

## 🤝 기여하기

기여를 환영합니다! 다음 절차를 따라주세요:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 개발 규칙
- 모든 코드 주석과 문서는 한글로 작성
- TypeScript 엄격 모드 사용
- 컴포넌트는 함수형으로 작성
- 커밋 메시지는 명확하게 작성

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👥 팀

- 개발자 - [@yourusername](https://github.com/yourusername)

## 📞 문의

프로젝트에 대한 문의사항은 이슈를 생성해주세요.

---

**Made with 💚 using Next.js and Gemini AI**