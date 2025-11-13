import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Saral Mitti - सरल मिट्टी',
  description: 'Smart Soil Analysis for Better Farming',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC Script - Prevents flash of unstyled content */}
        {/* FOUC रोकथाम स्क्रिप्ट - बिना स्टाइल वाली सामग्री की चमक को रोकता है */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Read saved theme preference
                  // सहेजी गई थीम वरीयता पढ़ें
                  const theme = localStorage.getItem('saral-mitti-theme') || 'system';
                  
                  // Determine if dark mode should be applied
                  // निर्धारित करें कि क्या डार्क मोड लागू किया जाना चाहिए
                  const isDark = theme === 'dark' || 
                    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  
                  // Apply immediately to prevent flash
                  // फ्लैश को रोकने के लिए तुरंत लागू करें
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Silently fail if localStorage is not available
                  // यदि localStorage उपलब्ध नहीं है तो चुपचाप विफल हो जाएं
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
