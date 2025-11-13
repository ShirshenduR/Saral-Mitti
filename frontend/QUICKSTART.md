# Quick Start Guide - Saral Mitti
# त्वरित प्रारंभ गाइड - सरल मिट्टी

This guide will help you get Saral Mitti running on your local machine in just a few steps.

## Prerequisites

- **Node.js** 18.0 or higher
- **npm**, **pnpm**, or **yarn** package manager
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Optional: Camera for live soil capture (or use file upload)

## Installation Steps

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

Or if you prefer pnpm:

```bash
pnpm install
```

Or with yarn:

```bash
yarn install
```

This will install all required packages:
- `react` & `react-dom` - UI framework
- `next` - React framework for production
- `framer-motion` - Smooth animations
- `lucide-react` - Beautiful icons
- `recharts` - Data visualization (optional for charts)
- `tailwindcss` - Utility-first CSS framework
- `typescript` - Type safety

### 2. Configure Backend (Optional)

#### Option A: Use Mock Mode (Default)

The app works out of the box with simulated results. No configuration needed!

#### Option B: Connect to Django Backend

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` and set your backend URL:

```env
NEXT_PUBLIC_API_URL=https://your-django-backend.com
```

Or directly edit `api.ts` line 9:

```typescript
const BASE_URL = 'https://your-django-backend.com';
```

### 3. Run Development Server

```bash
npm run dev
```

The app will start at `http://localhost:3000`

## Testing the Features

### Theme Switching

1. Look for the sun/moon icon in the top-right corner
2. Click to cycle through: Light → Dark → System
3. Your preference is saved automatically

### Language Toggle

Click the **EN** / **हिं** button in the header to switch between English and Hindi.

### Soil Analysis

#### Using Camera:
1. Click "Get Started" in the onboarding modal
2. Allow camera permission when prompted
3. Position your soil sample in the frame
4. Click the white circle button to capture
5. Optionally add location and crop details
6. Click "Upload & Analyze"

#### Using File Upload:
1. Skip camera or click "Or upload from device"
2. Select an image file from your device
3. Proceed with analysis

### Viewing Results

After processing (2-3 seconds in mock mode), you'll see:
- **Soil Health Score** (0-100)
- **Soil Type** and **pH Level**
- **NPK Levels** (Nitrogen, Phosphorus, Potassium)
- **Top 3 Crop Recommendations** with:
  - Suitability percentage
  - Expected yield
  - Growth period
  - Water requirements

## Build for Production

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
Saral-Mitti/
├── app/
│   ├── layout.tsx       # Root layout with theme script
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles and CSS variables
├── CaptureAndAnalyze.tsx   # Main UI component (1000+ lines)
├── api.ts                  # Backend integration
├── strings.ts              # Bilingual UI text
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind with dark mode
├── next.config.js          # Next.js config
└── theme-sample.md         # Theme documentation
```

## Key Features

✅ **Light & Dark Theme** - Fully accessible with system detection  
✅ **Bilingual** - English + Hindi (हिंदी)  
✅ **Camera Capture** - Live camera with countdown  
✅ **File Upload** - Alternative upload method  
✅ **Progress Tracking** - Real-time upload and processing status  
✅ **Mock Mode** - Works without backend for testing  
✅ **Responsive** - Mobile, tablet, and desktop friendly  
✅ **Accessible** - WCAG AA compliant, keyboard navigation, screen reader support  
✅ **Smooth Animations** - Framer Motion with reduced motion support  

## Common Issues

### TypeScript Errors

If you see TypeScript errors after installation, they should resolve after running:

```bash
npm install
```

The errors you might see are related to missing type definitions, which are installed with `@types/node`, `@types/react`, etc. These are already in `package.json`.

### Camera Not Working

- **HTTPS Required**: Modern browsers require HTTPS for camera access (except localhost)
- **Permissions**: Check browser permissions for camera
- **Fallback**: Use file upload as alternative

### Theme Flickering

The anti-FOUC script in `app/layout.tsx` should prevent this. If you see flickering:
- Check that the inline script is present
- Verify `suppressHydrationWarning` is on `<html>` tag
- Clear browser cache and reload

### Port Already in Use

If port 3000 is taken:

```bash
npm run dev -- -p 3001
```

### Mock Mode Always Active

Even with backend configured, mock mode activates if:
- `BASE_URL` contains "example.com"
- `BASE_URL` is not set
- To force real backend, ensure `.env.local` has valid URL

## Customization

### Change Theme Colors

Edit `globals.css`:

```css
:root {
  --color-accent: #0F9D58;  /* Your brand color */
}
```

### Add New Languages

Edit `strings.ts` and add a new language:

```typescript
export const strings = {
  en: { /* ... */ },
  hi: { /* ... */ },
  es: { /* Spanish translations */ }
};
```

### Modify Onboarding

Edit the `OnboardingModal` component in `CaptureAndAnalyze.tsx` (line ~500).

## Deployment

### Vercel (Easiest)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t saral-mitti .
docker run -p 3000:3000 saral-mitti
```

### Other Platforms

The app is a standard Next.js app and works on:
- Netlify
- Railway
- Render
- AWS Amplify
- Any Node.js hosting

## Environment Variables in Production

Set these in your hosting platform:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Django backend URL | `https://api.example.com` |

## Performance

- **Bundle Size**: ~150KB gzipped
- **First Load**: < 2 seconds
- **Lighthouse Score**: 90+

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Need Help?

1. Check `PROJECT-STRUCTURE.md` for detailed architecture
2. Review `theme-sample.md` for theme customization
3. Read inline comments (bilingual EN/HI) in components
4. Test with mock mode first before connecting backend

## Next Steps

1. ✅ Get the app running locally
2. Test theme switching and language toggle
3. Try capturing or uploading a soil image
4. Review the results UI
5. Connect your Django backend
6. Customize colors and branding
7. Deploy to production

---

**Happy Farming! 🌾 / खुश खेती! 🌾**

For detailed theme documentation, see `theme-sample.md`  
For project architecture, see `PROJECT-STRUCTURE.md`
