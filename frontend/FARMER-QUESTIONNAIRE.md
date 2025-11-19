# Farmer Questionnaire Flow

## Overview
The **Farmer Questionnaire** collects critical contextual information from farmers **after login** and **before soil analysis**. This information helps provide more accurate, location-specific, and crop-relevant soil analysis recommendations.

---

## When It Appears
- **First-time users**: Automatically shown after login, before accessing soil analysis
- **Returning users**: Skipped if already completed (data stored in `localStorage`)
- **Optional**: Users can skip and complete later

---

## 7-Step Questionnaire Flow

### Step 1: Test Reason
**Question**: *"Why are you testing your soil today?"*

**Purpose**: Helps prioritize the analysis focus

**Options**:
- 🗓️ Routine check
- 📉 Low yield observed
- 🦠 Crop disease/problem
- 🌱 Planning new crop
- ❓ Other reason (with text input)

**Why it matters**: Different test reasons require different nutrient priorities
- Routine → General health check
- Low yield → Focus on deficiency detection
- Disease → Check for nutrient imbalances that weaken plants
- New crop → Optimize for specific crop needs

---

### Step 2: Location (State → District → Town → Village)
**Question**: *"Where is your farm located?"*

**Purpose**: Identifies regional soil patterns and geo-specific nutrient issues

**Hierarchical Flow**:
1. Select **State** (dropdown with 12 major Indian states)
2. Select **District** (auto-populated based on state)
3. Enter **Town/Tehsil** (text input)
4. Enter **Village** (optional text input)

**Why it matters**:
- Different regions have different soil types (alluvial, black, red, laterite)
- Salinity patterns vary by location
- Regional climate affects nutrient availability
- Water table depth varies by geography

**Example Location Data**:
```
State: Punjab
District: Ludhiana
Town: Jagraon
Village: Bhaini Mehraj
```

---

### Step 3: Water Source
**Question**: *"What is your water source?"*

**Purpose**: Different water sources affect soil salinity and mineral content

**Options**:
- 🏞️ River
- 🕳️ Borewell
- 🌊 Canal
- ☔ Rainwater
- 🏊 Pond/Tank
- ❓ Other (with text input)

**Why it matters**:
- **Borewell**: Often high in salts, can cause salinity issues
- **River**: Variable quality depending on upstream pollution
- **Canal**: Regulated, usually better quality
- **Rainwater**: Cleanest, but limited availability
- **Pond**: Can have organic contamination

---

### Step 4: Crop History (Last 3-4 Crops)
**Question**: *"Last 3-4 crops grown"*

**Purpose**: Shows nutrient depletion patterns

**Interface**:
- Dropdown with 16 common Indian crops
- Add up to 4 crops
- Current crop (optional text input)
- Planned next crop (optional text input)

**Common Crops Included**:
- Rice (धान), Wheat (गेहूं), Sugarcane (गन्ना), Cotton (कपास)
- Maize (मक्का), Pulses (दालें), Groundnut (मूंगफली)
- Soybean (सोयाबीन), Mustard (सरसों), Bajra (बाजरा)
- Jowar (ज्वार), Potato (आलू), Onion (प्याज), Tomato (टमाटर)
- Vegetables (सब्जियां), Other (अन्य)

**Why it matters**:
- **Nitrogen depletion**: Heavy feeders like corn, wheat deplete N
- **Phosphorus depletion**: Root crops like potatoes use more P
- **Potassium depletion**: Fruits/vegetables need more K
- **Monoculture**: Same crop repeatedly → specific nutrient exhaustion
- **Crop rotation**: Pulses add nitrogen (legume nitrogen fixation)

**Example Analysis**:
```
Last 3 crops: Rice → Wheat → Rice
↓
High nitrogen depletion expected
Recommend: Increase urea/DAP or plant pulses
```

---

### Step 5: Yield Trends
**Question**: *"Recent yield trends"*

**Purpose**: Indicates possible nutrient deficiencies

**Options**:
- 📈 Increasing
- ➡️ Stable
- 📉 Decreasing (with optional details text area)
- 🆕 First-time farming

**Why it matters**:
- **Decreasing yield** → Strong indicator of:
  - Soil nutrient depletion
  - pH imbalance
  - Salinity buildup
  - Organic matter loss
- **Stable yield** → Maintenance focus
- **Increasing yield** → Current practices working
- **First-time** → Baseline establishment

---

### Step 6: Fertilizer & Pesticide History (Last 6 Months)
**Question**: *"Recent fertilizers used"*

**Purpose**: Rules out already-boosted nutrients

**Fertilizers** (multi-select):
- Urea (यूरिया) - High nitrogen
- DAP - Nitrogen + Phosphorus
- NPK - Balanced N-P-K
- SSP - Phosphorus + Sulfur
- MOP - Potassium
- Organic compost (जैविक खाद)
- Vermicompost (केंचुआ खाद)
- None (कोई नहीं)
- Other (अन्य)

**Pesticides** (optional multi-select):
- Insecticides (कीटनाशक)
- Fungicides (फफूंदनाशक)
- Herbicides (खरपतवारनाशक)
- Organic pesticides (जैविक)
- None (कोई नहीं)
- Other (अन्य)

**Why it matters**:
- **Recent NPK application** → Don't recommend more N-P-K
- **Urea recently applied** → Focus on other nutrients (P, K, micronutrients)
- **No fertilizer** → May need comprehensive nutrient boost
- **Pesticide overuse** → Can affect soil microbial health

**Example Logic**:
```
If recent: Urea + DAP
↓
Don't recommend: More nitrogen/phosphorus
Instead focus on: Potassium, micronutrients (Zn, Fe, B)
```

---

### Step 7: Current Season (Auto-detected)
**Question**: *"Current Season"*

**Purpose**: Determines critical nutrients for the growing season

**Seasons** (auto-detected from system date):
- 🌧️ **Kharif (Monsoon)**: June-October
  - Major crops: Rice, Cotton, Maize, Soybean
  - Critical: Nitrogen (vegetative growth)
  
- ❄️ **Rabi (Winter)**: October-March
  - Major crops: Wheat, Mustard, Chickpea
  - Critical: Phosphorus (root development)
  
- ☀️ **Zaid (Summer)**: March-June
  - Major crops: Vegetables, Watermelon, Cucumber
  - Critical: Potassium (fruit quality)
  
- 🌡️ **Summer**: April-June
  - Minor season with water stress
  - Critical: Water retention, organic matter

**Auto-detection Logic**:
```javascript
function getCurrentSeason() {
  const month = new Date().getMonth(); // 0-11
  
  if (month >= 5 && month <= 9) return 'kharif';    // June-Oct
  if (month >= 9 || month <= 2) return 'rabi';      // Oct-March
  if (month >= 2 && month <= 5) return 'zaid';      // March-June
  return 'summer';
}
```

**User can override** if the detection is incorrect.

---

## Data Storage

### localStorage Key
```javascript
const QUESTIONNAIRE_STORAGE_KEY = 'saral-mitti-farmer-context';
```

### Data Structure
```typescript
interface FarmerContext {
  // Location
  state: string;              // e.g., "Punjab"
  district: string;           // e.g., "Ludhiana"
  town: string;               // e.g., "Jagraon"
  village?: string;           // Optional
  waterSource: 'river' | 'borewell' | 'canal' | 'rainwater' | 'pond' | 'other';
  waterSourceDetails?: string;

  // Crop History
  last3Crops: string[];       // e.g., ["Rice (धान)", "Wheat (गेहूं)"]
  currentCrop?: string;
  plannedCrop?: string;

  // Yield
  yieldTrend: 'increasing' | 'stable' | 'decreasing' | 'first-time';
  yieldDetails?: string;

  // Testing
  testReason: 'routine' | 'low-yield' | 'disease' | 'new-crop' | 'other';
  testReasonDetails?: string;

  // Inputs
  recentFertilizers: string[]; // e.g., ["Urea (यूरिया)", "DAP"]
  recentPesticides: string[];

  // Season
  season: 'kharif' | 'rabi' | 'zaid' | 'summer';
}
```

### Example Stored Data
```json
{
  "state": "Punjab",
  "district": "Ludhiana",
  "town": "Jagraon",
  "village": "Bhaini Mehraj",
  "waterSource": "borewell",
  "last3Crops": ["Rice (धान)", "Wheat (गेहूं)", "Rice (धान)"],
  "currentCrop": "Wheat (गेहूं)",
  "plannedCrop": "Cotton (कपास)",
  "yieldTrend": "decreasing",
  "yieldDetails": "Yield dropped 20% last season",
  "testReason": "low-yield",
  "recentFertilizers": ["Urea (यूरिया)", "DAP"],
  "recentPesticides": ["Insecticides (कीटनाशक)"],
  "season": "rabi"
}
```

---

## Integration with Soil Analysis

### Metadata Enrichment
The farmer context is merged with image metadata before upload:

```typescript
const enrichedMetadata = {
  ...metadata,  // Regular metadata (location, timestamp, etc.)
  farmerContext: farmerContext || undefined
};

await uploadImage(file, 'soil', enrichedMetadata, onProgress);
```

### Backend Usage
The backend can use this context to:

1. **Adjust nutrient recommendations** based on:
   - Recent fertilizer use
   - Crop history (nutrient depletion patterns)
   - Current season (critical nutrients)

2. **Provide location-specific advice**:
   - Regional soil type expectations
   - Common deficiencies in the area
   - Water quality considerations

3. **Prioritize analysis focus**:
   - Test reason = "low-yield" → Deep dive into deficiencies
   - Test reason = "routine" → General health check

4. **Historical tracking**:
   - Compare with previous tests from same location
   - Track yield trends over time

---

## UI Features

### Progress Indicator
- Visual progress bar showing `Step X of 7`
- Percentage completion: `(step + 1) / 7 * 100%`

### Validation
Each step validates required fields before allowing "Next":
- Step 1: Must select test reason
- Step 2: Must enter state, district, town
- Step 3: Must select water source
- Step 4: Must add at least 1 crop
- Step 5: Must select yield trend
- Step 6: Must add at least 1 fertilizer
- Step 7: Auto-validated (season auto-detected)

### Skip Option
- Visible on every step
- Allows farmers to start analysis immediately
- Can complete questionnaire later

### Bilingual Support
- All questions available in English and Hindi
- Crop names shown as: `Rice (धान)`
- Season names translated

### Responsive Design
- Mobile-first layout
- Large touch targets for buttons
- Single-column grid on mobile
- Two-column grid on desktop (where applicable)

---

## User Flow Diagram

```
Login
  ↓
Check localStorage for questionnaire data
  ↓
  ├─ Data exists → Skip questionnaire → Soil Analysis
  │
  └─ No data → Show Questionnaire
       ↓
       Step 1: Test Reason
       ↓
       Step 2: Location (State → District → Town → Village)
       ↓
       Step 3: Water Source
       ↓
       Step 4: Crop History (Last 3-4 crops)
       ↓
       Step 5: Yield Trends
       ↓
       Step 6: Fertilizer/Pesticide History
       ↓
       Step 7: Season Confirmation
       ↓
       Save to localStorage
       ↓
       Proceed to Soil Analysis (with context)
```

---

## Benefits of This Approach

### 1. **Personalized Recommendations**
- Nutrient advice tailored to farmer's specific situation
- Considers what's already been applied

### 2. **Location-Aware**
- Regional soil patterns
- Local water quality issues
- Climate-specific advice

### 3. **Crop-Specific**
- Recommendations based on current/planned crops
- Addresses nutrient depletion from previous crops

### 4. **Seasonal Relevance**
- Critical nutrients for current growing season
- Timing of fertilizer application

### 5. **Historical Context**
- Yield trends indicate severity of issues
- Track improvement over time

### 6. **One-Time Setup**
- Stored in localStorage for future sessions
- Can be updated when farmer's situation changes

---

## Future Enhancements

### 1. Backend Persistence
- Store farmer context in database (linked to user account)
- Sync across devices
- Historical trend analysis

### 2. Smart Recommendations
- Machine learning based on:
  - Location patterns (similar farms)
  - Crop rotation analysis
  - Yield correlation with soil health

### 3. Reminder System
- Notify farmers when to retest soil (6-12 months)
- Seasonal reminders for critical nutrients

### 4. Expanded Location Data
- Add more states, districts, towns
- GPS integration for precise location
- Nearby water body detection

### 5. Crop Calendar Integration
- Suggest optimal testing times based on crop cycle
- Pre-season soil preparation advice

### 6. Fertilizer Calculator
- Recommend exact quantities based on:
  - Soil test results
  - Farm size
  - Crop nutrient requirements

---

## Technical Implementation

### Files Modified
1. **`FarmerQuestionnaire.tsx`** (NEW)
   - 7-step questionnaire component
   - 800+ lines of code
   - Bilingual support (EN/HI)

2. **`app/analyze/page.tsx`** (UPDATED)
   - Added questionnaire flow logic
   - localStorage integration
   - Context passing to CaptureAndAnalyze

3. **`CaptureAndAnalyze.tsx`** (UPDATED)
   - Accepts `farmerContext` prop
   - Merges context with upload metadata
   - Displays location/season in header

### Dependencies
- **framer-motion**: Smooth page transitions
- **lucide-react**: Icons for each step
- **React hooks**: useState, useEffect

### State Management
- Component-level state for questionnaire progress
- localStorage for persistence
- Props for passing context to analysis component

---

## Testing Scenarios

### Scenario 1: New Farmer
```
Login (first time)
  ↓
Questionnaire appears
  ↓
Complete all 7 steps
  ↓
Data saved to localStorage
  ↓
Proceed to soil analysis
  ↓
Context visible in header: "📍 Ludhiana, Punjab • rabi"
```

### Scenario 2: Returning Farmer
```
Login (returning)
  ↓
Check localStorage → Data exists
  ↓
Skip questionnaire
  ↓
Directly to soil analysis with stored context
```

### Scenario 3: Skip Questionnaire
```
Login (first time)
  ↓
Questionnaire appears
  ↓
Click "Skip for now"
  ↓
Proceed to analysis without context
  ↓
Can complete questionnaire later (add feature)
```

### Scenario 4: Logout Clears Data
```
Logout
  ↓
localStorage.removeItem('saral-mitti-farmer-context')
  ↓
Next login → Questionnaire appears again
```

---

## API Integration

### Upload Request with Context
```javascript
POST /api/upload

{
  "image": File,
  "imageType": "soil",
  "metadata": {
    "timestamp": "2025-11-19T10:30:00Z",
    "location": { "latitude": 30.9, "longitude": 75.85 },
    "farmerContext": {
      "state": "Punjab",
      "district": "Ludhiana",
      "town": "Jagraon",
      "waterSource": "borewell",
      "last3Crops": ["Rice (धान)", "Wheat (गेहूं)", "Rice (धान)"],
      "yieldTrend": "decreasing",
      "testReason": "low-yield",
      "recentFertilizers": ["Urea (यूरिया)", "DAP"],
      "season": "rabi"
    }
  }
}
```

### Backend Processing
The Django backend can extract farmer context and use it to:

```python
def analyze_soil_with_context(image, metadata):
    context = metadata.get('farmerContext', {})
    
    # Adjust analysis based on context
    if context.get('yieldTrend') == 'decreasing':
        # Deep dive into deficiencies
        focus = 'nutrient_deficiency'
    
    if 'Urea' in context.get('recentFertilizers', []):
        # Skip nitrogen recommendations
        exclude = ['nitrogen']
    
    if context.get('season') == 'rabi':
        # Prioritize phosphorus for wheat
        priority = ['phosphorus', 'potassium']
    
    # Location-based adjustments
    if context.get('waterSource') == 'borewell':
        # Check for salinity
        check_salinity = True
    
    return customized_analysis(image, focus, exclude, priority)
```

---

## Conclusion

The **Farmer Questionnaire** transforms Saral Mitti from a generic soil testing tool into an **intelligent, context-aware agricultural advisory system**. By collecting 7 critical data points in a user-friendly flow, we can provide:

✅ **Personalized** nutrient recommendations  
✅ **Location-specific** soil health advice  
✅ **Crop-optimized** fertilizer suggestions  
✅ **Season-appropriate** timing guidance  
✅ **Cost-effective** recommendations (avoid redundant inputs)  

This makes soil testing more **actionable**, **relevant**, and **valuable** for Indian farmers. 🌾🇮🇳
