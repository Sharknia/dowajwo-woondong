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
- 포커스: 녹색 테두리 + 글로우

## 사용법
```typescript
import { colors, typography, spacing } from '@/lib/design-system';
const isDark = theme === 'dark';
background: isDark ? colors.dark.background : colors.light.background;
```