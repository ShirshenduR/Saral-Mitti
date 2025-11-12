'use client';

interface AnalysisResult {
  disease: string;
  confidence: number;
  description?: string;
  suggested_actions?: string[];
  error?: string;
}

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  if (result.error) {
    return (
      <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-xl font-semibold text-red-800 mb-2">Analysis Error</h3>
        <p className="text-red-600">{result.error}</p>
      </div>
    );
  }

  const confidencePercentage = (result.confidence * 100).toFixed(2);
  const confidenceColor = result.confidence >= 0.8 ? 'text-green-600' : result.confidence >= 0.5 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Analysis Results</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 uppercase">Disease Detected</h4>
          <p className="text-xl font-semibold text-gray-900 mt-1">{result.disease}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 uppercase">Confidence</h4>
          <div className="flex items-center mt-1">
            <p className={`text-xl font-semibold ${confidenceColor}`}>
              {confidencePercentage}%
            </p>
            <div className="ml-4 flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    result.confidence >= 0.8 ? 'bg-green-600' : result.confidence >= 0.5 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${confidencePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {result.description && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase">Description</h4>
            <p className="text-gray-700 mt-1">{result.description}</p>
          </div>
        )}

        {result.suggested_actions && result.suggested_actions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Suggested Actions</h4>
            <ul className="list-disc list-inside space-y-1">
              {result.suggested_actions.map((action, index) => (
                <li key={index} className="text-gray-700">
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
