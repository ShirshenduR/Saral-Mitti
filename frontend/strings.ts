// strings.ts
// UI copy for Saral Mitti - English + Hindi (सरल मिट्टी - अंग्रेज़ी + हिंदी)

export type Language = 'en' | 'hi';

export const strings = {
  en: {
    // App & Branding
    appName: 'Saral Mitti',
    tagline: 'Smart Soil Analysis for Better Farming',
    
    // Landing Page
    landingHero: 'Transform Your Farming with AI-Powered Soil Analysis',
    landingSubtitle: 'Get instant insights about your soil health and personalized crop recommendations',
    landingGetStarted: 'Get Started Free',
    landingLearnMore: 'Learn More',
    landingFeature1Title: 'Instant Soil Analysis',
    landingFeature1Desc: 'Capture a photo and get results in seconds',
    landingFeature2Title: 'Smart Recommendations',
    landingFeature2Desc: 'AI-powered crop suggestions for your soil',
    landingFeature3Title: 'Track Your Progress',
    landingFeature3Desc: 'Monitor soil health over time',
    landingCTA: 'Start Analyzing Your Soil Today',
    landingCTAButton: 'Sign Up Now',
    
    // Authentication
    login: 'Login',
    register: 'Sign Up',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    name: 'Full Name',
    phone: 'Phone Number',
    farmLocation: 'Farm Location',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: 'Enter your password',
    namePlaceholder: 'Your full name',
    phonePlaceholder: '+91 98765 43210',
    farmLocationPlaceholder: 'Village, District',
    loginButton: 'Login',
    registerButton: 'Create Account',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    signUpLink: 'Sign up',
    loginLink: 'Login',
    rememberMe: 'Remember me',
    
    // Auth Errors
    authError: 'Authentication Error',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    nameRequired: 'Name is required',
    invalidEmail: 'Invalid email address',
    passwordTooShort: 'Password must be at least 6 characters',
    loginFailed: 'Login failed. Please check your credentials.',
    registerFailed: 'Registration failed. Please try again.',
    
    // Auth Success
    loginSuccess: 'Login successful!',
    registerSuccess: 'Account created successfully!',
    logoutSuccess: 'Logged out successfully',
    
    // Profile
    profile: 'Profile',
    myAnalyses: 'My Analyses',
    settings: 'Settings',
    welcome: 'Welcome',
    
    // Theme Toggle
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    themeToggleLabel: 'Toggle theme',
    themeChanged: 'Theme changed to',
    
    // Onboarding Modal
    onboardingTitle: 'Welcome to Saral Mitti',
    onboardingSubtitle: 'Analyze your soil in 3 simple steps',
    onboardingStep1: 'Capture a clear photo of your soil sample',
    onboardingStep2: 'Our AI analyzes soil properties instantly',
    onboardingStep3: 'Get personalized crop recommendations',
    onboardingCameraPermission: 'We need camera access to capture soil images',
    onboardingGetStarted: 'Get Started',
    onboardingSkip: 'Skip Tutorial',
    
    // Camera Controls
    captureTitle: 'Capture Soil Sample',
    captureInstruction: 'Position your soil sample in the frame',
    captureGuidance: 'Ensure good lighting and avoid shadows',
    captureButton: 'Capture Photo',
    captureCountdown: 'Photo in',
    captureRetake: 'Retake',
    captureUsePhoto: 'Use This Photo',
    captureUpload: 'Upload & Analyze',
    captureFileInput: 'Or upload from device',
    cameraDenied: 'Camera access denied',
    cameraDeniedMsg: 'Please enable camera permissions or upload a photo',
    
    // Upload Flow
    uploadPreparing: 'Preparing image...',
    uploadUploading: 'Uploading',
    uploadProcessing: 'Analyzing soil properties',
    uploadSuccess: 'Analysis complete!',
    uploadError: 'Upload failed',
    uploadRetry: 'Try Again',
    
    // Metadata Form
    metadataTitle: 'Additional Details (Optional)',
    metadataLocation: 'Location',
    metadataLocationPlaceholder: 'e.g., Village, District',
    metadataCropHistory: 'Previous Crop',
    metadataCropPlaceholder: 'e.g., Wheat, Rice',
    metadataIrrigation: 'Irrigation Type',
    metadataIrrigationRain: 'Rain-fed',
    metadataIrrigationCanal: 'Canal',
    metadataIrrigationBore: 'Borewell',
    metadataSkip: 'Skip',
    metadataContinue: 'Continue',
    
    // Results - Soil Analysis
    resultsTitle: 'Soil Analysis Results',
    resultsSoilHealth: 'Soil Health Score',
    resultsSoilType: 'Soil Type',
    resultsPH: 'pH Level',
    resultsNitrogen: 'Nitrogen (N)',
    resultsPhosphorus: 'Phosphorus (P)',
    resultsPotassium: 'Potassium (K)',
    resultsOrganic: 'Organic Matter',
    resultsMoisture: 'Moisture Content',
    resultsConfidence: 'Confidence',
    resultsOptimal: 'Optimal',
    resultsLow: 'Low',
    resultsHigh: 'High',
    resultsMedium: 'Medium',
    
    // Results - Crop Recommendations
    cropRecommendations: 'Recommended Crops',
    cropSuitability: 'Suitability',
    cropExpectedYield: 'Expected Yield',
    cropGrowthPeriod: 'Growth Period',
    cropWaterNeeds: 'Water Needs',
    cropWaterLow: 'Low',
    cropWaterMedium: 'Moderate',
    cropWaterHigh: 'High',
    cropPerHectare: 'quintals/hectare',
    cropDays: 'days',
    
    // Actions
    analyzeAnother: 'Analyze Another Sample',
    downloadReport: 'Download Report',
    shareResults: 'Share Results',
    viewHistory: 'View History',
    
    // Status Messages
    statusIdle: 'Ready to capture',
    statusCapturing: 'Capturing...',
    statusProcessing: 'Processing...',
    statusComplete: 'Complete',
    statusError: 'Error occurred',
    
    // Accessibility
    a11yLoading: 'Loading',
    a11yProcessing: 'Analysis in progress',
    a11yComplete: 'Analysis complete',
    a11yError: 'An error occurred',
    a11yProgress: 'Progress',
    
    // Errors
    errorCamera: 'Could not access camera',
    errorUpload: 'Upload failed. Please try again.',
    errorNetwork: 'Network error. Check your connection.',
    errorProcessing: 'Processing failed. Please retry.',
    errorGeneric: 'Something went wrong',
    
    // Mock Mode
    mockModeActive: 'Demo Mode Active',
    mockModeDescription: 'Using simulated results (backend not connected)',
  },
  
  hi: {
    // App & Branding
    appName: 'सरल मिट्टी',
    tagline: 'बेहतर खेती के लिए स्मार्ट मिट्टी विश्लेषण',
    
    // Landing Page
    landingHero: 'AI-संचालित मिट्टी विश्लेषण के साथ अपनी खेती को बदलें',
    landingSubtitle: 'अपनी मिट्टी के स्वास्थ्य के बारे में तुरंत जानकारी और व्यक्तिगत फसल सिफारिशें प्राप्त करें',
    landingGetStarted: 'मुफ्त शुरू करें',
    landingLearnMore: 'और जानें',
    landingFeature1Title: 'तुरंत मिट्टी विश्लेषण',
    landingFeature1Desc: 'एक फोटो लें और सेकंड में परिणाम प्राप्त करें',
    landingFeature2Title: 'स्मार्ट सिफारिशें',
    landingFeature2Desc: 'आपकी मिट्टी के लिए AI-संचालित फसल सुझाव',
    landingFeature3Title: 'अपनी प्रगति ट्रैक करें',
    landingFeature3Desc: 'समय के साथ मिट्टी के स्वास्थ्य की निगरानी करें',
    landingCTA: 'आज ही अपनी मिट्टी का विश्लेषण शुरू करें',
    landingCTAButton: 'अभी साइन अप करें',
    
    // Authentication
    login: 'लॉगिन',
    register: 'साइन अप',
    logout: 'लॉगआउट',
    email: 'ईमेल',
    password: 'पासवर्ड',
    name: 'पूरा नाम',
    phone: 'फोन नंबर',
    farmLocation: 'खेत स्थान',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    namePlaceholder: 'आपका पूरा नाम',
    phonePlaceholder: '+91 98765 43210',
    farmLocationPlaceholder: 'गांव, जिला',
    loginButton: 'लॉगिन',
    registerButton: 'खाता बनाएं',
    forgotPassword: 'पासवर्ड भूल गए?',
    noAccount: 'खाता नहीं है?',
    haveAccount: 'पहले से खाता है?',
    signUpLink: 'साइन अप करें',
    loginLink: 'लॉगिन करें',
    rememberMe: 'मुझे याद रखें',
    
    // Auth Errors
    authError: 'प्रमाणीकरण त्रुटि',
    emailRequired: 'ईमेल आवश्यक है',
    passwordRequired: 'पासवर्ड आवश्यक है',
    nameRequired: 'नाम आवश्यक है',
    invalidEmail: 'अमान्य ईमेल पता',
    passwordTooShort: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
    loginFailed: 'लॉगिन विफल। कृपया अपनी साख जांचें।',
    registerFailed: 'पंजीकरण विफल। कृपया पुनः प्रयास करें।',
    
    // Auth Success
    loginSuccess: 'लॉगिन सफल!',
    registerSuccess: 'खाता सफलतापूर्वक बनाया गया!',
    logoutSuccess: 'सफलतापूर्वक लॉगआउट किया गया',
    
    // Profile
    profile: 'प्रोफ़ाइल',
    myAnalyses: 'मेरे विश्लेषण',
    settings: 'सेटिंग्स',
    welcome: 'स्वागत है',
    
    // Theme Toggle
    themeLight: 'प्रकाश',
    themeDark: 'अंधेरा',
    themeSystem: 'सिस्टम',
    themeToggleLabel: 'थीम बदलें',
    themeChanged: 'थीम बदल गया',
    
    // Onboarding Modal
    onboardingTitle: 'सरल मिट्टी में आपका स्वागत है',
    onboardingSubtitle: '3 आसान चरणों में अपनी मिट्टी का विश्लेषण करें',
    onboardingStep1: 'अपने मिट्टी के नमूने की स्पष्ट तस्वीर लें',
    onboardingStep2: 'हमारी AI तुरंत मिट्टी के गुणों का विश्लेषण करती है',
    onboardingStep3: 'व्यक्तिगत फसल सिफारिशें प्राप्त करें',
    onboardingCameraPermission: 'मिट्टी की तस्वीरें लेने के लिए हमें कैमरा एक्सेस चाहिए',
    onboardingGetStarted: 'शुरू करें',
    onboardingSkip: 'ट्यूटोरियल छोड़ें',
    
    // Camera Controls
    captureTitle: 'मिट्टी का नमूना कैप्चर करें',
    captureInstruction: 'अपने मिट्टी के नमूने को फ्रेम में रखें',
    captureGuidance: 'अच्छी रोशनी सुनिश्चित करें और छाया से बचें',
    captureButton: 'फोटो लें',
    captureCountdown: 'फोटो में',
    captureRetake: 'फिर से लें',
    captureUsePhoto: 'इस फोटो का उपयोग करें',
    captureUpload: 'अपलोड करें और विश्लेषण करें',
    captureFileInput: 'या डिवाइस से अपलोड करें',
    cameraDenied: 'कैमरा एक्सेस अस्वीकृत',
    cameraDeniedMsg: 'कृपया कैमरा अनुमतियां सक्षम करें या फोटो अपलोड करें',
    
    // Upload Flow
    uploadPreparing: 'छवि तैयार की जा रही है...',
    uploadUploading: 'अपलोड हो रहा है',
    uploadProcessing: 'मिट्टी के गुणों का विश्लेषण किया जा रहा है',
    uploadSuccess: 'विश्लेषण पूर्ण!',
    uploadError: 'अपलोड विफल',
    uploadRetry: 'पुनः प्रयास करें',
    
    // Metadata Form
    metadataTitle: 'अतिरिक्त विवरण (वैकल्पिक)',
    metadataLocation: 'स्थान',
    metadataLocationPlaceholder: 'उदा., गांव, जिला',
    metadataCropHistory: 'पिछली फसल',
    metadataCropPlaceholder: 'उदा., गेहूं, चावल',
    metadataIrrigation: 'सिंचाई प्रकार',
    metadataIrrigationRain: 'वर्षा आधारित',
    metadataIrrigationCanal: 'नहर',
    metadataIrrigationBore: 'बोरवेल',
    metadataSkip: 'छोड़ें',
    metadataContinue: 'जारी रखें',
    
    // Results - Soil Analysis
    resultsTitle: 'मिट्टी विश्लेषण परिणाम',
    resultsSoilHealth: 'मिट्टी स्वास्थ्य स्कोर',
    resultsSoilType: 'मिट्टी का प्रकार',
    resultsPH: 'pH स्तर',
    resultsNitrogen: 'नाइट्रोजन (N)',
    resultsPhosphorus: 'फॉस्फोरस (P)',
    resultsPotassium: 'पोटैशियम (K)',
    resultsOrganic: 'जैविक पदार्थ',
    resultsMoisture: 'नमी सामग्री',
    resultsConfidence: 'आत्मविश्वास',
    resultsOptimal: 'इष्टतम',
    resultsLow: 'कम',
    resultsHigh: 'उच्च',
    resultsMedium: 'मध्यम',
    
    // Results - Crop Recommendations
    cropRecommendations: 'अनुशंसित फसलें',
    cropSuitability: 'उपयुक्तता',
    cropExpectedYield: 'अपेक्षित उपज',
    cropGrowthPeriod: 'विकास अवधि',
    cropWaterNeeds: 'पानी की जरूरत',
    cropWaterLow: 'कम',
    cropWaterMedium: 'मध्यम',
    cropWaterHigh: 'उच्च',
    cropPerHectare: 'क्विंटल/हेक्टेयर',
    cropDays: 'दिन',
    
    // Actions
    analyzeAnother: 'एक और नमूना विश्लेषण करें',
    downloadReport: 'रिपोर्ट डाउनलोड करें',
    shareResults: 'परिणाम साझा करें',
    viewHistory: 'इतिहास देखें',
    
    // Status Messages
    statusIdle: 'कैप्चर के लिए तैयार',
    statusCapturing: 'कैप्चर कर रहे हैं...',
    statusProcessing: 'प्रोसेसिंग...',
    statusComplete: 'पूर्ण',
    statusError: 'त्रुटि हुई',
    
    // Accessibility
    a11yLoading: 'लोड हो रहा है',
    a11yProcessing: 'विश्लेषण प्रगति पर है',
    a11yComplete: 'विश्लेषण पूर्ण',
    a11yError: 'एक त्रुटि हुई',
    a11yProgress: 'प्रगति',
    
    // Errors
    errorCamera: 'कैमरा एक्सेस नहीं कर सके',
    errorUpload: 'अपलोड विफल। कृपया पुनः प्रयास करें।',
    errorNetwork: 'नेटवर्क त्रुटि। अपना कनेक्शन जांचें।',
    errorProcessing: 'प्रोसेसिंग विफल। कृपया पुनः प्रयास करें।',
    errorGeneric: 'कुछ गलत हुआ',
    
    // Mock Mode
    mockModeActive: 'डेमो मोड सक्रिय',
    mockModeDescription: 'सिमुलेटेड परिणाम का उपयोग (बैकएंड कनेक्टेड नहीं)',
  }
};

export default strings;
