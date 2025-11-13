// RegisterPage.tsx
// Registration page for Saral Mitti new users
// सरल मिट्टी नए उपयोगकर्ताओं के लिए पंजीकरण पेज

'use client';

import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  AlertCircle, 
  Loader2, 
  Eye, 
  EyeOff,
  CheckCircle2 
} from 'lucide-react';
import { strings, type Language } from './strings';
import { register, setAuthTokens, setUser, USE_MOCK_AUTH } from './auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RegisterPageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  ThemeToggle: React.ComponentType;
}

export default function RegisterPage({ lang, setLang, ThemeToggle }: RegisterPageProps) {
  const t = strings[lang];
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name) {
      setError(t.nameRequired);
      return;
    }
    if (!email) {
      setError(t.emailRequired);
      return;
    }
    if (!password) {
      setError(t.passwordRequired);
      return;
    }
    if (password.length < 6) {
      setError(t.passwordTooShort);
      return;
    }

    setLoading(true);

    try {
      const response = await register({
        name,
        email,
        password,
        phone: phone || undefined,
        farmLocation: farmLocation || undefined,
      });
      
      // Store tokens and user data
      setAuthTokens(response.token, response.refreshToken);
      setUser(response.user);

      // Redirect to onboarding or analyze page
      router.push('/analyze');
    } catch (err: any) {
      setError(err.message || t.registerFailed);
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
                  ? 'Registration works in demo mode' 
                  : 'डेमो मोड में पंजीकरण काम करता है'}
              </p>
            </div>
          )}

          {/* Register Card */}
          <div className="bg-surface rounded-2xl shadow-xl border border-muted overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-2">{t.register}</h2>
              <p className="text-muted mb-8">
                {lang === 'en' 
                  ? 'Create your account and start analyzing your soil.' 
                  : 'अपना खाता बनाएं और अपनी मिट्टी का विश्लेषण शुरू करें।'}
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

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t.name} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-muted bg-bg 
                               focus:outline-none focus:ring-2 focus:ring-accent 
                               transition-all"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t.email} *
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
                    {t.password} *
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
                  {password && password.length < 6 && (
                    <p className="mt-1 text-xs text-muted">
                      {lang === 'en' ? 'Password must be at least 6 characters' : 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए'}
                    </p>
                  )}
                </div>

                {/* Phone Field (Optional) */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    {t.phone} {lang === 'en' ? '(Optional)' : '(वैकल्पिक)'}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-muted bg-bg 
                               focus:outline-none focus:ring-2 focus:ring-accent 
                               transition-all"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Farm Location Field (Optional) */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2">
                    {t.farmLocation} {lang === 'en' ? '(Optional)' : '(वैकल्पिक)'}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      id="location"
                      type="text"
                      value={farmLocation}
                      onChange={(e) => setFarmLocation(e.target.value)}
                      placeholder={t.farmLocationPlaceholder}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-muted bg-bg 
                               focus:outline-none focus:ring-2 focus:ring-accent 
                               transition-all"
                      disabled={loading}
                    />
                  </div>
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
                      {lang === 'en' ? 'Creating account...' : 'खाता बनाया जा रहा है...'}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      {t.registerButton}
                    </>
                  )}
                </button>

                <p className="text-xs text-muted text-center">
                  {lang === 'en' 
                    ? 'By signing up, you agree to our Terms and Privacy Policy' 
                    : 'साइन अप करके, आप हमारी शर्तों और गोपनीयता नीति से सहमत होते हैं'}
                </p>
              </form>
            </div>

            {/* Login Link */}
            <div className="px-8 py-6 bg-bg/50 border-t border-muted text-center">
              <p className="text-muted">
                {t.haveAccount}{' '}
                <Link href="/login" className="text-accent font-medium hover:underline">
                  {t.loginLink}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
