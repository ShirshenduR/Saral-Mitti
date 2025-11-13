/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable class-based dark mode - क्लास-आधारित डार्क मोड सक्षम करें
  darkMode: 'class',
  
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './*.{js,ts,jsx,tsx}', // For root-level components
  ],
  
  theme: {
    extend: {
      // Custom color tokens for theme support
      // थीम समर्थन के लिए कस्टम रंग टोकन
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        'accent-2': 'var(--color-accent-2)',
      },
      
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  
  plugins: [],
}
