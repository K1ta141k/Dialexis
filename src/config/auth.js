// Authentication Configuration
export const AUTH_CONFIG = {
  // API Base URL
  API_BASE_URL: 'https://lexidrom-265984432299.us-central1.run.app',
  //API_BASE_URL: 'http://192.168.1.173:8000',
  // Token storage keys
  TOKEN_KEY: 'access_token',
  USER_KEY: 'user',
};

// OAuth Flow:
// 1. User clicks "Sign in with Google"
// 2. Frontend calls backend to get Google OAuth URL
// 3. User is redirected to Google OAuth
// 4. Google redirects back to backend with auth code
// 5. Backend exchanges code for tokens and redirects to frontend
// 6. Frontend receives token and completes login
