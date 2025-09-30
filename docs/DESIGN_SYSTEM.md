# 디자인 시스템

## 색상
### Primary
- 네온그린: #32D74B (액티비티, 주요 액션)
- 라이트그린: #64E35D (호버)
- 다크그린: #28A23C (pressed)

### Utility
- 에러: #FF3B30
- 경고: #FF9500
- 성공: #34C759
- 정보: #007AFF

### Dark Mode
- background: #000000
- surface: #1C1C1E
- surfaceSecondary: #2C2C2E
- surfaceTertiary: #3A3A3C

### Light Mode
- background: #FFFFFF
- surface: #F2F2F7
- surfaceSecondary: #E5E5EA
- surfaceTertiary: #D1D1D6

## 타이포그래피
- Font: -apple-system, BlinkMacSystemFont, SF Pro
- Size: xs(12px), sm(14px), base(16px), lg(18px), xl(20px), 2xl(24px), 3xl(30px)
- Weight: light(300), regular(400), medium(500), semibold(600), bold(700)

## 간격
8px 그리드: 0(0), 1(4px), 2(8px), 3(12px), 4(16px), 6(24px), 8(32px), 12(48px)

## 효과
### Glow
```css
box-shadow: 0 0 20px rgba(50, 215, 75, 0.5);
```

### Button Shadow
```css
box-shadow: 0 0 15px rgba(50, 215, 75, 0.4);
```

## 컴포넌트 패턴
- 입력필드: dark.surfaceSecondary 배경, 1px 테두리
- 버튼: 그라디언트 배경, 네온 글로우
- 포커스: 3px 네온 그린 outline + 박스 섀도우 (접근성 WCAG 2.1 AA 준수)

## 접근성 (Accessibility)
### 포커스 시스템
- **기본 포커스**: 3px solid #32D74B outline, 2px offset
- **다크모드**: 추가 boxShadow rgba(50, 215, 75, 0.2)
- **라이트모드**: 추가 boxShadow rgba(50, 215, 75, 0.15)
- **트랜지션**: outline 0.2s ease, box-shadow 0.2s ease

### ARIA 지원
- 모든 인터랙티브 컴포넌트에 적절한 ARIA 속성
- 스크린 리더 최적화 (아이콘 aria-hidden 처리)
- 에러/성공 메시지 role="alert" / role="status"

### 키보드 네비게이션
- Tab/Shift+Tab: 포커스 이동
- Enter/Space: 활성화
- 모든 인터랙티브 요소 키보드 접근 가능

자세한 내용: [ACCESSIBILITY.md](./ACCESSIBILITY.md)

## 사용법
```typescript
import { colors, typography, spacing } from '@/lib/design-system';
const isDark = theme === 'dark';
background: isDark ? colors.dark.background : colors.light.background;
```