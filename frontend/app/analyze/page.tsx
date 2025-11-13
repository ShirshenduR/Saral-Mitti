'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CaptureAndAnalyze from '../../CaptureAndAnalyze';
import { isAuthenticated, getUser, logout } from '../../auth';
import { Loader2 } from 'lucide-react';

export default function AnalyzePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const userData = getUser();
    setUser(userData);
    setLoading(false);
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  return <CaptureAndAnalyze onLogout={handleLogout} />;
}
