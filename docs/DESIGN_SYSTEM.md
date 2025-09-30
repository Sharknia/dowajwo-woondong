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

**Font**: `-apple-system, BlinkMacSystemFont, SF Pro`

| Size | Value | Use |
|------|-------|-----|
| xs | 12px | 보조 텍스트 |
| sm | 14px | 일반 텍스트 |
| base | 16px | 기본 |
| lg | 18px | 강조 |
| xl | 20px | 제목 |
| 2xl | 24px | 큰 제목 |
| 3xl | 30px | 헤더 |

**Weight**: light(300), regular(400), medium(500), semibold(600), bold(700), heavy(800)

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
import { colors, typography, spacing, focus } from '@/lib/design-system';

// 컴포넌트 스타일
const style = {
  color: colors.primary.neonGreen,
  fontSize: typography.fontSize.base,
  padding: spacing[4],
  outline: isFocused ? focus.dark.outline : 'none'
};
```

**최종 업데이트**: 2025-10-01