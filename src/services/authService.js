import { AUTH_CONFIG } from '../config/auth';

const API_BASE_URL = AUTH_CONFIG.API_BASE_URL;

class AuthService {
  constructor() {
    this.accessToken = localStorage.getItem('access_token');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  // Get Google OAuth URL from backend
  async getGoogleAuthUrl() {
    const response = await fetch(`${API_BASE_URL}/auth/google-url`);
    if (!response.ok) {
      throw new Error('Failed to get Google auth URL');
    }
    const data = await response.json();
    return data.auth_url;
  }

  // Login with Google ID token
  async loginWithGoogle(idToken) {
    const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_token: idToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Google login failed');
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    localStorage.setItem('access_token', this.accessToken);

    // Get user info
    await this.getUserInfo();

    return data;
  }

  // Get current user information
  async getUserInfo() {
    if (!this.accessToken) {
      return null;
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      // Token might be expired
      this.logout();
      return null;
    }

    const user = await response.json();
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  // Check if user is logged in
  isLoggedIn() {
    return !!this.accessToken && !!this.user;
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Get access token
  getAccessToken() {
    return this.accessToken;
  }

  // Logout
  logout() {
    this.accessToken = null;
    this.user = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  // Initialize auth state (check for existing token)
  async initializeAuth() {
    if (this.accessToken) {
      try {
        await this.getUserInfo();
      } catch (error) {
        this.logout();
      }
    }
  }
}

export default new AuthService();
