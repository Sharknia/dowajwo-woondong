'use client';

import { useState } from 'react';
import { createSampleWorkoutData } from '@/lib/workout-types';

export default function WorkoutRecommendation() {
  const [recommendation, setRecommendation] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendation = async () => {
    setLoading(true);
    setError('');

    try {
      // Use sample data for testing
      const sampleData = createSampleWorkoutData();

      const response = await fetch('/api/workout/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleData),
      });

      const result = await response.json();

      if (result.success) {
        setRecommendation(result.recommendation || '');
        setFeedback(result.feedback || '');
      } else {
        setError(result.error || 'Failed to get recommendation');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI 운동 트레이너</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <button
          onClick={fetchRecommendation}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '추천 생성 중...' : '운동 추천 받기'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {recommendation && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">오늘의 운동 추천</h2>
          <div className="whitespace-pre-wrap text-gray-700">{recommendation}</div>
        </div>
      )}

      {feedback && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">AI 피드백</h2>
          <div className="whitespace-pre-wrap text-gray-700">{feedback}</div>
        </div>
      )}
    </div>
  );
}