# UI 컴포넌트 가이드

## 기본 UI 컴포넌트
- `Button`: variant(primary/secondary/outline/ghost), size(sm/md/lg)
- `Input`: label, error, success, hint, leftIcon, rightIcon
- `Checkbox`: label, size(sm/md/lg)
- `Card`: padding(sm/md/lg/xl), variant(default/elevated/outlined)
- `Form/FormGroup/FormRow`: gap 설정, 레이아웃 관리
- `Divider`: text, orientation(horizontal/vertical)
- `Logo`: size, animated, title, subtitle
- `AuthLayout`: 인증 페이지 레이아웃, maxWidth=420px 기본
- `NavigationBar`: 하단 고정 네비게이션, SVG 아이콘, 활성 상태 표시

## 운동 관련 컴포넌트
- `SetCard`: 세트 정보 (80kg × 12회), 알약형 디자인
- `ExerciseCard`: 운동 종목 + 세트 리스트, 구분선 레이아웃
- `WorkoutSessionCard`: 날짜별 운동 묶음, 통계 포함
- `WorkoutStartCard`: 운동 시작 버튼 카드

## 핵심 사용법

```typescript
// 필수: ThemeProvider로 감싸기
<ThemeProvider>
  <AuthLayout>
    <Logo subtitle="환영합니다" />
    <Form onSubmit={handleSubmit}>
      <Input label="이메일" type="email" error={errors.email} />
      <Input label="비밀번호" type="password" rightIcon={<EyeIcon />} />
      <Checkbox label="자동 로그인" />
      <Button type="submit" variant="primary" fullWidth>로그인</Button>
    </Form>
  </AuthLayout>
</ThemeProvider>
```

## 디자인 시스템
- **색상**: 네온그린(#32D74B), 다크/라이트 모드 자동 대응
- **간격**: spacing[0-12] (0px-48px)
- **타이포**: xs(12px)-3xl(30px)
- **그림자**: shadows.dark/light (sm/md/lg/xl)

## 주요 Props

### Button
- `variant`: primary(네온그린)/secondary/outline/ghost
- `isLoading`: 로딩 상태 표시
- `fullWidth`: 100% 너비

### Input
- `error/success/hint`: 상태 메시지
- `rightIcon/onRightIconClick`: 아이콘 액션

### AuthLayout
- 모든 인증 페이지 420px 통일
- 중앙 정렬, Card 포함

### NavigationBar
- `items`: NavigationItem[] (id, label, icon, href)
- `activeItem`: 활성 아이템 id
- `onItemClick`: 클릭 핸들러
- SVG 아이콘: home, dumbbell, chart, user

## 운동 컴포넌트 상세

### SetCard
**경로**: `components/workout/SetCard.tsx`
**용도**: 개별 세트 정보 표시
```typescript
<SetCard set={{weight: 80, reps: 12}} setNumber={1} />
```
- 알약형 디자인 (borderRadius.full)
- 네온 그린 테두리 + 반투명 배경
- `80kg × 12회` 형태로 표시

### ExerciseCard
**경로**: `components/workout/ExerciseCard.tsx`
**용도**: 운동 종목 + 세트 리스트
```typescript
<ExerciseCard
  exercise={{
    id: 'ex1',
    name: '벤치 프레스',
    sets: [...]
  }}
/>
```
- 카드 배경 없음 (구분선만 사용)
- 세트들을 가로 나열 (flexWrap)
- 공간 효율적 디자인

### WorkoutSessionCard
**경로**: `components/workout/WorkoutSessionCard.tsx`
**용도**: 날짜별 운동 묶음
```typescript
<WorkoutSessionCard
  session={{
    id: '1',
    date: '2024-09-15',
    totalDuration: 45,
    exercises: [...]
  }}
/>
```
- 헤더: 날짜 + 통계 (운동 개수, 세트 수, 시간)
- 여러 ExerciseCard 포함
- 하나의 Card로 전체 감싸기

### WorkoutStartCard
**경로**: `components/workout/WorkoutStartCard.tsx`
**용도**: 운동 시작 버튼 카드
```typescript
<WorkoutStartCard onStartWorkout={handleStart} />
```
- 아이콘, 제목, 설명, 버튼 포함
- Card variant="elevated"

## 운동 데이터 구조
**경로**: `types/workout.ts`
```typescript
WorkoutSession (세션)
  └─ Exercise (운동 종목)
      └─ WorkoutSet (세트)
```
- `WorkoutSet`: weight, reps, completed
- `Exercise`: name, sets[]
- `WorkoutSession`: date, exercises[], totalDuration