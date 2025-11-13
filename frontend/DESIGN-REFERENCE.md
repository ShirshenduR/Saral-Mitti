# Visual Design Reference - Saral Mitti
# दृश्य डिज़ाइन संदर्भ - सरल मिट्टी

This document describes the visual appearance of each screen and component for designers and stakeholders.

---

## 🎨 Design System

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Headings**: Bold weight (font-bold)
- **Body**: Normal weight (font-normal)
- **Sizes**: 
  - H1: text-3xl (30px)
  - H2: text-2xl (24px)
  - H3: text-xl (20px)
  - Body: text-base (16px)
  - Small: text-sm (14px)
  - Tiny: text-xs (12px)

### Spacing
- Container: max-w-7xl (1280px) centered
- Padding: px-4 (16px) on mobile, px-6 (24px) on desktop
- Gaps: gap-2 to gap-8 (8px to 32px)
- Rounded corners: rounded-xl (12px) for cards, rounded-lg (8px) for buttons

### Shadows
- **Light Mode**:
  - Cards: subtle shadow-xl
  - Hover: increased shadow-2xl
- **Dark Mode**:
  - Darker, more pronounced shadows
  - Glow effects on accent colors

---

## 📱 Screen Layouts

### 1. Header (Sticky Top Bar)

```
┌─────────────────────────────────────────────────────────┐
│  [स Logo]  Saral Mitti          [Demo] [हिं] [🌙]    │
│            Smart Soil Analysis                          │
└─────────────────────────────────────────────────────────┘
```

**Components**:
- **Logo**: Circular gradient badge with "स" character
- **Title**: "Saral Mitti" in bold
- **Tagline**: "Smart Soil Analysis for Better Farming" in muted text
- **Demo Badge**: Only shows in mock mode (green accent with pulse animation)
- **Language Toggle**: "EN" / "हिं" button
- **Theme Toggle**: Sun/Moon/Monitor icon (cycles through options)

**Colors**:
- Light: White background (`#FFFFFF`) with subtle border
- Dark: Dark surface (`#1A1A1C`) with lighter border
- Sticky with backdrop blur for modern glass effect

---

### 2. Onboarding Modal (First Visit)

```
╔═════════════════════════════════════════════════════╗
║                                                     ║
║  [Gradient Header - Green to Light Green]          ║
║  Welcome to Saral Mitti                            ║
║  Analyze your soil in 3 simple steps               ║
║                                                     ║
║  ┌─────────────────────────────────────────┐       ║
║  │ [📸] Step 1                             │       ║
║  │ Capture a clear photo of your soil     │       ║
║  │                                         │       ║
║  │ [🔬] Step 2                             │       ║
║  │ Our AI analyzes soil properties         │       ║
║  │                                         │       ║
║  │ [🌾] Step 3                             │       ║
║  │ Get personalized crop recommendations   │       ║
║  └─────────────────────────────────────────┘       ║
║                                                     ║
║  ℹ️ We need camera access to capture soil images   ║
║                                                     ║
║  [          Get Started          ]                 ║
║                                                     ║
╚═════════════════════════════════════════════════════╝
```

**Visual Details**:
- Modal appears centered with backdrop blur
- Gradient header: Accent green to light green
- Step icons: Large emoji (📸, 🔬, 🌾)
- Numbers shown as "Step 1", "Step 2", "Step 3"
- Big green button at bottom with hover scale effect
- Smooth fade-in animation

---

### 3. Camera Capture Screen

```
┌─────────────────────────────────────────────────────────┐
│  Capture Soil Sample                                    │
│  Position your soil sample in the frame                 │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │          [Live Camera Feed]                     │    │
│  │                                                 │    │
│  │                                                 │    │
│  │   Ensure good lighting and avoid shadows       │    │
│  │                                                 │    │
│  │          [Capture Button - White Circle]       │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  [────────── Or upload from device ──────────]          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Visual Details**:
- **Camera Feed**: Full-width video element, 4:3 aspect ratio
- **Capture Button**: Large white circle (80px) with accent border
- **Countdown**: Giant numbers (9xl size) appear over video
- **Guidance Text**: White text over semi-transparent gradient at bottom
- **Upload Fallback**: Dashed border box below camera
- **Error State**: Red alert icon with message if camera denied

---

### 4. Preview & Metadata Screen

```
┌─────────────────────────────────────────────────────────┐
│  Use This Photo                         [🔄 Retake]     │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │        [Captured Image Preview]                │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ▶ Additional Details (Optional)                  ▼    │
│                                                          │
│    Location                                             │
│    [e.g., Village, District            ]               │
│                                                          │
│    Previous Crop                                        │
│    [e.g., Wheat, Rice                  ]               │
│                                                          │
│    Irrigation Type                                      │
│    [Rain-fed] [Canal] [Borewell]                       │
│                                                          │
│  [        Upload & Analyze       ]                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Visual Details**:
- **Image Preview**: Full captured image, 4:3 ratio
- **Retake Button**: Top-right, icon + text
- **Metadata Section**: Collapsible (chevron rotates)
- **Input Fields**: Rounded, bordered, with placeholders
- **Irrigation Buttons**: Toggle buttons, active = green accent
- **Upload Button**: Full-width gradient green button
- **Progress State**: Loader overlay with spinning icon and progress bar

---

### 5. Results Screen - Soil Analysis

```
┌─────────────────────────────────────────────────────────┐
│  Soil Analysis Results         [📥 Download] [📤 Share] │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Loamy Soil                            82      │    │
│  │  pH 6.8                          Soil Health   │    │
│  │                                                 │    │
│  │  Nitrogen (N)    Phosphorus (P)  Potassium (K) │    │
│  │    0.95%             0.22%           0.45%     │    │
│  │  [████████░░]    [████████░░]    [████████░░]  │    │
│  │                                                 │    │
│  │  Organic Matter   Moisture      Confidence     │    │
│  │    3.2%            18.5%           92%         │    │
│  │  [████████░░]    [████████░░]    [████████░░]  │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Recommended Crops                                      │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Wheat 🌾 │  │ Rice 🌾  │  │ Lentils  │             │
│  │ गेहूं     │  │ चावल     │  │ दाल 🫘   │             │
│  │          │  │          │  │          │             │
│  │ 92%      │  │ 85%      │  │ 78%      │             │
│  │ ████████ │  │ ████████ │  │ ███████  │             │
│  │          │  │          │  │          │             │
│  │ 📊 42 q/h │  │ 📊 48 q/h│  │ 📊 18 q/h│             │
│  │ 📅 120 d  │  │ 📅 150 d │  │ 📅 95 d  │             │
│  │ 💧 Medium │  │ 💧 High  │  │ 💧 Low   │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│                                                          │
│            [🔄 Analyze Another Sample]                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Visual Details**:
- **Health Score**: Large number (4xl) in top-right of soil card
- **Soil Type & pH**: Left side of header
- **Nutrient Meters**: 2x3 grid of metric cards
  - Each card: Label, value with unit, color-coded progress bar
  - Green = optimal, Yellow = low, Red = high
- **Crop Cards**: Grid layout (3 columns on desktop)
  - Crop name in English + Hindi
  - Emoji icon (top-right)
  - Suitability bar (gradient green)
  - Icons for yield (📊), period (📅), water (💧)
  - Hover effect: border changes to accent, slight scale
- **Reset Button**: Large green gradient button

---

## 🎨 Color Usage Examples

### Light Mode
```css
Background:    #F4E9D8  /* Warm sand */
Surface:       #FFFFFF  /* Cards, modals */
Text:          #1F2937  /* Headings, body */
Muted:         #6B7280  /* Secondary text */
Accent:        #0F9D58  /* Buttons, highlights */
```

### Dark Mode
```css
Background:    #0B0B0D  /* Deep soil */
Surface:       #1A1A1C  /* Cards, modals */
Text:          #E6EDF3  /* Headings, body */
Muted:         #9CA3AF  /* Secondary text */
Accent:        #4EE07A  /* Buttons, highlights (brighter) */
```

---

## 🎭 Component States

### Buttons

#### Default
- Light: White background, gray border, gray text
- Dark: Dark surface, lighter border, light text

#### Hover
- Scale: 105% (slight growth)
- Border: Changes to accent color
- Cursor: pointer

#### Active/Primary
- Background: Gradient from accent to accent-2
- Text: White
- Shadow: Larger on hover

#### Disabled
- Opacity: 50%
- Cursor: not-allowed
- No hover effects

### Input Fields

#### Default
- Background: bg color
- Border: muted color
- Text: text color

#### Focus
- Border: none
- Ring: 2px accent color ring
- Outline: none

#### Error
- Border: red-500
- Text: red color below input

### Progress Bars

#### NPK Meters
- Background: Light gray (light mode) / Dark gray (dark mode)
- Fill: Green (optimal), Yellow (low), Red (high)
- Height: 8px (h-2)
- Rounded: Full (rounded-full)
- Animation: Width transition 500ms

#### Upload Progress
- Background: Gray-700
- Fill: Gradient accent to accent-2
- Width animates 0-100%
- Smooth transition

---

## 🎬 Animations

### Page Transitions
- Fade in: opacity 0 → 1, translateY 20px → 0
- Duration: 300ms
- Easing: ease-in-out

### Modal Entrance
- Scale: 0.9 → 1
- Opacity: 0 → 1
- Backdrop: Blur increase
- Duration: 300ms

### Countdown
- Scale: 0 → 1 → 2
- Opacity: 0 → 1 → 0
- Each number animates independently
- Duration: 1000ms per number

### Hover Effects
- Buttons: Scale 1 → 1.05
- Cards: Border color change + shadow increase
- Duration: 200ms
- Easing: ease-out

### Loading Spinner
- Rotation: 360° continuous
- Duration: 1s linear infinite
- Icon: Loader2 from lucide-react

### Crop Card Entrance
- Stagger: Each card delays by 100ms
- Fade + slide up
- Duration: 300ms each

---

## 📐 Responsive Breakpoints

### Mobile (< 640px)
- Single column layouts
- Full-width cards
- Smaller text sizes
- Stacked navigation elements
- Touch-friendly button sizes (min 44px)

### Tablet (640px - 1024px)
- 2-column grids for results
- Medium padding
- Responsive font sizes

### Desktop (> 1024px)
- 3-column grids for crop cards
- 2x3 grid for nutrient meters
- Maximum content width: 1280px
- Larger padding and gaps

---

## 🖼️ Icon Usage

### From lucide-react
- **Camera**: Camera capture, permissions
- **Upload**: File upload fallback
- **Sun**: Light theme indicator
- **Moon**: Dark theme indicator
- **Monitor**: System theme indicator
- **Loader2**: Loading spinner (animated)
- **Check**: Success states
- **X**: Close modals, errors
- **AlertCircle**: Warnings, errors
- **RefreshCw**: Retake, reset actions
- **Download**: Download report
- **Share2**: Share results
- **ChevronRight**: Expand/collapse
- **Droplet**: Water needs
- **TrendingUp**: Yield indicator
- **Calendar**: Growth period

### Size Guidelines
- Header icons: w-5 h-5 (20px)
- Button icons: w-5 h-5 (20px)
- Large indicators: w-16 h-16 (64px)
- Countdown: text-9xl (128px)

---

## 🎯 Accessibility Features

### Focus Indicators
- 2px accent color ring
- 2px offset from element
- Visible on all interactive elements
- Only on :focus-visible (not click)

### Color Contrast
All text meets WCAG AA (4.5:1):
- Light mode: Dark text on light backgrounds
- Dark mode: Light text on dark backgrounds
- Accent colors chosen for readability

### Screen Reader Support
- ARIA labels on icon-only buttons
- `role="status"` with `aria-live="polite"` for status messages
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text on images
- Form labels associated with inputs

### Keyboard Navigation
- Tab order follows visual order
- Enter/Space activate buttons
- Escape closes modals
- Focus trap in modals

---

## 🎨 Theme Toggle States

### Visual Indicators
```
Light Mode:  [☀️ Sun icon]     - Yellow/orange color
Dark Mode:   [🌙 Moon icon]    - Blue/purple color
System:      [🖥️ Monitor icon] - Gray color
```

### Button Appearance
- Active state: Accent background
- Hover: Scale 1.05 + shadow
- Pressed: Scale 0.98
- Transition: All properties 200ms

---

## 📱 Mobile Considerations

### Touch Targets
- Minimum: 44x44px
- Capture button: 80x80px
- Form inputs: 48px height
- Spacing between: 8px minimum

### Orientation
- Portrait: Optimized primary view
- Landscape: Camera fills more space
- Auto-rotation supported

### Performance
- Lazy load images
- Optimize camera preview
- Debounce resize events
- GPU-accelerated animations

---

## 🎨 Brand Guidelines

### Logo
- Circular gradient badge
- "स" character (Devanagari)
- Colors: Accent gradient
- Always maintain aspect ratio

### Voice & Tone
- Friendly and approachable
- Educational but not condescending
- Bilingual support is core feature
- Farmer-centric language

### Imagery
- Real soil samples preferred
- Natural lighting
- Earthy color tones
- Authentic farming contexts

---

**This design system ensures consistency across all screens while maintaining accessibility and performance.**

For implementation details, see the actual components in `CaptureAndAnalyze.tsx`.
