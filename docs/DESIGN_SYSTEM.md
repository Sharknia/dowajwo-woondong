# 디자인 시스템

## 색상

### Primary
- 네온그린: `#32D74B` (주요 액션)
- 라이트그린: `#64E35D` (호버)
- 다크그린: `#28A23C` (pressed)

### Utility
- 에러: `#FF3B30`
- 경고: `#FF9500`
- 성공: `#34C759`
- 정보: `#007AFF`

### Dark Mode
- background: `#000000`
- surface: `#1C1C1E`
- surfaceSecondary: `#2C2C2E`
- surfaceTertiary: `#3A3A3C`

### Light Mode
- background: `#FFFFFF`
- surface: `#F2F2F7`
- surfaceSecondary: `#E5E5EA`
- surfaceTertiary: `#D1D1D6`

## 타이포그래피

### 폰트 패밀리
- **Sans**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`
- **Mono**: `SF Mono, Monaco, "Courier New"`

### 타입 스케일 (모바일 최적화)

| 이름 | 크기 | 용도 |
|------|------|------|
| display | 32px (2rem) | 앱 메인 타이틀 |
| h1 | 24px (1.5rem) | 페이지 제목 |
| h2 | 20px (1.25rem) | 섹션 제목 |
| h3 | 18px (1.125rem) | 서브섹션 |
| body | 16px (1rem) | 본문 (기본) |
| caption | 14px (0.875rem) | 보조 텍스트 |
| small | 12px (0.75rem) | 미세 텍스트 |

### Font Weight

| 이름 | 값 | 용도 |
|------|-----|------|
| regular | 400 | 본문, 일반 텍스트 |
| medium | 500 | 약한 강조, 라벨 |
| semibold | 600 | 제목, 버튼, 중요 정보 |
| bold | 700 | 강한 강조, 숫자 데이터 |

### Line Height

| 이름 | 값 | 용도 |
|------|-----|------|
| tight | 1.2 | 큰 제목용 |
| snug | 1.4 | 중간 제목용 |
| normal | 1.5 | 본문용 |
| relaxed | 1.6 | 긴 본문용 |

### Letter Spacing

| 이름 | 값 | 용도 |
|------|-----|------|
| tight | -0.01em | 큰 제목용 |
| normal | 0 | 기본 |
| wide | 0.02em | 작은 텍스트, 대문자용 |

### 타이포그래피 프리셋

사전 정의된 스타일 조합으로 일관된 타이포그래피 적용:

| 프리셋 | 크기 | 무게 | 행간 | 자간 | 용도 |
|--------|------|------|------|------|------|
| display | 32px | semibold | tight | tight | 앱 메인 타이틀 |
| h1 | 24px | semibold | tight | tight | 페이지 제목 |
| h2 | 20px | semibold | snug | normal | 섹션 제목 |
| h3 | 18px | semibold | snug | normal | 서브섹션 |
| body | 16px | regular | normal | normal | 본문 |
| bodyBold | 16px | semibold | normal | normal | 강조 본문 |
| caption | 14px | regular | snug | normal | 보조 텍스트 |
| captionBold | 14px | semibold | snug | normal | 강조 보조 |
| small | 12px | regular | snug | wide | 미세 텍스트 |
| button | 16px | semibold | normal | normal | 버튼 텍스트 |
| label | 14px | medium | snug | normal | 폼 라벨 |

## 간격 (8px 기반)

| Token | Value | Token | Value |
|-------|-------|-------|-------|
| 0 | 0px | 6 | 24px |
| 1 | 4px | 8 | 32px |
| 2 | 8px | 10 | 40px |
| 3 | 12px | 12 | 48px |
| 4 | 16px | 16 | 64px |

## 효과

### Glow
```css
box-shadow: 0 0 20px rgba(50, 215, 75, 0.5);
```

### Button Shadow
```css
box-shadow: 0 0 15px rgba(50, 215, 75, 0.4);
```

## 접근성 (WCAG 2.1 AA)

### 포커스
- Outline: `3px solid #32D74B`
- Offset: `2px`
- BoxShadow: `rgba(50, 215, 75, 0.2)` (dark), `rgba(50, 215, 75, 0.15)` (light)
- Transition: `0.2s ease`

### ARIA
- 모든 인터랙티브 요소 ARIA 속성 필수
- 아이콘: `aria-hidden="true"`
- 에러: `role="alert"`
- 상태: `role="status"`

### 키보드
- Tab/Shift+Tab: 포커스 이동
- Enter/Space: 활성화

상세: ACCESSIBILITY.md

## 사용

```typescript
// 프리셋 사용 (권장)
import { getTypographyStyle } from '@/lib/design-system';

<h1 style={getTypographyStyle('h1')}>제목</h1>
<p style={getTypographyStyle('body')}>본문</p>

// 프리셋 확장
const style = {
  ...getTypographyStyle('h2'),
  color: colors.primary.neonGreen
};

// 반응형 (globals.css)
html { font-size: 16px; }
@media (min-width: 768px) { html { font-size: 18px; } }
```

**최종 업데이트**: 2025-10-06