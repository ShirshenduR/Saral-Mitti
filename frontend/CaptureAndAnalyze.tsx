// CaptureAndAnalyze.tsx
// Main UI Component for Saral Mitti Soil Analysis
// सरल मिट्टी मिट्टी विश्लेषण के लिए मुख्य UI घटक

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Upload, 
  X, 
  Check, 
  AlertCircle, 
  Loader2, 
  Sun, 
  Moon, 
  Monitor,
  ChevronRight,
  Download,
  Share2,
  RefreshCw,
  Droplet,
  TrendingUp,
  Calendar,
  LogOut
} from 'lucide-react';
import { strings, type Language } from './strings';
import { 
  uploadImage, 
  pollResult, 
  USE_MOCK,
  type UploadMetadata,
  type AnalysisResult,
  type SoilAnalysis,
  type CropRecommendation
} from './api';

// ========================================
// THEME TYPES & CONFIGURATION
// थीम प्रकार और कॉन्फ़िगरेशन
// ========================================
type Theme = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'saral-mitti-theme';

// ========================================
// THEME HOOK - थीम हुक
// ========================================
/**
 * Custom hook for theme management with system preference detection
 * सिस्टम वरीयता पहचान के साथ थीम प्रबंधन के लिए कस्टम हुक
 */
function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Read saved preference / सहेजी गई वरीयता पढ़ें
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }

    // Detect system preference / सिस्टम वरीयता का पता लगाएं
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateResolvedTheme = (themeValue: Theme = savedTheme || 'system') => {
      const isDark = themeValue === 'dark' || (themeValue === 'system' && mediaQuery.matches);
      setResolvedTheme(isDark ? 'dark' : 'light');
      
      // Apply to document / दस्तावेज़ पर लागू करें
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateResolvedTheme();

    // Listen for system preference changes / सिस्टम वरीयता परिवर्तनों को सुनें
    const listener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        updateResolvedTheme('system');
      }
    };
    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    
    // Immediately apply / तुरंत लागू करें
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = newTheme === 'dark' || (newTheme === 'system' && mediaQuery.matches);
    setResolvedTheme(isDark ? 'dark' : 'light');
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return { theme, setTheme, resolvedTheme };
}

// ========================================
// MOTION SETTINGS - मोशन सेटिंग्स
// ========================================
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
};

// Motion variants / मोशन वेरिएंट
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// ========================================
// MAIN COMPONENT - मुख्य घटक
// ========================================
interface CaptureAndAnalyzeProps {
  onLogout?: () => void;
}

export default function CaptureAndAnalyze({ onLogout }: CaptureAndAnalyzeProps = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [lang, setLang] = useState<Language>('en');
  const t = strings[lang];

  // UI State / UI स्थिति
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showMetadata, setShowMetadata] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Metadata state / मेटाडेटा स्थिति
  const [metadata, setMetadata] = useState<UploadMetadata>({});

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ========================================
  // CAMERA FUNCTIONS - कैमरा कार्य
  // ========================================
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        setCameraError(null);
      }
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError(t.errorCamera);
    }
  }, [t]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Countdown animation / काउंटडाउन एनीमेशन
    let count = 3;
    setCountdown(count);

    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(countdownInterval);
        setCountdown(null);

        // Capture / कैप्चर करें
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(imageData);
        stopCamera();
      }
    }, 1000);
  }, [stopCamera]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    setError(null);
    startCamera();
  }, [startCamera]);

  // ========================================
  // UPLOAD & ANALYSIS - अपलोड और विश्लेषण
  // ========================================
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCapturedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const startAnalysis = useCallback(async () => {
    if (!capturedImage) return;

    setUploading(true);
    setError(null);
    setStatusMessage(t.uploadPreparing);

    try {
      // Convert base64 to File / base64 को File में बदलें
      const blob = await fetch(capturedImage).then(r => r.blob());
      const file = new File([blob], 'soil-sample.jpg', { type: 'image/jpeg' });

      // Upload / अपलोड करें
      setStatusMessage(t.uploadUploading);
      const uploadResponse = await uploadImage(
        file,
        'soil',
        metadata,
        (progress) => setUploadProgress(progress)
      );

      setUploading(false);
      setProcessing(true);
      setStatusMessage(t.uploadProcessing);

      // Poll for results / परिणामों के लिए पोल करें
      const analysisResult = await pollResult(uploadResponse.id);

      setProcessing(false);
      setResult(analysisResult);
      setStatusMessage(t.uploadSuccess);

    } catch (err) {
      console.error('Analysis error:', err);
      setUploading(false);
      setProcessing(false);
      setError(err instanceof Error ? err.message : t.errorGeneric);
      setStatusMessage(t.uploadError);
    }
  }, [capturedImage, metadata, t]);

  // ========================================
  // EFFECTS - प्रभाव
  // ========================================
  useEffect(() => {
    // Check if user has seen onboarding / जांचें कि क्या उपयोगकर्ता ने ऑनबोर्डिंग देखी है
    const hasSeenOnboarding = localStorage.getItem('saral-mitti-onboarding');
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
    }

    return () => stopCamera();
  }, [stopCamera]);

  const dismissOnboarding = useCallback(() => {
    setShowOnboarding(false);
    localStorage.setItem('saral-mitti-onboarding', 'true');
    startCamera();
  }, [startCamera]);

  const resetFlow = useCallback(() => {
    setCapturedImage(null);
    setResult(null);
    setError(null);
    setMetadata({});
    setUploadProgress(0);
    setStatusMessage('');
    startCamera();
  }, [startCamera]);

  // ========================================
  // THEME TOGGLE COMPONENT - थीम टॉगल घटक
  // ========================================
  const ThemeToggle = () => {
    const [announceMessage, setAnnounceMessage] = useState('');

    const cycleTheme = () => {
      const themes: Theme[] = ['light', 'dark', 'system'];
      const currentIndex = themes.indexOf(theme);
      const nextTheme = themes[(currentIndex + 1) % themes.length];
      setTheme(nextTheme);
      
      // Announce for screen readers / स्क्रीन रीडर्स के लिए घोषणा करें
      const themeLabel = nextTheme === 'light' ? t.themeLight : 
                        nextTheme === 'dark' ? t.themeDark : t.themeSystem;
      setAnnounceMessage(`${t.themeChanged} ${themeLabel}`);
    };

    const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

    return (
      <>
        <button
          onClick={cycleTheme}
          aria-label={t.themeToggleLabel}
          aria-pressed={theme !== 'system'}
          className="p-2 rounded-lg bg-surface hover:bg-surface/80 border border-muted 
                     transition-all duration-200 hover:scale-105 focus:outline-none 
                     focus:ring-2 focus:ring-accent"
        >
          <Icon className="w-5 h-5 text-text" />
        </button>
        <div 
          role="status" 
          aria-live="polite" 
          aria-atomic="true"
          className="sr-only"
        >
          {announceMessage}
        </div>
      </>
    );
  };

  // ========================================
  // RENDER - रेंडर
  // ========================================
  const motionProps = prefersReducedMotion ? {} : fadeIn;

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-300">
      {/* Header - हेडर */}
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-muted">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-2 
                          flex items-center justify-center text-white font-bold text-lg">
              स
            </div>
            <div>
              <h1 className="text-xl font-bold">{t.appName}</h1>
              <p className="text-xs text-muted">{t.tagline}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {USE_MOCK && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full 
                            bg-accent/10 text-accent text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full 
                               rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                {t.mockModeActive}
              </div>
            )}
            
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="px-3 py-1 rounded-lg border border-muted hover:bg-surface 
                       transition-colors text-sm font-medium"
            >
              {lang === 'en' ? 'हिं' : 'EN'}
            </button>
            
            <ThemeToggle />
            
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-1 rounded-lg border border-muted 
                         hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 
                         dark:hover:border-red-700 transition-colors text-sm font-medium
                         hover:text-red-600 dark:hover:text-red-400"
                title={lang === 'en' ? 'Logout' : 'लॉग आउट'}
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">{lang === 'en' ? 'Logout' : 'लॉग आउट'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - मुख्य सामग्री */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Onboarding Modal - ऑनबोर्डिंग मोडल */}
          {showOnboarding && (
            <OnboardingModal
              t={t}
              onDismiss={dismissOnboarding}
              motionProps={motionProps}
            />
          )}

          {/* Camera View - कैमरा व्यू */}
          {!showOnboarding && !capturedImage && !result && (
            <CameraView
              t={t}
              videoRef={videoRef}
              canvasRef={canvasRef}
              cameraActive={cameraActive}
              cameraError={cameraError}
              countdown={countdown}
              onStartCamera={startCamera}
              onCapture={capturePhoto}
              onFileUpload={handleFileUpload}
              fileInputRef={fileInputRef}
              motionProps={motionProps}
            />
          )}

          {/* Preview & Metadata - पूर्वावलोकन और मेटाडेटा */}
          {capturedImage && !result && (
            <PreviewAndMetadata
              t={t}
              image={capturedImage}
              metadata={metadata}
              setMetadata={setMetadata}
              showMetadata={showMetadata}
              setShowMetadata={setShowMetadata}
              uploading={uploading}
              processing={processing}
              uploadProgress={uploadProgress}
              statusMessage={statusMessage}
              error={error}
              onRetake={retakePhoto}
              onAnalyze={startAnalysis}
              motionProps={motionProps}
            />
          )}

          {/* Results - परिणाम */}
          {result && (
            <ResultsView
              t={t}
              result={result}
              onReset={resetFlow}
              motionProps={motionProps}
            />
          )}
        </AnimatePresence>

        {/* Status Announcer for Screen Readers */}
        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {statusMessage}
        </div>
      </main>
    </div>
  );
}

// ========================================
// SUB-COMPONENTS - उप-घटक
// ========================================

// Onboarding Modal Component
function OnboardingModal({ t, onDismiss, motionProps }: any) {
  return (
    <motion.div
      {...motionProps}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        {...(motionProps.initial ? scaleIn : {})}
        className="bg-surface rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden 
                   border border-muted"
      >
        <div className="bg-gradient-to-br from-accent to-accent-2 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">{t.onboardingTitle}</h2>
          <p className="text-white/90">{t.onboardingSubtitle}</p>
        </div>

        <div className="p-8 space-y-6">
          <OnboardingStep number={1} text={t.onboardingStep1} icon="📸" />
          <OnboardingStep number={2} text={t.onboardingStep2} icon="🔬" />
          <OnboardingStep number={3} text={t.onboardingStep3} icon="🌾" />

          <div className="pt-4 text-sm text-muted flex items-start gap-2">
            <Camera className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{t.onboardingCameraPermission}</span>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onDismiss}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-2 
                       text-white font-semibold hover:shadow-lg hover:scale-105 
                       transition-all duration-200 focus:outline-none focus:ring-2 
                       focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface"
            >
              {t.onboardingGetStarted}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function OnboardingStep({ number, text, icon }: { number: number; text: string; icon: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center 
                    justify-center text-2xl">
        {icon}
      </div>
      <div className="flex-1 pt-2">
        <div className="text-sm font-medium text-accent mb-1">Step {number}</div>
        <p className="text-text">{text}</p>
      </div>
    </div>
  );
}

// Camera View Component
function CameraView({ 
  t, 
  videoRef, 
  canvasRef, 
  cameraActive, 
  cameraError, 
  countdown,
  onStartCamera, 
  onCapture, 
  onFileUpload, 
  fileInputRef,
  motionProps 
}: any) {
  return (
    <motion.div {...motionProps} className="max-w-4xl mx-auto">
      <div className="bg-surface rounded-2xl shadow-xl overflow-hidden border border-muted">
        <div className="p-6 border-b border-muted">
          <h2 className="text-2xl font-bold">{t.captureTitle}</h2>
          <p className="text-muted mt-1">{t.captureInstruction}</p>
        </div>

        <div className="relative aspect-[4/3] bg-gray-900">
          {!cameraActive && !cameraError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={onStartCamera}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-2 
                         text-white font-semibold flex items-center gap-3 hover:shadow-lg 
                         hover:scale-105 transition-all duration-200"
              >
                <Camera className="w-6 h-6" />
                {t.captureButton}
              </button>
            </div>
          )}

          {cameraError && (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">{t.cameraDenied}</h3>
                <p className="text-gray-300 mb-6">{t.cameraDeniedMsg}</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold 
                           hover:bg-gray-100 transition-colors"
                >
                  {t.captureFileInput}
                </button>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
          />

          <canvas ref={canvasRef} className="hidden" />

          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <motion.div
                key={countdown}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 2, opacity: 0 }}
                className="text-9xl font-bold text-white"
              >
                {countdown}
              </motion.div>
            </div>
          )}

          {cameraActive && countdown === null && (
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80">
              <p className="text-white text-center mb-4">{t.captureGuidance}</p>
              <button
                onClick={onCapture}
                className="w-20 h-20 mx-auto block rounded-full bg-white border-4 
                         border-accent hover:scale-110 transition-transform duration-200"
                aria-label={t.captureButton}
              />
            </div>
          )}
        </div>

        <div className="p-6 border-t border-muted">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-muted 
                     hover:border-accent hover:bg-accent/5 transition-all duration-200 
                     flex items-center justify-center gap-2 text-muted hover:text-accent"
          >
            <Upload className="w-5 h-5" />
            {t.captureFileInput}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Preview and Metadata Component
function PreviewAndMetadata({
  t,
  image,
  metadata,
  setMetadata,
  showMetadata,
  setShowMetadata,
  uploading,
  processing,
  uploadProgress,
  statusMessage,
  error,
  onRetake,
  onAnalyze,
  motionProps
}: any) {
  return (
    <motion.div {...motionProps} className="max-w-4xl mx-auto space-y-6">
      {/* Image Preview */}
      <div className="bg-surface rounded-2xl shadow-xl overflow-hidden border border-muted">
        <div className="p-6 border-b border-muted flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t.captureUsePhoto}</h2>
          {!uploading && !processing && (
            <button
              onClick={onRetake}
              className="px-4 py-2 rounded-lg border border-muted hover:bg-surface/80 
                       transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {t.captureRetake}
            </button>
          )}
        </div>

        <div className="relative aspect-[4/3] bg-gray-900">
          <img src={image} alt="Captured soil sample" className="w-full h-full object-cover" />
          
          {(uploading || processing) && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
              <Loader2 className="w-16 h-16 text-accent animate-spin mb-4" />
              <p className="text-white text-lg font-medium">{statusMessage}</p>
              {uploading && uploadProgress > 0 && (
                <div className="w-64 h-2 bg-gray-700 rounded-full mt-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent to-accent-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border-t border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-500 font-medium">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Metadata Form */}
      {!uploading && !processing && (
        <div className="bg-surface rounded-2xl shadow-xl overflow-hidden border border-muted">
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className="w-full p-6 flex items-center justify-between hover:bg-surface/80 
                     transition-colors"
          >
            <h3 className="text-lg font-semibold">{t.metadataTitle}</h3>
            <ChevronRight 
              className={`w-5 h-5 transition-transform ${showMetadata ? 'rotate-90' : ''}`} 
            />
          </button>

          {showMetadata && (
            <div className="px-6 pb-6 space-y-4 border-t border-muted pt-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t.metadataLocation}</label>
                <input
                  type="text"
                  value={metadata.location || ''}
                  onChange={(e) => setMetadata({ ...metadata, location: e.target.value })}
                  placeholder={t.metadataLocationPlaceholder}
                  className="w-full px-4 py-2 rounded-lg border border-muted bg-bg 
                           focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.metadataCropHistory}</label>
                <input
                  type="text"
                  value={metadata.previousCrop || ''}
                  onChange={(e) => setMetadata({ ...metadata, previousCrop: e.target.value })}
                  placeholder={t.metadataCropPlaceholder}
                  className="w-full px-4 py-2 rounded-lg border border-muted bg-bg 
                           focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.metadataIrrigation}</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['rain', 'canal', 'borewell'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setMetadata({ ...metadata, irrigationType: type })}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        metadata.irrigationType === type
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-muted hover:border-accent/50'
                      }`}
                    >
                      {type === 'rain' ? t.metadataIrrigationRain :
                       type === 'canal' ? t.metadataIrrigationCanal :
                       t.metadataIrrigationBore}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="p-6 border-t border-muted">
            <button
              onClick={onAnalyze}
              disabled={uploading || processing}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-2 
                       text-white font-semibold hover:shadow-lg hover:scale-105 
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed 
                       disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              {t.captureUpload}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Results View Component
function ResultsView({ t, result, onReset, motionProps }: any) {
  return (
    <motion.div {...motionProps} className="max-w-6xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">{t.resultsTitle}</h2>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg border border-muted hover:bg-surface 
                     transition-colors flex items-center gap-2"
            aria-label={t.downloadReport}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t.downloadReport}</span>
          </button>
          <button
            className="px-4 py-2 rounded-lg border border-muted hover:bg-surface 
                     transition-colors flex items-center gap-2"
            aria-label={t.shareResults}
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t.shareResults}</span>
          </button>
        </div>
      </div>

      {/* Soil Analysis Card */}
      <SoilAnalysisCard t={t} soil={result.soil} />

      {/* Crop Recommendations */}
      <CropRecommendationsCard t={t} crops={result.crops} />

      {/* Reset Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={onReset}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-2 
                   text-white font-semibold hover:shadow-lg hover:scale-105 
                   transition-all duration-200 flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          {t.analyzeAnother}
        </button>
      </div>
    </motion.div>
  );
}

// Soil Analysis Card
function SoilAnalysisCard({ t, soil }: { t: any; soil: SoilAnalysis }) {
  const getStatusColor = (value: number, optimal: [number, number]) => {
    if (value >= optimal[0] && value <= optimal[1]) return 'text-green-500 dark:text-green-400';
    if (value < optimal[0]) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  return (
    <div className="bg-surface rounded-2xl shadow-xl border border-muted overflow-hidden">
      <div className="p-6 border-b border-muted bg-gradient-to-r from-accent/5 to-accent-2/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{soil.soilType} Soil</h3>
            <p className="text-muted mt-1">pH {soil.pH.toFixed(1)}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-accent">{soil.healthScore.toFixed(0)}</div>
            <div className="text-sm text-muted">{t.resultsSoilHealth}</div>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <NutrientMeter label={t.resultsNitrogen} value={soil.nitrogen} unit="%" optimal={[0.8, 1.2]} />
        <NutrientMeter label={t.resultsPhosphorus} value={soil.phosphorus} unit="%" optimal={[0.15, 0.3]} />
        <NutrientMeter label={t.resultsPotassium} value={soil.potassium} unit="%" optimal={[0.3, 0.6]} />
        <NutrientMeter label={t.resultsOrganic} value={soil.organicMatter} unit="%" optimal={[2, 4]} />
        <NutrientMeter label={t.resultsMoisture} value={soil.moisture} unit="%" optimal={[15, 25]} />
        <NutrientMeter label={t.resultsConfidence} value={soil.confidence} unit="%" optimal={[80, 100]} />
      </div>
    </div>
  );
}

function NutrientMeter({ label, value, unit, optimal }: any) {
  const isOptimal = value >= optimal[0] && value <= optimal[1];
  const isLow = value < optimal[0];
  const percentage = Math.min((value / optimal[1]) * 100, 100);

  return (
    <div className="p-4 rounded-xl bg-bg border border-muted">
      <div className="text-sm font-medium text-muted mb-2">{label}</div>
      <div className="text-2xl font-bold mb-2">
        {value.toFixed(2)}{unit}
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            isOptimal ? 'bg-green-500' : isLow ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Crop Recommendations Card
function CropRecommendationsCard({ t, crops }: { t: any; crops: CropRecommendation[] }) {
  return (
    <div className="bg-surface rounded-2xl shadow-xl border border-muted overflow-hidden">
      <div className="p-6 border-b border-muted">
        <h3 className="text-2xl font-bold">{t.cropRecommendations}</h3>
      </div>

      <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {crops.map((crop, index) => (
          <motion.div
            key={crop.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl bg-bg border border-muted hover:border-accent 
                     hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold">{crop.name}</h4>
                <p className="text-sm text-muted">{crop.nameHindi}</p>
              </div>
              <span className="text-3xl">{crop.icon}</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted mb-1">{t.cropSuitability}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-500"
                      style={{ width: `${crop.suitability}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold">{crop.suitability.toFixed(0)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <div>
                    <div className="font-bold">{crop.expectedYield.toFixed(0)}</div>
                    <div className="text-xs text-muted">{t.cropPerHectare}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-accent" />
                  <div>
                    <div className="font-bold">{crop.growthPeriod}</div>
                    <div className="text-xs text-muted">{t.cropDays}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm col-span-2">
                  <Droplet className="w-4 h-4 text-accent" />
                  <div>
                    <span className="font-medium">{t.cropWaterNeeds}: </span>
                    <span className={
                      crop.waterNeeds === 'low' ? 'text-green-500' :
                      crop.waterNeeds === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }>
                      {crop.waterNeeds === 'low' ? t.cropWaterLow :
                       crop.waterNeeds === 'medium' ? t.cropWaterMedium :
                       t.cropWaterHigh}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
