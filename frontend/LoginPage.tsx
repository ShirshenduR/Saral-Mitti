// LoginPage.tsx
// Login page for Saral Mitti user authentication
// सरल मिट्टी उपयोगकर्ता प्रमाणीकरण के लिए लॉगिन पेज

'use client';

import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { strings, type Language } from './strings';
import { login, setAuthTokens, setUser, USE_MOCK_AUTH } from './auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginPageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  ThemeToggle: React.ComponentType;
}

export default function LoginPage({ lang, setLang, ThemeToggle }: LoginPageProps) {
  const t = strings[lang];
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email) {
      setError(t.emailRequired);
      return;
    }
    if (!password) {
      setError(t.passwordRequired);
      return;
    }

    setLoading(true);

    try {
      const response = await login({ email, password });
      
      // Store tokens and user data
      setAuthTokens(response.token, response.refreshToken);
      setUser(response.user);

      // Redirect to dashboard/analyze page
      router.push('/analyze');
    } catch (err: any) {
      setError(err.message || t.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-md border-b border-muted">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-2 
                            flex items-center justify-center text-white font-bold text-lg">
                स
              </div>
              <div>
                <h1 className="text-xl font-bold">{t.appName}</h1>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="px-3 py-1 rounded-lg border border-muted hover:bg-surface 
                         transition-colors text-sm font-medium"
              >
                {lang === 'en' ? 'हिं' : 'EN'}
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mock Mode Badge */}
          {USE_MOCK_AUTH && (
            <div className="mb-6 p-3 rounded-lg bg-accent/10 border border-accent/20 text-center">
              <p className="text-sm text-accent font-medium">
                {t.mockModeActive}
              </p>
              <p className="text-xs text-muted mt-1">
                {lang === 'en' 
                  ? 'Use any email and password (min 6 chars)' 
                  : 'कोई भी ईमेल और पासवर्ड उपयोग करें (न्यूनतम 6 अक्षर)'}
              </p>
            </div>
          )}

          {/* Login Card */}
          <div className="bg-surface rounded-2xl shadow-xl border border-muted overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-2">{t.login}</h2>
              <p className="text-muted mb-8">
                {lang === 'en' 
                  ? 'Welcome back! Please login to your account.' 
                  : 'वापस स्वागत है! कृपया अपने खाते में लॉगिन करें।'}
              </p>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 
                           flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-500 text-sm">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t.email}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-muted bg-bg 
                               focus:outline-none focus:ring-2 focus:ring-accent 
                               transition-all"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    {t.password}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.passwordPlaceholder}
                      className="w-full pl-11 pr-12 py-3 rounded-lg border border-muted bg-bg 
                               focus:outline-none focus:ring-2 focus:ring-accent 
                               transition-all"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted 
                               hover:text-text transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-muted text-accent 
                               focus:ring-2 focus:ring-accent"
                    />
                    <span className="text-sm">{t.rememberMe}</span>
                  </label>

                  <Link 
                    href="/forgot-password"
                    className="text-sm text-accent hover:underline"
                  >
                    {t.forgotPassword}
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-accent to-accent-2 
                           text-white font-semibold hover:shadow-lg hover:scale-105 
                           transition-all duration-200 disabled:opacity-50 
                           disabled:cursor-not-allowed disabled:hover:scale-100 
                           flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {lang === 'en' ? 'Logging in...' : 'लॉग इन हो रहा है...'}
                    </>
                  ) : (
                    t.loginButton
                  )}
                </button>
              </form>
            </div>

            {/* Register Link */}
            <div className="px-8 py-6 bg-bg/50 border-t border-muted text-center">
              <p className="text-muted">
                {t.noAccount}{' '}
                <Link href="/register" className="text-accent font-medium hover:underline">
                  {t.signUpLink}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
