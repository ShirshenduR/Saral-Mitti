'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LandingPage from '../LandingPage';
import { isAuthenticated } from '../auth';
import { Language } from '../strings';

// Theme hook and toggle component (shared)
function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('saral-mitti-theme') as any;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateResolvedTheme = (themeValue = savedTheme || 'system') => {
      const isDark = themeValue === 'dark' || (themeValue === 'system' && mediaQuery.matches);
      setResolvedTheme(isDark ? 'dark' : 'light');
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateResolvedTheme();

    const listener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        updateResolvedTheme('system');
      }
    };
    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    localStorage.setItem('saral-mitti-theme', newTheme);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = newTheme === 'dark' || (newTheme === 'system' && mediaQuery.matches);
    setResolvedTheme(isDark ? 'dark' : 'light');
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { theme, setTheme, resolvedTheme };
}

function ThemeToggle({ theme, setTheme }: any) {
  const [announceMessage, setAnnounceMessage] = useState('');
  
  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    setAnnounceMessage(`Theme changed to ${nextTheme}`);
  };

  const Icon = theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🖥️';

  return (
    <>
      <button
        onClick={cycleTheme}
        aria-label="Toggle theme"
        className="p-2 rounded-lg bg-surface hover:bg-surface/80 border border-muted 
                   transition-all duration-200 hover:scale-105"
      >
        <span className="text-xl">{Icon}</span>
      </button>
      <div role="status" aria-live="polite" className="sr-only">
        {announceMessage}
      </div>
    </>
  );
}

export default function Home() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // If user is already authenticated, redirect to analyze page
    if (isAuthenticated()) {
      router.push('/analyze');
    }
  }, [router]);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <LandingPage 
      lang={lang} 
      setLang={setLang} 
      theme={theme}
      ThemeToggle={() => <ThemeToggle theme={theme} setTheme={setTheme} />}
    />
  );
}
