// api.ts
// API Helper Functions for Saral Mitti Backend Integration
// Django बैकएंड एकीकरण के लिए API सहायक कार्य

// ========================================
// CONFIGURATION - कॉन्फ़िगरेशन
// ========================================
// TODO: Set your Django backend URL here / यहां अपना Django बैकएंड URL सेट करें
const BASE_URL = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) || 'https://api.saralmitti.example.com';

// Mock mode - set to false when backend is ready
// मॉक मोड - बैकएंड तैयार होने पर false पर सेट करें
const USE_MOCK = !BASE_URL || BASE_URL.includes('example.com');

// ========================================
// TOKEN MANAGEMENT - टोकन प्रबंधन
// ========================================
/**
 * Retrieve JWT token from storage
 * स्टोरेज से JWT टोकन प्राप्त करें
 * 
 * TODO: Replace with your secure token retrieval method
 * TODO: अपनी सुरक्षित टोकन पुनर्प्राप्ति विधि से बदलें
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  // Option 1: localStorage (current implementation)
  // विकल्प 1: localStorage (वर्तमान कार्यान्वयन)
  return localStorage.getItem('jwt_token');
  
  // Option 2: Secure cookie (recommended for production)
  // विकल्प 2: सुरक्षित कुकी (उत्पादन के लिए अनुशंसित)
  // return document.cookie.split('; ').find(row => row.startsWith('jwt_token='))?.split('=')[1] || null;
  
  // Option 3: Use your auth context/provider
  // विकल्प 3: अपने auth context/provider का उपयोग करें
  // return useAuthStore.getState().token;
}

// ========================================
// TYPE DEFINITIONS - प्रकार परिभाषाएं
// ========================================

// Farmer context collected from questionnaire
export interface FarmerContext {
  state: string;
  district: string;
  town: string;
  village?: string;
  waterSource: 'river' | 'borewell' | 'canal' | 'rainwater' | 'pond' | 'other';
  waterSourceDetails?: string;
  last3Crops: string[];
  currentCrop?: string;
  plannedCrop?: string;
  yieldTrend: 'increasing' | 'stable' | 'decreasing' | 'first-time';
  yieldDetails?: string;
  testReason: 'routine' | 'low-yield' | 'disease' | 'new-crop' | 'other';
  testReasonDetails?: string;
  recentFertilizers: string[];
  recentPesticides: string[];
  season: 'kharif' | 'rabi' | 'zaid' | 'summer';
}

export interface UploadMetadata {
  location?: string;
  previousCrop?: string;
  irrigationType?: 'rain' | 'canal' | 'borewell';
  farmerContext?: FarmerContext;
  [key: string]: any;
}

export interface UploadResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  message?: string;
}

export interface SoilAnalysis {
  soilType: string;
  pH: number;
  nitrogen: number;  // percentage
  phosphorus: number;  // percentage
  potassium: number;  // percentage
  organicMatter: number;  // percentage
  moisture: number;  // percentage
  healthScore: number;  // 0-100
  confidence: number;  // 0-100
}

export interface CropRecommendation {
  name: string;
  nameHindi: string;
  suitability: number;  // 0-100
  expectedYield: number;  // quintals per hectare
  growthPeriod: number;  // days
  waterNeeds: 'low' | 'medium' | 'high';
  icon?: string;
}

export interface AnalysisResult {
  id: string;
  status: 'completed';
  soil: SoilAnalysis;
  crops: CropRecommendation[];
  timestamp: string;
}

export interface ProgressCallback {
  (progress: number): void;
}

// ========================================
// UPLOAD IMAGE - छवि अपलोड करें
// ========================================
/**
 * Upload soil image to backend with progress tracking
 * प्रगति ट्रैकिंग के साथ बैकएंड पर मिट्टी की छवि अपलोड करें
 * 
 * @param file - Image file to upload
 * @param type - Analysis type ('soil' or 'crop')
 * @param metadata - Optional metadata (location, crop history, etc.)
 * @param onProgress - Progress callback (0-100)
 * @param token - Optional JWT token (auto-retrieved if not provided)
 */
export async function uploadImage(
  file: File,
  type: 'soil' | 'crop' = 'soil',
  metadata?: UploadMetadata,
  onProgress?: ProgressCallback,
  token?: string
): Promise<UploadResponse> {
  
  // Mock implementation for demo / डेमो के लिए मॉक कार्यान्वयन
  if (USE_MOCK) {
    return new Promise((resolve) => {
      // Simulate upload progress / अपलोड प्रगति का अनुकरण करें
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (onProgress) onProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            resolve({
              id: `mock-${Date.now()}`,
              status: 'processing',
              message: 'Image uploaded successfully (mock mode)'
            });
          }, 300);
        }
      }, 150);
    });
  }
  
  // Real implementation / वास्तविक कार्यान्वयन
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    // Add image file / छवि फ़ाइल जोड़ें
    formData.append('image', file);
    formData.append('type', type);
    
    // Add metadata if provided / यदि प्रदान किया गया है तो मेटाडेटा जोड़ें
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }
    
    // Track upload progress / अपलोड प्रगति ट्रैक करें
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        const percentComplete = (e.loaded / e.total) * 100;
        onProgress(Math.round(percentComplete));
      }
    });
    
    // Handle completion / पूर्णता संभालें
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response: UploadResponse = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (err) {
          reject(new Error('Invalid response format'));
        }
      } else {
        reject(new Error(`Upload failed: ${xhr.statusText}`));
      }
    });
    
    // Handle errors / त्रुटियां संभालें
    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });
    
    xhr.addEventListener('abort', () => {
      reject(new Error('Upload cancelled'));
    });
    
    // Set auth header if token available / यदि टोकन उपलब्ध है तो auth हेडर सेट करें
    const authToken = token || getAuthToken();
    if (authToken) {
      xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
    }
    
    // Open connection and send / कनेक्शन खोलें और भेजें
    xhr.open('POST', `${BASE_URL}/api/analyze/upload`);
    xhr.send(formData);
  });
}

// ========================================
// POLL RESULT - परिणाम पोल करें
// ========================================
/**
 * Poll for analysis result with exponential backoff
 * एक्सपोनेंशियल बैकऑफ के साथ विश्लेषण परिणाम के लिए पोल करें
 * 
 * @param id - Analysis job ID
 * @param token - Optional JWT token
 * @param maxAttempts - Maximum polling attempts (default: 30)
 * @param initialDelay - Initial delay in ms (default: 1000)
 */
export async function pollResult(
  id: string,
  token?: string,
  maxAttempts: number = 30,
  initialDelay: number = 1000
): Promise<AnalysisResult> {
  
  // Mock implementation / मॉक कार्यान्वयन
  if (USE_MOCK || id.startsWith('mock-')) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockResult(id));
      }, 2500); // Simulate processing time / प्रोसेसिंग समय का अनुकरण करें
    });
  }
  
  // Real implementation with exponential backoff
  // एक्सपोनेंशियल बैकऑफ के साथ वास्तविक कार्यान्वयन
  let attempts = 0;
  let delay = initialDelay;
  
  const poll = async (): Promise<AnalysisResult> => {
    attempts++;
    
    if (attempts > maxAttempts) {
      throw new Error('Analysis timeout - maximum polling attempts reached');
    }
    
    try {
      const authToken = token || getAuthToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      const response = await fetch(`${BASE_URL}/api/analyze/result/${id}`, {
        method: 'GET',
        headers,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch result: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // If still processing, wait and retry / यदि अभी भी प्रोसेसिंग है, तो प्रतीक्षा करें और पुनः प्रयास करें
      if (result.status === 'processing') {
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Exponential backoff: increase delay after 20 seconds
        // एक्सपोनेंशियल बैकऑफ: 20 सेकंड के बाद देरी बढ़ाएं
        if (attempts * delay > 20000) {
          delay = Math.min(delay * 1.5, 5000);
        }
        
        return poll();
      }
      
      // If failed, throw error / यदि विफल, तो त्रुटि फेंकें
      if (result.status === 'failed') {
        throw new Error(result.message || 'Analysis failed');
      }
      
      // Return completed result / पूर्ण परिणाम लौटाएं
      return result as AnalysisResult;
      
    } catch (error) {
      if (attempts < maxAttempts) {
        // Retry on network error / नेटवर्क त्रुटि पर पुनः प्रयास करें
        await new Promise(resolve => setTimeout(resolve, delay));
        return poll();
      }
      throw error;
    }
  };
  
  return poll();
}

// ========================================
// MOCK DATA - मॉक डेटा
// ========================================
/**
 * Generate mock result for demo purposes
 * डेमो उद्देश्यों के लिए मॉक परिणाम उत्पन्न करें
 */
function getMockResult(id: string): AnalysisResult {
  const mockSoilTypes = ['Loamy', 'Clay', 'Sandy', 'Silt'];
  const randomSoil = mockSoilTypes[Math.floor(Math.random() * mockSoilTypes.length)];
  
  return {
    id,
    status: 'completed',
    timestamp: new Date().toISOString(),
    soil: {
      soilType: randomSoil,
      pH: 6.5 + Math.random() * 1.5,
      nitrogen: 0.8 + Math.random() * 0.4,
      phosphorus: 0.15 + Math.random() * 0.15,
      potassium: 0.3 + Math.random() * 0.3,
      organicMatter: 2.5 + Math.random() * 2,
      moisture: 15 + Math.random() * 15,
      healthScore: 70 + Math.random() * 25,
      confidence: 85 + Math.random() * 12,
    },
    crops: [
      {
        name: 'Wheat',
        nameHindi: 'गेहूं',
        suitability: 88 + Math.random() * 10,
        expectedYield: 35 + Math.random() * 10,
        growthPeriod: 120,
        waterNeeds: 'medium' as const,
        icon: '🌾',
      },
      {
        name: 'Rice',
        nameHindi: 'चावल',
        suitability: 75 + Math.random() * 15,
        expectedYield: 40 + Math.random() * 15,
        growthPeriod: 150,
        waterNeeds: 'high' as const,
        icon: '🌾',
      },
      {
        name: 'Lentils',
        nameHindi: 'दाल',
        suitability: 70 + Math.random() * 15,
        expectedYield: 15 + Math.random() * 8,
        growthPeriod: 95,
        waterNeeds: 'low' as const,
        icon: '🫘',
      },
      {
        name: 'Cotton',
        nameHindi: 'कपा���',
        suitability: 65 + Math.random() * 15,
        expectedYield: 25 + Math.random() * 10,
        growthPeriod: 180,
        waterNeeds: 'medium' as const,
        icon: '🌱',
      },
    ].sort((a, b) => b.suitability - a.suitability).slice(0, 3),
  };
}

// ========================================
// EXPORTS
// ========================================
export { USE_MOCK, BASE_URL };
export default { uploadImage, pollResult };
