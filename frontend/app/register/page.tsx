'use client';

import { useState, useEffect } from 'react';
import RegisterPage from '../../RegisterPage';
import { Language } from '../../strings';

// Theme hook and toggle component (shared)
function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('saral-mitti-theme') as any;
    if (savedTheme) setThemeState(savedTheme);
  }, []);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    localStorage.setItem('saral-mitti-theme', newTheme);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = newTheme === 'dark' || (newTheme === 'system' && mediaQuery.matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { theme, setTheme };
}

function ThemeToggle({ theme, setTheme }: any) {
  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const Icon = theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🖥️';

  return (
    <button
      onClick={cycleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-lg bg-surface hover:bg-surface/80 border border-muted 
                 transition-all duration-200"
    >
      <span className="text-xl">{Icon}</span>
    </button>
  );
}

export default function Register() {
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState<Language>('en');

  return (
    <RegisterPage 
      lang={lang} 
      setLang={setLang} 
      ThemeToggle={() => <ThemeToggle theme={theme} setTheme={setTheme} />}
    />
  );
}
