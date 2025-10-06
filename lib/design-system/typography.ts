/**
 * Typography system for Dowajwo-Woondong
 * 모바일 웹앱 최적화 타이포그래피 시스템
 * - 애플워치 운동 앱 스타일
 * - 모바일 우선 설계
 * - 프리셋 기반 일관성 확보
 */

import { CSSProperties } from 'react';

export const typography = {
  // 폰트 패밀리
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'SF Mono, Monaco, "Courier New", monospace',
  },

  // 폰트 크기 (모바일 최적화 7단계)
  fontSize: {
    display: '2rem', // 32px - 앱 메인 타이틀
    h1: '1.5rem', // 24px - 페이지 제목
    h2: '1.25rem', // 20px - 섹션 제목
    h3: '1.125rem', // 18px - 서브섹션
    body: '1rem', // 16px - 본문 (기본)
    caption: '0.875rem', // 14px - 보조 텍스트
    small: '0.75rem', // 12px - 미세 텍스트
  },

  // 폰트 무게 (실용적 4단계)
  fontWeight: {
    regular: 400, // 본문, 일반 텍스트
    medium: 500, // 약한 강조, 라벨
    semibold: 600, // 제목, 버튼, 중요 정보
    bold: 700, // 강한 강조, 숫자 데이터
  },

  // 행간 (용도별 명확화)
  lineHeight: {
    tight: 1.2, // 큰 제목용
    snug: 1.4, // 중간 제목용
    normal: 1.5, // 본문용
    relaxed: 1.6, // 긴 본문용
  },

  // 자간 (한글 친화적 3단계)
  letterSpacing: {
    tight: '-0.01em', // 큰 제목용
    normal: '0', // 기본
    wide: '0.02em', // 작은 텍스트, 대문자용
  },

  // 프리셋: 사전 정의된 타이포그래피 스타일 조합
  presets: {
    display: {
      fontSize: '2rem', // 32px
      fontWeight: 600, // semibold
      lineHeight: 1.2, // tight
      letterSpacing: '-0.01em', // tight
    },
    h1: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600, // semibold
      lineHeight: 1.2, // tight
      letterSpacing: '-0.01em', // tight
    },
    h2: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600, // semibold
      lineHeight: 1.4, // snug
      letterSpacing: '0', // normal
    },
    h3: {
      fontSize: '1.125rem', // 18px
      fontWeight: 600, // semibold
      lineHeight: 1.4, // snug
      letterSpacing: '0', // normal
    },
    body: {
      fontSize: '1rem', // 16px
      fontWeight: 400, // regular
      lineHeight: 1.5, // normal
      letterSpacing: '0', // normal
    },
    bodyBold: {
      fontSize: '1rem', // 16px
      fontWeight: 600, // semibold
      lineHeight: 1.5, // normal
      letterSpacing: '0', // normal
    },
    caption: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400, // regular
      lineHeight: 1.4, // snug
      letterSpacing: '0', // normal
    },
    captionBold: {
      fontSize: '0.875rem', // 14px
      fontWeight: 600, // semibold
      lineHeight: 1.4, // snug
      letterSpacing: '0', // normal
    },
    small: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400, // regular
      lineHeight: 1.4, // snug
      letterSpacing: '0.02em', // wide
    },
    button: {
      fontSize: '1rem', // 16px
      fontWeight: 600, // semibold
      lineHeight: 1.5, // normal
      letterSpacing: '0', // normal
    },
    label: {
      fontSize: '1rem', // 16px
      fontWeight: 500, // medium
      lineHeight: 1.4, // snug
      letterSpacing: '0', // normal
    },
  },
};

/**
 * 타이포그래피 프리셋 스타일을 가져오는 유틸리티 함수
 * @param preset - 사용할 프리셋 이름
 * @returns CSSProperties 객체
 *
 * @example
 * ```tsx
 * <h1 style={getTypographyStyle('h1')}>페이지 제목</h1>
 * ```
 */
export function getTypographyStyle(preset: keyof typeof typography.presets): CSSProperties {
  return {
    fontFamily: typography.fontFamily.sans,
    ...typography.presets[preset],
  };
}

/**
 * 반응형 base font-size 설정 (향후 확장용)
 *
 * 사용법: globals.css에 추가
 * ```css
 * html {
 *   font-size: 16px; // 모바일 기본
 * }
 *
 * @media (min-width: 768px) {
 *   html {
 *     font-size: 18px; // 태블릿 이상
 *   }
 * }
 * ```
 */
export const responsiveBaseSizes = {
  mobile: '16px',
  tablet: '18px',
};

export type Typography = typeof typography;
export type TypographyPreset = keyof typeof typography.presets;