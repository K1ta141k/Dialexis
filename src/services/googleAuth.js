class GoogleAuthService {
  // Direct Google OAuth (like Flask implementation)
  redirectToGoogleAuth() {
    // Get Google Client ID from environment variables
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';

    if (!GOOGLE_CLIENT_ID) {
      throw new Error('REACT_APP_GOOGLE_CLIENT_ID is not configured in environment variables');
    }

    const authUrl = (
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      `client_id=${GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${FRONTEND_URL}/auth/callback&` +
      'response_type=token&' +
      'scope=openid%20email%20profile'
    );

    window.location.href = authUrl;
  }

  // Handle OAuth callback (extract token from URL)
  handleOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Store the token and redirect back to app
      localStorage.setItem('temp_oauth_token', token);
      window.location.href = window.location.origin;
      return token;
    }

    return null;
  }

  // Check if we have a temporary OAuth token
  getTempToken() {
    const token = localStorage.getItem('temp_oauth_token');
    if (token) {
      localStorage.removeItem('temp_oauth_token');
      return token;
    }
    return null;
  }
}

export default new GoogleAuthService();
