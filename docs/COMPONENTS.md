# UI 컴포넌트

## 기본 UI

| 컴포넌트 | Props | 설명 |
|---------|-------|------|
| **Button** | variant(primary/secondary/outline/ghost), size(sm/md/lg), isLoading, fullWidth | ARIA: aria-busy, aria-disabled |
| **Input** | label, error, success, hint, size(sm/md/lg), leftIcon, rightIcon, onRightIconClick | ARIA: aria-invalid, aria-describedby |
| **Select** | label, error, hint, size(sm/md/lg), options, fullWidth | ARIA: aria-invalid, aria-describedby |
| **Textarea** | label, error, hint, size(sm/md/lg), resize(none/vertical/horizontal/both), fullWidth | ARIA: aria-invalid, aria-describedby |
| **Checkbox** | label, size(sm/md/lg), error | ARIA: aria-invalid |
| **Radio** | label, size(sm/md/lg), error | ARIA: aria-invalid (개별 라디오) |
| **RadioGroup** | label, options, value, onChange, name, error, hint, size(sm/md/lg), orientation(horizontal/vertical) | ARIA: role="radiogroup" |
| **Card** | padding(sm/md/lg/xl), variant(default/elevated/outlined), onClick | 클릭 시 role="button" |
| **Form/FormGroup/FormRow** | gap, children | 레이아웃 관리 |
| **Divider** | text, orientation(horizontal/vertical) | 구분선 |
| **Logo** | size, animated, title, subtitle | 브랜드 |
| **AuthLayout** | maxWidth(420px 기본) | 인증 페이지 레이아웃 |
| **NavigationBar** | items, activeItem, onItemClick | 하단 고정, SVG 아이콘 |

## 운동 컴포넌트

### 디스플레이 컴포넌트
| 컴포넌트 | 용도 | 특징 |
|---------|------|------|
| **SetCard** | 세트 정보 (80kg × 12회) | 알약형, 네온 테두리 |
| **ExerciseCard** | 운동 종목 + 세트 리스트 | 구분선, flexWrap |
| **WorkoutSessionCard** | 날짜별 운동 묶음 | 통계 포함, 수정/삭제 |
| **WorkoutStartCard** | 운동 시작 CTA | elevated Card |

### 입력 컴포넌트
| 컴포넌트 | Props | 용도 |
|---------|-------|------|
| **SetInput** | setNumber, set, onUpdate, onDelete | 세트별 무게/횟수/완료 입력 |
| **ExerciseInput** | exercise, onUpdate, onDelete | 운동 종목 + 세트 관리 |

## 사용 예제

### 기본 UI
```typescript
import { Button, Input, Select, Textarea, RadioGroup, Card } from '@/components/ui';

<Card padding="lg" variant="elevated">
  <Input
    label="이메일"
    type="email"
    size="md"
    leftIcon={<Icon />}
  />
  <Select
    label="부위"
    options={[
      { value: 'CHEST', label: '가슴' },
      { value: 'BACK', label: '등' }
    ]}
  />
  <RadioGroup
    label="무게 단위"
    name="weightUnit"
    value={selectedUnit}
    onChange={(value) => setSelectedUnit(value)}
    options={[
      { value: 'kg', label: 'kg' },
      { value: 'lbs', label: 'lbs' }
    ]}
    orientation="horizontal"
  />
  <Textarea
    label="메모"
    placeholder="설명 입력"
    resize="vertical"
  />
  <Button variant="primary" fullWidth>저장</Button>
</Card>
```

### 운동 입력
```typescript
import { SetInput, ExerciseInput } from '@/components/workout';

// 세트 입력
<SetInput
  setNumber={1}
  set={{ id: '1', weight: 80, reps: 12, completed: false }}
  onUpdate={(updates) => handleUpdate(updates)}
  onDelete={() => handleDelete()}
/>

// 운동 입력
<ExerciseInput
  exercise={{
    id: 'ex1',
    name: '벤치프레스',
    sets: [{ id: 's1', weight: 80, reps: 12, completed: false }],
    isEditing: false
  }}
  onUpdate={(id, updates) => handleUpdate(id, updates)}
  onDelete={(id) => handleDelete(id)}
/>
```

## 데이터 구조

```typescript
// types/workout.ts
interface WorkoutSet {
  id: string;
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
  date: string; // YYYY-MM-DD
  exercises: Exercise[];
  totalDuration?: number;
  notes?: string;
}

// 입력 폼용 타입
interface SetFormData extends WorkoutSet {}

interface ExerciseFormData extends Exercise {
  isEditing: boolean;
}
```

## 페이지

| 페이지 | 경로 | 기능 |
|-------|------|------|
| **홈** | `/` | 운동 시작, 최근 기록 |
| **캘린더** | `/calendar` | 날짜별 운동 조회/추가 |
| **운동 편집** | `/workout/edit` | 운동 입력/수정 |
| **프로필** | `/profile` | 사용자 정보 |
| **분석** | `/analytics` | 운동 통계 |

## API 유틸리티

```typescript
// lib/api/workout.ts (localStorage 기반)
createWorkoutSession(data): Promise<WorkoutSession>
updateWorkoutSession(id, data): Promise<WorkoutSession>
deleteWorkoutSession(id): Promise<void>
getWorkoutSession(id): Promise<WorkoutSession | null>
getAllWorkoutSessions(): Promise<WorkoutSession[]>
```

## 접근성

- ✅ 포커스: 3px outline + 박스 섀도우
- ✅ ARIA: 모든 인터랙티브 요소
- ✅ 키보드: Tab/Enter/Space
- ✅ 대비율: 4.5:1+

**최종 업데이트**: 2025-10-06 (Select, Textarea, Radio, RadioGroup 컴포넌트 추가)