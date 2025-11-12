'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import ImageUploader from '@/components/ImageUploader';
import ResultsDisplay from '@/components/ResultsDisplay';

interface AnalysisResult {
  disease: string;
  confidence: number;
  description?: string;
  suggested_actions?: string[];
  error?: string;
}

export default function DashboardPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleResultReceived = (newResult: AnalysisResult) => {
    setResult(newResult);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Crop Disease Analysis Dashboard
            </h1>
            <p className="text-gray-600">
              Upload an image of your crop to receive an instant AI-powered disease analysis
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <ImageUploader onResultReceived={handleResultReceived} />
          </div>

          {result && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <ResultsDisplay result={result} />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
