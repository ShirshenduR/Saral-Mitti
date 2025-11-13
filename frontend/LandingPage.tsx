// LandingPage.tsx
// Landing page for Saral Mitti with features showcase
// सरल मिट्टी के लिए लैंडिंग पेज

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  Sparkles,
  TrendingUp,
  LeafyGreen,
  BarChart3,
  Shield,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  Menu,
  X as CloseIcon
} from 'lucide-react';
import { strings, type Language } from './strings';
import { useRouter } from 'next/navigation';

interface LandingPageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: 'light' | 'dark' | 'system';
  ThemeToggle: React.ComponentType;
}

export default function LandingPage({ lang, setLang, theme, ThemeToggle }: LandingPageProps) {
  const t = strings[lang];
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Camera className="w-12 h-12 text-accent" />,
      title: t.landingFeature1Title,
      description: t.landingFeature1Desc,
    },
    {
      icon: <Sparkles className="w-12 h-12 text-accent" />,
      title: t.landingFeature2Title,
      description: t.landingFeature2Desc,
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-accent" />,
      title: t.landingFeature3Title,
      description: t.landingFeature3Desc,
    },
  ];

  const benefits = [
    { icon: <Clock className="w-6 h-6" />, text: lang === 'en' ? 'Results in seconds' : 'सेकंडों में परिणाम' },
    { icon: <Shield className="w-6 h-6" />, text: lang === 'en' ? 'Accurate AI analysis' : 'सटीक AI विश्लेषण' },
    { icon: <Users className="w-6 h-6" />, text: lang === 'en' ? 'Expert recommendations' : 'विशेषज्ञ सिफारिशें' },
    { icon: <BarChart3 className="w-6 h-6" />, text: lang === 'en' ? 'Track over time' : 'समय के साथ ट्रैक करें' },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-muted">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-2 
                            flex items-center justify-center text-white font-bold text-lg">
                स
              </div>
              <div>
                <h1 className="text-xl font-bold">{t.appName}</h1>
                <p className="text-xs text-muted hidden sm:block">{t.tagline}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="px-3 py-1 rounded-lg border border-muted hover:bg-surface 
                         transition-colors text-sm font-medium"
              >
                {lang === 'en' ? 'हिं' : 'EN'}
              </button>
              
              <ThemeToggle />
              
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 rounded-lg border border-muted hover:bg-surface 
                         transition-colors font-medium"
              >
                {t.login}
              </button>
              
              <button
                onClick={() => router.push('/register')}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-2 
                         text-white font-semibold hover:shadow-lg hover:scale-105 
                         transition-all duration-200"
              >
                {t.register}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-surface transition-colors"
            >
              {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-muted space-y-3"
            >
              <button
                onClick={() => {
                  setLang(lang === 'en' ? 'hi' : 'en');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg border border-muted hover:bg-surface 
                         transition-colors text-sm font-medium"
              >
                {lang === 'en' ? 'Switch to हिंदी' : 'Switch to English'}
              </button>
              
              <button
                onClick={() => {
                  router.push('/login');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg border border-muted hover:bg-surface 
                         transition-colors font-medium"
              >
                {t.login}
              </button>
              
              <button
                onClick={() => {
                  router.push('/register');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-6 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-2 
                         text-white font-semibold"
              >
                {t.register}
              </button>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-2/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t.landingHero}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted mb-8">
              {t.landingSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/register')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-2 
                         text-white font-semibold text-lg hover:shadow-xl hover:scale-105 
                         transition-all duration-200 flex items-center justify-center gap-2"
              >
                {t.landingGetStarted}
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-xl border-2 border-accent text-accent 
                         font-semibold text-lg hover:bg-accent/10 transition-all duration-200"
              >
                {t.landingLearnMore}
              </button>
            </div>

            {/* Hero Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 rounded-2xl overflow-hidden shadow-2xl border border-muted"
            >
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent-2/20 
                            flex items-center justify-center">
                <LeafyGreen className="w-32 h-32 text-accent opacity-50" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {lang === 'en' ? 'How It Works' : 'यह कैसे काम करता है'}
            </h2>
            <p className="text-xl text-muted">
              {lang === 'en' ? 'Simple, fast, and accurate' : 'सरल, तेज़, और सटीक'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-bg border border-muted hover:border-accent 
                         hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {lang === 'en' ? 'Why Choose Saral Mitti?' : 'सरल मिट्टी क्यों चुनें?'}
              </h2>
              <p className="text-lg text-muted mb-8">
                {lang === 'en' 
                  ? 'Make data-driven decisions for better crop yields and sustainable farming practices.'
                  : 'बेहतर फसल उपज और टिकाऊ खेती प्रथाओं के लिए डेटा-संचालित निर्णय लें।'}
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-muted"
                  >
                    <div className="text-accent">{benefit.icon}</div>
                    <span className="font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl border border-muted"
            >
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent-2/20 
                            flex items-center justify-center">
                <BarChart3 className="w-48 h-48 text-accent opacity-50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent to-accent-2 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t.landingCTA}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {lang === 'en' 
                ? 'Join thousands of farmers improving their yields with AI-powered insights'
                : 'AI-संचालित अंतर्दृष्टि के साथ अपनी उपज में सुधार करने वाले हजारों किसानों में शामिल हों'}
            </p>

            <button
              onClick={() => router.push('/register')}
              className="px-10 py-5 rounded-xl bg-white text-accent font-bold text-lg 
                       hover:shadow-2xl hover:scale-105 transition-all duration-200 
                       inline-flex items-center gap-3"
            >
              {t.landingCTAButton}
              <CheckCircle2 className="w-6 h-6" />
            </button>

            <p className="mt-6 text-white/80">
              {lang === 'en' ? 'No credit card required • Free forever' : 'कोई क्रेडिट कार्ड आवश्यक नहीं • हमेशा के लिए मुफ्त'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-surface border-t border-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-2 
                              flex items-center justify-center text-white font-bold text-lg">
                  स
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t.appName}</h3>
                  <p className="text-sm text-muted">{t.tagline}</p>
                </div>
              </div>
              <p className="text-muted">
                {lang === 'en'
                  ? 'Empowering farmers with AI-powered soil analysis for sustainable and profitable farming.'
                  : 'टिकाऊ और लाभदायक खेती के लिए AI-संचालित मिट्टी विश्लेषण के साथ किसानों को सशक्त बनाना।'}
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">{lang === 'en' ? 'Product' : 'उत्पाद'}</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="#features" className="hover:text-accent transition-colors">
                  {lang === 'en' ? 'Features' : 'विशेषताएँ'}
                </a></li>
                <li><a href="#" className="hover:text-accent transition-colors">
                  {lang === 'en' ? 'Pricing' : 'मूल्य निर्धारण'}
                </a></li>
                <li><a href="#" className="hover:text-accent transition-colors">
                  {lang === 'en' ? 'FAQ' : 'प्रश्न'}
                </a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">{lang === 'en' ? 'Company' : 'कंपनी'}</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="#" className="hover:text-accent transition-colors">
                  {lang === 'en' ? 'About' : 'हमारे बारे में'}
                </a></li>
                <li><a href="#" className="hover:text-accent transition-colors">
                  {lang === 'en' ? 'Contact' : 'संपर्क करें'}
                </a></li>
                <li><a href="#" className="hover:text-accent transition-colors">
                  {lang === 'en' ? 'Privacy' : 'गोपनीयता'}
                </a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-muted text-center text-muted">
            <p>© 2025 {t.appName}. {lang === 'en' ? 'All rights reserved.' : 'सर्वाधिकार सुरक्षित।'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
