# 🎨 UI 컴포넌트 가이드

Dowajwo-Woondong 프로젝트의 공용 UI 컴포넌트 문서입니다.

## 📋 목차

1. [개요](#개요)
2. [설치 및 사용](#설치-및-사용)
3. [컴포넌트 목록](#컴포넌트-목록)
4. [컴포넌트 상세](#컴포넌트-상세)
5. [디자인 원칙](#디자인-원칙)
6. [사용 예제](#사용-예제)

## 🌟 개요

이 프로젝트는 애플워치 운동 앱 스타일의 일관된 디자인 시스템을 제공하는 재사용 가능한 UI 컴포넌트들을 포함합니다.

### 주요 특징

- ✨ **통일된 디자인**: 모든 컴포넌트가 일관된 디자인 언어 사용
- 🌙 **다크모드 지원**: 모든 컴포넌트가 다크/라이트 모드 자동 대응
- 🎯 **접근성**: WCAG 2.1 준수를 위한 적절한 ARIA 속성
- 📱 **반응형**: 모든 기기에서 완벽한 동작
- 🚀 **성능 최적화**: 불필요한 리렌더링 방지
- 💚 **네온 그린 테마**: 애플워치 스타일의 활기찬 색상

## 🔧 설치 및 사용

### 기본 사용법

```typescript
import { Button, Input, Card } from '@/components/ui';

function MyComponent() {
  return (
    <Card>
      <Input label="이메일" type="email" />
      <Button variant="primary">로그인</Button>
    </Card>
  );
}
```

### ThemeProvider 필수

모든 UI 컴포넌트는 ThemeContext를 사용하므로 반드시 ThemeProvider로 감싸야 합니다:

```typescript
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      {/* 여기에 UI 컴포넌트 사용 */}
    </ThemeProvider>
  );
}
```

## 📦 컴포넌트 목록

| 컴포넌트 | 용도 | 상태 |
|---------|------|------|
| `Button` | 클릭 가능한 버튼 | ✅ 완료 |
| `Input` | 텍스트 입력 필드 | ✅ 완료 |
| `Checkbox` | 체크박스 입력 | ✅ 완료 |
| `Card` | 컨텐츠 컨테이너 | ✅ 완료 |
| `Form` | 폼 레이아웃 | ✅ 완료 |
| `Divider` | 구분선 | ✅ 완료 |
| `Logo` | 로고 컴포넌트 | ✅ 완료 |

## 📚 컴포넌트 상세

### Button

다양한 스타일과 크기를 지원하는 버튼 컴포넌트

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | 버튼 스타일 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 버튼 크기 |
| `fullWidth` | `boolean` | `false` | 전체 너비 사용 |
| `isLoading` | `boolean` | `false` | 로딩 상태 |
| `leftIcon` | `ReactNode` | - | 왼쪽 아이콘 |
| `rightIcon` | `ReactNode` | - | 오른쪽 아이콘 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |

#### 사용 예제

```typescript
// Primary 버튼
<Button variant="primary" size="lg">
  확인
</Button>

// Outline 버튼 with 로딩
<Button variant="outline" isLoading>
  처리 중...
</Button>

// 전체 너비 버튼
<Button fullWidth>
  전체 너비 버튼
</Button>
```

### Input

다양한 타입과 상태를 지원하는 입력 필드

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `label` | `string` | - | 입력 필드 라벨 |
| `error` | `string` | - | 에러 메시지 |
| `success` | `string` | - | 성공 메시지 |
| `hint` | `string` | - | 힌트 메시지 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 입력 필드 크기 |
| `fullWidth` | `boolean` | `true` | 전체 너비 사용 |
| `leftIcon` | `ReactNode` | - | 왼쪽 아이콘 |
| `rightIcon` | `ReactNode` | - | 오른쪽 아이콘 |
| `onRightIconClick` | `() => void` | - | 오른쪽 아이콘 클릭 핸들러 |

#### 사용 예제

```typescript
// 기본 입력 필드
<Input
  label="이메일"
  type="email"
  placeholder="example@email.com"
/>

// 에러 상태
<Input
  label="비밀번호"
  type="password"
  error="비밀번호는 8자 이상이어야 합니다"
/>

// 성공 상태
<Input
  label="닉네임"
  success="사용 가능한 닉네임입니다"
/>

// 아이콘과 함께
<Input
  label="비밀번호"
  type="password"
  rightIcon={<EyeIcon />}
  onRightIconClick={togglePasswordVisibility}
/>
```

### Checkbox

체크박스 입력 컴포넌트

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `label` | `string` | - | 체크박스 라벨 |
| `error` | `string` | - | 에러 메시지 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 체크박스 크기 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |

#### 사용 예제

```typescript
<Checkbox
  label="자동 로그인"
  checked={rememberMe}
  onChange={(e) => setRememberMe(e.target.checked)}
/>
```

### Card

컨텐츠를 담는 카드 컨테이너

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `padding` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | 내부 패딩 |
| `variant` | `'default' \| 'elevated' \| 'outlined'` | `'default'` | 카드 스타일 |
| `fullWidth` | `boolean` | `false` | 전체 너비 사용 |

#### 사용 예제

```typescript
<Card variant="elevated" padding="xl">
  <h2>제목</h2>
  <p>카드 내용이 여기에 들어갑니다.</p>
</Card>
```

### Form, FormGroup, FormRow

폼 레이아웃을 위한 컴포넌트들

#### Form Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `gap` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 요소 간 간격 |

#### FormRow Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `gap` | `'sm' \| 'md' \| 'lg'` | `'md'` | 요소 간 간격 |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | 수직 정렬 |

#### 사용 예제

```typescript
<Form onSubmit={handleSubmit}>
  <FormGroup>
    <Input label="이름" />
    <Input label="이메일" type="email" />
  </FormGroup>

  <FormRow>
    <Input label="시" />
    <Input label="구" />
  </FormRow>

  <Button type="submit" fullWidth>
    제출
  </Button>
</Form>
```

### Divider

섹션을 구분하는 구분선

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `text` | `string` | - | 구분선 중앙 텍스트 |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 구분선 방향 |
| `margin` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 상하 마진 |

#### 사용 예제

```typescript
// 기본 구분선
<Divider />

// 텍스트가 있는 구분선
<Divider text="또는" />

// 수직 구분선
<Divider orientation="vertical" />
```

### Logo

애니메이션이 있는 로고 컴포넌트

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 로고 크기 |
| `animated` | `boolean` | `true` | 애니메이션 활성화 |
| `showText` | `boolean` | `true` | 텍스트 표시 |
| `title` | `string` | `'Dowajwo-Woondong'` | 타이틀 텍스트 |
| `subtitle` | `string` | - | 서브타이틀 텍스트 |

#### 사용 예제

```typescript
// 기본 로고
<Logo />

// 큰 크기 로고 with 서브타이틀
<Logo
  size="lg"
  subtitle="AI 운동 트레이너"
/>

// 아이콘만 표시
<Logo showText={false} />
```

## 🎨 디자인 원칙

### 색상 팔레트

- **Primary**: 네온 그린 (#32D74B) - 주요 액션, 강조
- **Secondary**: 다크/라이트 모드 적응형 회색
- **Error**: 빨간색 (#FF3B30)
- **Success**: 녹색 (#34C759)
- **Warning**: 주황색 (#FF9500)

### 간격 시스템

- `spacing[0]`: 0px
- `spacing[1]`: 4px
- `spacing[2]`: 8px
- `spacing[3]`: 12px
- `spacing[4]`: 16px
- `spacing[6]`: 24px
- `spacing[8]`: 32px
- `spacing[10]`: 40px
- `spacing[12]`: 48px

### 타이포그래피

- **Font Family**: SF Pro Display, System UI
- **Font Sizes**: xs(12px), sm(14px), base(16px), lg(18px), xl(20px), 2xl(24px), 3xl(30px)
- **Font Weights**: light(300), regular(400), medium(500), semibold(600), bold(700)

## 💡 사용 예제

### 로그인 폼 구현

```typescript
import { Card, Form, Input, Checkbox, Button, Divider, Logo } from '@/components/ui';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Card>
      <Logo subtitle="환영합니다" />

      <Form onSubmit={handleSubmit}>
        <Input
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
        />

        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Checkbox
          label="자동 로그인"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />

        <Button type="submit" fullWidth>
          로그인
        </Button>
      </Form>

      <Divider text="또는" />

      <Button variant="outline" fullWidth>
        회원가입
      </Button>
    </Card>
  );
}
```

### 회원가입 폼 구현

```typescript
import { Card, Form, FormRow, Input, Button, Logo } from '@/components/ui';

function SignUpForm() {
  return (
    <Card>
      <Logo title="회원가입" subtitle="새 계정을 만드세요" />

      <Form onSubmit={handleSubmit}>
        <Input label="닉네임" placeholder="2-20자" />

        <FormRow>
          <Input label="이메일" type="email" style={{ flex: 1 }} />
          <Button variant="outline">중복확인</Button>
        </FormRow>

        <Input
          label="비밀번호"
          type="password"
          hint="8자 이상, 대소문자와 숫자 포함"
        />

        <Input
          label="비밀번호 확인"
          type="password"
        />

        <Button type="submit" fullWidth>
          가입하기
        </Button>
      </Form>
    </Card>
  );
}
```

## 🔄 버전 히스토리

### v1.0.0 (2024-01-15)
- 초기 릴리즈
- Button, Input, Checkbox, Card, Form, Divider, Logo 컴포넌트 추가
- 다크모드 지원
- 애플워치 스타일 디자인 시스템 적용

## 📝 향후 계획

- [ ] Select 컴포넌트
- [ ] Modal 컴포넌트
- [ ] Toast/Notification 컴포넌트
- [ ] Tab 컴포넌트
- [ ] Table 컴포넌트
- [ ] DatePicker 컴포넌트
- [ ] Progress 컴포넌트
- [ ] Skeleton 로딩 컴포넌트

## 🤝 기여 가이드

새로운 컴포넌트를 추가할 때는 다음 사항을 준수해주세요:

1. **TypeScript**: 모든 Props에 타입 정의
2. **다크모드**: useTheme 훅 사용하여 다크/라이트 모드 지원
3. **접근성**: 적절한 ARIA 속성 추가
4. **문서화**: Props 설명과 사용 예제 추가
5. **일관성**: 기존 디자인 시스템 준수

## 📞 문의

UI 컴포넌트 관련 문의사항이나 버그 리포트는 이슈를 생성해주세요.