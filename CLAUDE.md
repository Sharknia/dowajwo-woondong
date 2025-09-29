# CLAUDE.md - Dowajwo-Woondong AI 트레이너 모듈

AI 기반 운동 추천 모듈 프로젝트 설정

## ⚠️ 중요: 개발 작업 규칙

1. **작업 시작 전 필수사항**
   - 프로젝트 내 모든 문서를 먼저 읽고 이해할 것
   - 특히 이 문서(CLAUDE.md)와 README.md는 반드시 숙지

2. **작업 완료 후 필수사항**
   - 변경사항에 맞춰 관련 문서를 반드시 업데이트
   - 코드 예제, API 설명, 버전 정보 등을 최신 상태로 유지

## 📋 프로젝트 개요

**프로젝트**: Dowajwo-Woondong (AI 운동 트레이너 모듈)
**타입**: Next.js 통합용 단순화된 모듈
**언어**: TypeScript
**API**: Google Gemini API
**목적**: 운동 데이터 분석 및 AI 기반 추천/피드백 제공

## 🎯 핵심 기능

1. **운동 스케줄 추천**: 과거 운동 데이터 기반 차기 운동 계획 생성
2. **운동 피드백**: 수행한 운동에 대한 AI 분석 및 개선점 제공
3. **점진적 과부하**: 과학적 원칙 기반 운동 강도 조절
4. **회복 관리**: 근육 피로도 고려한 균형 잡힌 계획

## 🏗️ 모듈 구조

```
/
├── workout-types.ts        # 운동 데이터 타입 정의
├── ai-trainer.ts          # AI 트레이너 서비스
└── nextjs-integration-example.md  # 통합 가이드
```

### workout-types.ts
- `WorkoutData`: 운동 데이터 메인 인터페이스
- `DayLog`: 일별 운동 로그
- `ExerciseSession`: 운동별 세션 데이터
- `SetData`: 세트별 상세 데이터
- 유틸리티: 데이터 검증, 정규화, 샘플 생성

### ai-trainer.ts
- `AITrainer`: Gemini API 통합 클래스
- `getWorkoutRecommendation()`: 운동 추천
- `getWorkoutFeedback()`: 피드백 생성
- 에러 처리 및 재시도 로직
- 환경변수 기반 설정

## 🔧 개발 가이드라인

### 문서 관리 원칙
- **작업 시작 전**: 반드시 프로젝트 내 모든 관련 문서를 읽고 이해
- **참조 문서**: README.md, CLAUDE.md, PROJECT_SETUP.md, nextjs-integration-example.md
- **작업 완료 후**: 변경사항을 반영하여 관련 문서 업데이트 필수
- **문서 최신화**: 코드 변경 시 해당 문서의 예제, 설명, 버전 정보 갱신

### 코드 스타일
- **TypeScript**: 엄격한 타입 정의
- **에러 처리**: 명시적 에러 반환
- **비동기 처리**: async/await 패턴
- **모듈화**: 단일 책임 원칙

### 핵심 패턴
- **함수형 API**: 클래스와 함수형 인터페이스 모두 제공
- **유효성 검증**: 타입 가드를 통한 런타임 검증
- **환경변수 관리**: 다중 환경변수 지원
- **재시도 로직**: 지수 백오프
- **타임아웃**: Promise.race 패턴

## 📦 의존성

### 필수
- `@google/genai`: Gemini API 클라이언트

### 개발 (Next.js 프로젝트에서 제공)
- `typescript`: TypeScript 컴파일러
- `@types/node`: Node.js 타입

## 🚀 사용 방법

### 1. 모듈 통합
```bash
# Next.js 프로젝트의 lib 폴더에 파일 복사
cp workout-types.ts ai-trainer.ts /your-nextjs-app/lib/
```

### 2. 환경변수 설정
```env
GOOGLE_API_KEY=your_api_key
# 또는
NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key
```

### 3. 기본 사용
```typescript
import { AITrainer } from '@/lib/ai-trainer';
import { WorkoutData } from '@/lib/workout-types';

const trainer = new AITrainer();
const response = await trainer.getWorkoutRecommendation(workoutData);
```

## 🔑 환경변수

```env
GOOGLE_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_GOOGLE_API_KEY=your_gemini_api_key_here
```

## 🧪 테스트 전략

### 단위 테스트
- 데이터 유효성 검증 함수
- 정규화 함수
- 에러 처리

### 통합 테스트
- API 호출 성공/실패
- 재시도 로직
- 타임아웃 처리

## 🔒 보안 고려사항

- ✅ API 키 환경변수 분리
- ✅ 서버사이드 전용 사용 권장
- ✅ 입력 데이터 검증
- ✅ 에러 메시지 안전 처리

## 📈 확장 가능성

### 계획된 기능
- 데이터베이스 통합 (사용자별 기록)
- 운동 통계 분석
- 진행 상황 시각화
- 소셜 기능 (운동 공유)

### 아키텍처 개선
- 캐싱 레이어 추가
- 배치 처리 지원
- 다중 AI 모델 지원
- WebSocket 실시간 피드백

## 🎯 사용 예시

### Next.js API Route
```typescript
// app/api/workout/recommendation/route.ts
import { getWorkoutRecommendation } from '@/lib/ai-trainer';

export async function POST(request: Request) {
  const data = await request.json();
  return Response.json(await getWorkoutRecommendation(data));
}
```

### React Component
```typescript
// components/WorkoutRecommendation.tsx
const [recommendation, setRecommendation] = useState('');

const fetchRecommendation = async (data: WorkoutData) => {
  const res = await fetch('/api/workout/recommendation', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const result = await res.json();
  setRecommendation(result.recommendation);
};
```

## 🚨 일반적인 문제 해결

### API 키 오류
- 환경변수 확인
- API 키 유효성 검증
- 도메인 제한 설정 확인

### 타입 오류
- TypeScript 버전 호환성
- 타입 정의 최신화
- strict mode 설정

### 네트워크 오류
- 재시도 로직 동작 확인
- 타임아웃 설정 조정
- 에러 핸들링 구현

## 🔄 버전 관리

### 현재 버전: 2.0.0
- 단순화된 모듈 구조
- Next.js 최적화
- 핵심 기능만 유지

### 이전 버전 (1.0.0)
- 전체 서비스 구조
- CLI 인터페이스
- 다중 프리셋 시스템