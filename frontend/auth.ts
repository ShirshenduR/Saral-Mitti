// auth.ts
// Authentication helper functions for Saral Mitti
// सरल मिट्टी के लिए प्रमाणीकरण सहायक कार्य

// ========================================
// CONFIGURATION - कॉन्फ़िगरेशन
// ========================================
const AUTH_BASE_URL = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) || 'https://api.saralmitti.example.com';
const USE_MOCK_AUTH = !AUTH_BASE_URL || AUTH_BASE_URL.includes('example.com');

// Storage keys
const TOKEN_KEY = 'jwt_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

// ========================================
// TYPE DEFINITIONS - प्रकार परिभाषाएं
// ========================================
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  farmLocation?: string;
  language?: 'en' | 'hi';
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  farmLocation?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface AuthError {
  message: string;
  field?: string;
}

// ========================================
// TOKEN MANAGEMENT - टोकन प्रबंधन
// ========================================

/**
 * Store authentication tokens
 * प्रमाणीकरण टोकन संग्रहीत करें
 */
export function setAuthTokens(token: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

/**
 * Get current access token
 * वर्तमान एक्सेस टोकन प्राप्त करें
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get refresh token
 * रिफ्रेश टोकन प्राप्त करें
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Clear all auth tokens
 * सभी auth टोकन साफ़ करें
 */
export function clearAuthTokens(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// ========================================
// USER MANAGEMENT - उपयोगकर्ता प्रबंधन
// ========================================

/**
 * Store user data
 * उपयोगकर्ता डेटा संग्रहीत करें
 */
export function setUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Get current user data
 * वर्तमान उपयोगकर्ता डेटा प्राप्त करें
 */
export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem(USER_KEY);
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated
 * जांचें कि क्या उपयोगकर्ता प्रमाणित है
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken() && !!getUser();
}

// ========================================
// API FUNCTIONS - API कार्य
// ========================================

/**
 * Login user with email and password
 * ईमेल और पासवर्ड के साथ उपयोगकर्ता लॉगिन करें
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // Mock implementation / मॉक कार्यान्वयन
  if (USE_MOCK_AUTH) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation / सरल मान्यता
        if (!credentials.email || !credentials.password) {
          reject({ message: 'Email and password are required' });
          return;
        }
        
        if (credentials.password.length < 6) {
          reject({ message: 'Invalid credentials' });
          return;
        }
        
        const mockUser: User = {
          id: 'user-' + Date.now(),
          email: credentials.email,
          name: credentials.email.split('@')[0],
          language: 'en',
          createdAt: new Date().toISOString(),
        };
        
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          user: mockUser,
        };
        
        resolve(mockResponse);
      }, 1000);
    });
  }
  
  // Real implementation / वास्तविक कार्यान्वयन
  const response = await fetch(`${AUTH_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  
  return response.json();
}

/**
 * Register new user
 * नया उपयोगकर्ता पंजीकृत करें
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  // Mock implementation / मॉक कार्यान्वयन
  if (USE_MOCK_AUTH) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validation / मान्यता
        if (!data.email || !data.password || !data.name) {
          reject({ message: 'Name, email, and password are required' });
          return;
        }
        
        if (data.password.length < 6) {
          reject({ message: 'Password must be at least 6 characters', field: 'password' });
          return;
        }
        
        const mockUser: User = {
          id: 'user-' + Date.now(),
          email: data.email,
          name: data.name,
          phone: data.phone,
          farmLocation: data.farmLocation,
          language: 'en',
          createdAt: new Date().toISOString(),
        };
        
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          user: mockUser,
        };
        
        resolve(mockResponse);
      }, 1200);
    });
  }
  
  // Real implementation / वास्तविक कार्यान्वयन
  const response = await fetch(`${AUTH_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  
  return response.json();
}

/**
 * Logout user
 * उपयोगकर्ता लॉगआउट करें
 */
export async function logout(): Promise<void> {
  const token = getAuthToken();
  
  // Clear local storage immediately / तुरंत स्थानीय संग्रहण साफ़ करें
  clearAuthTokens();
  
  // Notify backend (optional) / बैकएंड को सूचित करें (वैकल्पिक)
  if (!USE_MOCK_AUTH && token) {
    try {
      await fetch(`${AUTH_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      // Silently fail / चुपचाप विफल
      console.error('Logout API call failed:', error);
    }
  }
}

/**
 * Refresh access token
 * एक्सेस टोकन रिफ्रेश करें
 */
export async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  
  // Mock implementation / मॉक कार्यान्वयन
  if (USE_MOCK_AUTH) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newToken = 'mock-jwt-token-refreshed-' + Date.now();
        localStorage.setItem(TOKEN_KEY, newToken);
        resolve(newToken);
      }, 500);
    });
  }
  
  // Real implementation / वास्तविक कार्यान्वयन
  const response = await fetch(`${AUTH_BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });
  
  if (!response.ok) {
    clearAuthTokens();
    throw new Error('Token refresh failed');
  }
  
  const data = await response.json();
  localStorage.setItem(TOKEN_KEY, data.token);
  
  return data.token;
}

/**
 * Get user profile
 * उपयोगकर्ता प्रोफ़ाइल प्राप्त करें
 */
export async function getUserProfile(): Promise<User> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Not authenticated');
  }
  
  // Mock implementation / मॉक कार्यान्वयन
  if (USE_MOCK_AUTH) {
    const user = getUser();
    if (user) return Promise.resolve(user);
    throw new Error('User not found');
  }
  
  // Real implementation / वास्तविक कार्यान्वयन
  const response = await fetch(`${AUTH_BASE_URL}/api/auth/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      // Try to refresh token / टोकन रिफ्रेश करने का प्रयास करें
      try {
        await refreshAccessToken();
        return getUserProfile(); // Retry / पुनः प्रयास करें
      } catch {
        clearAuthTokens();
        throw new Error('Session expired');
      }
    }
    throw new Error('Failed to fetch profile');
  }
  
  const user = await response.json();
  setUser(user);
  
  return user;
}

// ========================================
// EXPORTS
// ========================================
export { USE_MOCK_AUTH, AUTH_BASE_URL };
export default {
  login,
  register,
  logout,
  refreshAccessToken,
  getUserProfile,
  isAuthenticated,
  getUser,
  setUser,
  getAuthToken,
  setAuthTokens,
  clearAuthTokens,
};
