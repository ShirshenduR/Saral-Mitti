'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CaptureAndAnalyze from '../../CaptureAndAnalyze';
import FarmerQuestionnaire, { FarmerContext } from '../../FarmerQuestionnaire';
import { isAuthenticated, getUser, logout } from '../../auth';
import { Loader2 } from 'lucide-react';

const QUESTIONNAIRE_STORAGE_KEY = 'saral-mitti-farmer-context';

export default function AnalyzePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [farmerContext, setFarmerContext] = useState<FarmerContext | null>(null);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const userData = getUser();
    setUser(userData);

    // Check if questionnaire has been completed
    const savedContext = localStorage.getItem(QUESTIONNAIRE_STORAGE_KEY);
    if (savedContext) {
      setFarmerContext(JSON.parse(savedContext));
      setShowQuestionnaire(false);
    } else {
      // First time user - show questionnaire
      setShowQuestionnaire(true);
    }

    setLoading(false);
  }, [router]);

  const handleQuestionnaireComplete = (context: FarmerContext) => {
    // Save context to localStorage
    localStorage.setItem(QUESTIONNAIRE_STORAGE_KEY, JSON.stringify(context));
    setFarmerContext(context);
    setShowQuestionnaire(false);
  };

  const handleQuestionnaireSkip = () => {
    setShowQuestionnaire(false);
  };

  const handleLogout = async () => {
    await logout();
    // Optionally clear questionnaire data on logout
    localStorage.removeItem(QUESTIONNAIRE_STORAGE_KEY);
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  if (showQuestionnaire) {
    return (
      <FarmerQuestionnaire
        onComplete={handleQuestionnaireComplete}
        onSkip={handleQuestionnaireSkip}
        language="en" // TODO: Get from user preferences
      />
    );
  }

  return <CaptureAndAnalyze onLogout={handleLogout} farmerContext={farmerContext} />;
}
