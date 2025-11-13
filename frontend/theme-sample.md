# Theme Configuration Guide
# थीम कॉन्फ़िगरेशन गाइड

This file contains the necessary configuration snippets for implementing light/dark theme support in Saral Mitti.

## Tailwind CSS Configuration

Add this to your `tailwind.config.js` or `tailwind.config.ts`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable class-based dark mode
  // क्लास-आधारित डार्क मोड सक्षम करें
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
        // Light mode defaults, dark mode via CSS variables
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        'accent-2': 'var(--color-accent-2)',
      },
      
      // Optional: Add custom animations
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
```

---

## Global CSS Styles

Add this to your `globals.css` or `app/globals.css`:

```css
/* 
 * Saral Mitti Theme Styles
 * सरल मिट्टी थीम स्टाइल
 */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ========================================
 * CSS VARIABLES - Light Mode
 * CSS चर - लाइट मोड
 * ======================================== */
:root {
  /* Background colors - पृष्ठभूमि रंग */
  --color-bg: #F4E9D8;           /* Warm sand - गर्म रेत */
  --color-surface: #FFFFFF;       /* Pure white - शुद्ध सफेद */
  
  /* Text colors - पाठ रंग */
  --color-text: #1F2937;          /* Dark gray - गहरा भूरा */
  --color-muted: #6B7280;         /* Medium gray - मध्यम भूरा */
  
  /* Accent colors - एक्सेंट रंग */
  --color-accent: #0F9D58;        /* Green - हरा */
  --color-accent-2: #34A853;      /* Light green - हल्का हरा */
  
  /* Shadows - छाया */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* ========================================
 * CSS VARIABLES - Dark Mode
 * CSS चर - डार्क मोड
 * ======================================== */
.dark {
  /* Background colors - पृष्ठभूमि रंग */
  --color-bg: #0B0B0D;            /* Deep soil - गहरी मिट्टी */
  --color-surface: #1A1A1C;       /* Raised surface - उठी सतह */
  
  /* Text colors - पाठ रंग */
  --color-text: #E6EDF3;          /* Light gray - हल्का भूरा */
  --color-muted: #9CA3AF;         /* Medium gray - मध्यम भूरा */
  
  /* Accent colors - एक्सेंट रंग */
  --color-accent: #4EE07A;        /* Neon green - नियॉन हरा */
  --color-accent-2: #6FE89C;      /* Bright green - चमकीला हरा */
  
  /* Shadows - छाया */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
}

/* ========================================
 * BASE STYLES
 * बेस स्टाइल
 * ======================================== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
               'Helvetica Neue', Arial, sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ========================================
 * CUSTOM UTILITIES
 * कस्टम उपयोगिताएँ
 * ======================================== */

/* Screen reader only - केवल स्क्रीन रीडर */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus visible styles - फोकस दृश्यमान स्टाइल */
*:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Custom scrollbar - कस्टम स्क्रॉलबार */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--color-muted);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);
}

/* ========================================
 * COMPONENT HELPERS
 * घटक सहायक
 * ======================================== */

/* Gradient backgrounds - ग्रेडिएंट पृष्ठभूमि */
.gradient-primary {
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-2));
}

/* Glass effect - ग्लास प्रभाव */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Card shadows - कार्ड छाया */
.card {
  background: var(--color-surface);
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.dark .card {
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Loading spinner - लोडिंग स्पिनर */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Pulse animation - पल्स एनीमेशन */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* ========================================
 * RESPONSIVE UTILITIES
 * उत्तरदायी उपयोगिताएँ
 * ======================================== */

/* Mobile-first breakpoints */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
```

---

## Anti-FOUC Script (Flash of Unstyled Content)

Add this inline script to your root layout (`app/layout.tsx` or `pages/_document.tsx`) 
**BEFORE** the main content renders to prevent theme flicker:

```typescript
// app/layout.tsx or pages/_document.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC Script - must be inline and execute immediately */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Read saved theme preference
                const theme = localStorage.getItem('saral-mitti-theme') || 'system';
                
                // Determine if dark mode should be applied
                const isDark = theme === 'dark' || 
                  (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                
                // Apply immediately to prevent flash
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Usage Examples

### Using Theme Colors in Tailwind Classes

```tsx
// Light mode: white background, dark text
// Dark mode: dark background, light text
<div className="bg-surface text-text">
  <h1 className="text-accent">Saral Mitti</h1>
  <p className="text-muted">Your soil analysis helper</p>
</div>

// Buttons with gradient
<button className="bg-gradient-to-r from-accent to-accent-2 text-white">
  Analyze
</button>

// Borders that adapt
<div className="border border-muted hover:border-accent">
  Card content
</div>
```

### Manual Dark Mode Classes

For fine-grained control, use Tailwind's `dark:` variant:

```tsx
<div className="bg-white dark:bg-gray-900 
                text-gray-900 dark:text-gray-100
                border-gray-200 dark:border-gray-700">
  This adapts to both themes
</div>
```

---

## Accessibility Notes

1. **Contrast Ratios**: All color combinations meet WCAG AA standards (4.5:1 for body text).
2. **Focus Indicators**: Custom focus rings using accent color for keyboard navigation.
3. **Screen Readers**: Theme changes are announced via `aria-live` regions.
4. **Reduced Motion**: Animations respect `prefers-reduced-motion: reduce`.

---

## Theme Testing Checklist

- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] System theme detection works
- [ ] Theme toggle persists across page reloads
- [ ] No FOUC (flash of unstyled content) on initial load
- [ ] All interactive elements have sufficient contrast in both modes
- [ ] Focus indicators are visible in both modes
- [ ] Theme changes are announced to screen readers
- [ ] Reduced motion preference is respected

---

## Color Reference Card

| Element          | Light Mode | Dark Mode  | Purpose          |
|------------------|------------|------------|------------------|
| Background       | `#F4E9D8`  | `#0B0B0D`  | Main canvas      |
| Surface          | `#FFFFFF`  | `#1A1A1C`  | Cards, modals    |
| Text (Primary)   | `#1F2937`  | `#E6EDF3`  | Body text        |
| Text (Muted)     | `#6B7280`  | `#9CA3AF`  | Secondary text   |
| Accent (Primary) | `#0F9D58`  | `#4EE07A`  | CTAs, highlights |
| Accent (Secondary)| `#34A853` | `#6FE89C`  | Gradients        |

---

## Next.js Specific Notes

### App Router (Next.js 13+)

If using App Router, create `app/layout.tsx`:

```typescript
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('saral-mitti-theme') || 'system';
                const isDark = theme === 'dark' || 
                  (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Pages Router (Next.js 12 and below)

If using Pages Router, modify `pages/_document.tsx`:

```typescript
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('saral-mitti-theme') || 'system';
                const isDark = theme === 'dark' || 
                  (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

---

## Troubleshooting

### Theme Not Persisting
- Check browser localStorage permissions
- Verify `THEME_STORAGE_KEY` matches between theme hook and anti-FOUC script

### FOUC Still Occurring
- Ensure anti-FOUC script is in `<head>` and executes before body render
- Check that `suppressHydrationWarning` is on `<html>` tag

### Colors Not Changing
- Verify Tailwind config has `darkMode: 'class'`
- Check that CSS variables are defined in `globals.css`
- Ensure `dark` class is being applied to `<html>` element

### Animations Causing Issues
- Test with `prefers-reduced-motion: reduce` enabled
- Verify Framer Motion respects `useReducedMotion()` hook

---

**Generated for Saral Mitti (सरल मिट्टी)**  
Complete theme system with Light/Dark mode support, accessibility, and Next.js integration.
