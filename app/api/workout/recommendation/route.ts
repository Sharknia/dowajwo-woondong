import { NextRequest, NextResponse } from 'next/server';
import { getWorkoutRecommendation } from '@/lib/ai-trainer';
import type { WorkoutData } from '@/lib/workout-types';

export async function POST(request: NextRequest) {
  try {
    const workoutData: WorkoutData = await request.json();
    const response = await getWorkoutRecommendation(workoutData);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating workout recommendation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate workout recommendation'
      },
      { status: 500 }
    );
  }
}