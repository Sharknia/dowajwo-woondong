# UI 컴포넌트 가이드

## 컴포넌트 목록
- `Button`: variant(primary/secondary/outline/ghost), size(sm/md/lg)
- `Input`: label, error, success, hint, leftIcon, rightIcon
- `Checkbox`: label, size(sm/md/lg)
- `Card`: padding(sm/md/lg/xl), variant(default/elevated/outlined)
- `Form/FormGroup/FormRow`: gap 설정, 레이아웃 관리
- `Divider`: text, orientation(horizontal/vertical)
- `Logo`: size, animated, title, subtitle
- `AuthLayout`: 인증 페이지 레이아웃, maxWidth=420px 기본

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