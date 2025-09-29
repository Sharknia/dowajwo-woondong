/**
 * AI 트레이너 서비스
 * Google Gemini API를 사용한 운동 추천 및 피드백 생성
 */

import { GoogleGenAI } from '@google/genai';
import { WorkoutData, validateWorkoutData } from './workout-types';

// AI 트레이너 설정
export interface AITrainerConfig {
  apiKey?: string;
  model?: 'gemini-2.0-flash-exp' | 'gemini-1.5-pro';
  maxRetries?: number;
  timeout?: number;
}

// AI 응답 타입
export interface TrainerResponse {
  recommendation: string;
  feedback: string;
  success: boolean;
  error?: string;
}

// 피트니스 트레이너 시스템 프롬프트
const FITNESS_TRAINER_PROMPT = `## 역할(Role)
당신은 사용자의 운동 기록 데이터를 분석하여 오늘의 운동 루틴을 추천하는 전문 AI 퍼스널 트레이너입니다. 당신의 목표는 과학적인 훈련 원칙에 기반하여 안전하고 효과적인 운동 계획을 제공하는 것입니다.

## 주요 원칙(Core Principles)
1. **점진적 과부하(Progressive Overload):** 사용자가 이전에 성공적으로 수행한 기록(무게, 횟수)을 바탕으로 약간의 증량을 제안하십시오. 만약 직전 세션에서 목표 횟수를 모두 채웠다면 무게를, 그렇지 않다면 횟수를 늘리는 것을 우선으로 고려하십시오.
2. **피로도 관리 및 회복(Fatigue Management & Recovery):** 어제 훈련한 주동근(주요 근육 부위)은 오늘 휴식하도록 계획하십시오. 지난 7일간의 기록을 통해 특정 부위가 과도하게 사용되지 않았는지 확인하고, 균형 잡힌 분할 계획을 제안하십시오.
3. **데이터 기반 분석(Data-Driven Analysis):** 제공된 JSON 데이터에만 근거하여 추천을 생성하십시오. 데이터에 없는 운동을 임의로 추가하지 마십시오.

## 출력 형식(Output Format)
반드시 아래 형식에 맞춰 간결하고 명확하게 답변해야 합니다.
1. **[오늘의 추천 운동]**
   - **운동명 1:** 추천 무게(kg) x 목표 횟수 x 세트 수
   - **운동명 2:** 추천 무게(kg) x 목표 횟수 x 세트 수
   - ...
2. **[추천 근거]**
   - 오늘 이 운동 루틴을 추천하는 이유를 위에서 언급된 '주요 원칙'에 기반하여 1~2문장으로 간략하게 설명하십시오.
3. **[준비 및 마무리 운동]**
   - **준비 운동:** (간단한 스트레칭 또는 웜업 세트 제안)
   - **마무리 운동:** (간단한 쿨다운 스트레칭 제안)`;

/**
 * AI 트레이너 서비스 클래스
 */
export class AITrainer {
  private ai: GoogleGenAI;
  private model: string;
  private maxRetries: number;
  private timeout: number;

  constructor(config: AITrainerConfig = {}) {
    const apiKey = config.apiKey || process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) {
      throw new Error('Google API Key가 필요합니다. 환경변수 GOOGLE_API_KEY 또는 NEXT_PUBLIC_GOOGLE_API_KEY를 설정해주세요.');
    }

    this.ai = new GoogleGenAI({ apiKey });
    this.model = config.model || 'gemini-2.0-flash-exp';
    this.maxRetries = config.maxRetries || 3;
    this.timeout = config.timeout || 30000;
  }

  /**
   * 운동 데이터를 분석하여 다음 운동 스케줄 추천
   */
  async getWorkoutRecommendation(workoutData: WorkoutData): Promise<TrainerResponse> {
    // 데이터 유효성 검증
    if (!validateWorkoutData(workoutData)) {
      return {
        recommendation: '',
        feedback: '',
        success: false,
        error: '유효하지 않은 운동 데이터 형식입니다.'
      };
    }

    try {
      const prompt = `${FITNESS_TRAINER_PROMPT}\n\n## 사용자의 운동 데이터:\n${JSON.stringify(workoutData, null, 2)}\n\n위 데이터를 분석하여 오늘의 운동을 추천해주세요.`;

      const result = await this.callGeminiAPI(prompt);

      // 응답을 추천과 피드백으로 분리
      const sections = result.split(/\[추천 근거\]|\[준비 및 마무리 운동\]/);
      const recommendation = sections[0] || '';
      const feedback = sections[1] ? `[추천 근거]${sections[1]}` : '';

      return {
        recommendation: recommendation.trim(),
        feedback: feedback.trim(),
        success: true
      };
    } catch (error) {
      return {
        recommendation: '',
        feedback: '',
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      };
    }
  }

  /**
   * 오늘 운동 내용에 대한 피드백 생성
   */
  async getWorkoutFeedback(workoutData: WorkoutData, todayWorkout: string): Promise<TrainerResponse> {
    // 데이터 유효성 검증
    if (!validateWorkoutData(workoutData)) {
      return {
        recommendation: '',
        feedback: '',
        success: false,
        error: '유효하지 않은 운동 데이터 형식입니다.'
      };
    }

    try {
      const prompt = `당신은 전문 피트니스 트레이너입니다. 사용자의 과거 운동 기록과 오늘 수행한 운동을 분석하여 피드백을 제공해주세요.

## 과거 운동 기록:
${JSON.stringify(workoutData, null, 2)}

## 오늘 수행한 운동:
${todayWorkout}

다음 형식으로 피드백을 제공해주세요:

1. **[운동 수행 평가]**
   - 오늘 운동의 강도와 볼륨 평가
   - 이전 기록과 비교한 진전 사항

2. **[개선 포인트]**
   - 다음 번 운동 시 개선할 수 있는 부분
   - 주의해야 할 사항

3. **[회복 권장사항]**
   - 영양 섭취 권장사항
   - 휴식 및 회복 방법`;

      const result = await this.callGeminiAPI(prompt);

      return {
        recommendation: '',
        feedback: result.trim(),
        success: true
      };
    } catch (error) {
      return {
        recommendation: '',
        feedback: '',
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      };
    }
  }

  /**
   * Gemini API 호출 (재시도 로직 포함)
   */
  private async callGeminiAPI(prompt: string): Promise<string> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        // @google/genai 패키지는 models.generateContent API 사용
        const result = await Promise.race([
          this.ai.models.generateContent({
            model: this.model,
            contents: prompt
          }),
          this.createTimeoutPromise(this.timeout)
        ]);

        const text = result.text;

        if (!text) {
          throw new Error('빈 응답을 받았습니다.');
        }

        return text;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // 마지막 시도가 아니면 재시도 전 대기
        if (attempt < this.maxRetries) {
          await this.sleep(Math.pow(2, attempt - 1) * 1000); // 지수 백오프
        }
      }
    }

    throw lastError || new Error('API 호출에 실패했습니다.');
  }

  /**
   * 타임아웃 Promise 생성
   */
  private createTimeoutPromise(timeout: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`요청 시간이 초과되었습니다. (${timeout}ms)`));
      }, timeout);
    });
  }

  /**
   * 대기 함수
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * 간편한 함수형 API
 */
export async function getWorkoutRecommendation(
  workoutData: WorkoutData,
  config?: AITrainerConfig
): Promise<TrainerResponse> {
  const trainer = new AITrainer(config);
  return trainer.getWorkoutRecommendation(workoutData);
}

export async function getWorkoutFeedback(
  workoutData: WorkoutData,
  todayWorkout: string,
  config?: AITrainerConfig
): Promise<TrainerResponse> {
  const trainer = new AITrainer(config);
  return trainer.getWorkoutFeedback(workoutData, todayWorkout);
}