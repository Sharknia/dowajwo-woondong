# UI 컴포넌트

## 기본 UI

| 컴포넌트 | Props | 설명 |
|---------|-------|------|
| **Button** | variant(primary/secondary/outline/ghost), size(sm/md/lg), isLoading, fullWidth | ARIA: aria-busy, aria-disabled |
| **Input** | label, error, success, hint, leftIcon, rightIcon, onRightIconClick | ARIA: aria-invalid, aria-describedby |
| **Checkbox** | label, size(sm/md/lg), error | ARIA: aria-invalid |
| **Card** | padding(sm/md/lg/xl), variant(default/elevated/outlined), onClick | 클릭 시 role="button" |
| **Form/FormGroup/FormRow** | gap, children | 레이아웃 관리 |
| **Divider** | text, orientation(horizontal/vertical) | 구분선 |
| **Logo** | size, animated, title, subtitle | 브랜드 |
| **AuthLayout** | maxWidth(420px 기본) | 인증 페이지 레이아웃 |
| **NavigationBar** | items, activeItem, onItemClick | 하단 고정, SVG 아이콘 |

## 운동 컴포넌트

| 컴포넌트 | 용도 | 특징 |
|---------|------|------|
| **SetCard** | 세트 정보 (80kg × 12회) | 알약형, 네온 테두리 |
| **ExerciseCard** | 운동 종목 + 세트 리스트 | 구분선, flexWrap |
| **WorkoutSessionCard** | 날짜별 운동 묶음 | 통계 포함 |
| **WorkoutStartCard** | 운동 시작 CTA | elevated Card |

## 사용 예제

```typescript
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Button, Input, Checkbox, Card } from '@/components/ui';

<ThemeProvider>
  <Card padding="lg" variant="elevated">
    <Input
      label="이메일"
      type="email"
      error={errors.email}
      leftIcon={<Icon />}
    />
    <Input
      label="비밀번호"
      type="password"
      rightIcon={<EyeIcon />}
      onRightIconClick={togglePasswordVisibility}
    />
    <Checkbox label="자동 로그인" />
    <Button variant="primary" fullWidth isLoading={loading}>
      로그인
    </Button>
  </Card>
</ThemeProvider>
```

## 운동 데이터 구조

```typescript
WorkoutSession
  └─ Exercise
      └─ WorkoutSet

// types/workout.ts
interface WorkoutSet {
  weight: number;
  reps: number;
  completed: boolean;
}

interface Exercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

interface WorkoutSession {
  id: string;
  date: string;
  totalDuration: number;
  exercises: Exercise[];
}
```

## 접근성 (WCAG 2.1 AA)

- ✅ 포커스: 3px outline + 박스 섀도우
- ✅ ARIA: 모든 인터랙티브 요소
- ✅ 키보드: Tab/Enter/Space
- ✅ 대비율: 4.5:1+

상세: ACCESSIBILITY.md

**최종 업데이트**: 2025-10-01