# Saral Mitti - सरल मिट्टी

**Production-ready Next.js UI with Light/Dark theme support**

## Dependencies
```bash
npm install framer-motion recharts lucide-react
# or
pnpm add framer-motion recharts lucide-react
```

## Configuration
- Set `BASE_URL` in `api.ts` to your Django backend endpoint
- Configure JWT token retrieval in `api.ts` (currently uses `localStorage.getItem('jwt_token')`)
- Tailwind config requires `darkMode: 'class'` — see `theme-sample.md`

## Theme Features
- Light & Dark modes with earthy color palette
- System preference detection (`prefers-color-scheme`)
- User preference persistence (`localStorage`)
- WCAG AA contrast compliance
- `prefers-reduced-motion` support

## Run Development
```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000` and test both light/dark themes via the toggle.
