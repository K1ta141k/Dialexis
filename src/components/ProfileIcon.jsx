import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import authService from '../services/authService';
import googleAuthService from '../services/googleAuth';
import '../styles/components/ProfileIcon.css';

const ProfileIcon = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const popupRef = useRef(null);
  const iconRef = useRef(null);

  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for OAuth callback token
        const tempToken = googleAuthService.getTempToken();
        if (tempToken) {
          // Complete the login with the token
          await authService.loginWithGoogle(tempToken);
        }

        // Check for OAuth callback (Google redirects with access_token in URL fragment)
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = urlParams.get('access_token');

        if (accessToken) {
          // Process the access token from Google OAuth callback
          try {
            await authService.loginWithGoogle(accessToken);
            const userInfo = await authService.getUserInfo();
            setUser(userInfo);
            setIsLoggedIn(true);

            // Clear the URL fragment
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch (error) {
            setError('Failed to process login. Please try again.');
          }
        }

        await authService.initializeAuth();
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsLoggedIn(true);
        }
      } catch (error) {
        // Error initializing auth
      }
    };

    initializeAuth();
  }, []);

  const handleProfileClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isPopupOpen &&
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Direct Google OAuth (like Flask implementation)
      googleAuthService.redirectToGoogleAuth();
    } catch (error) {
      // Login failed
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Logout from our API
      authService.logout();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      // Logout failed
    }
  };

  const renderPopup = () => {
    if (!isPopupOpen) return null;

    const popupContent = isLoggedIn && user ? (
      <div className="user-menu" ref={popupRef}>
        <div className="user-info">
          <div className="user-avatar">
            <img
              src={user.picture}
              alt={user.name}
              className="profile-picture"
            />
          </div>
          <div className="user-details">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
            <div className="login-status">
              <span className="status-indicator">●</span>
              <span className="status-text">Logged in</span>
            </div>
          </div>
        </div>
        <div className="user-actions">
          <button className="logout-btn" onClick={handleLogout} type="button">
            Sign Out
          </button>
        </div>
      </div>
    ) : (
      <div className="login-popup" ref={popupRef}>
        <div className="popup-content">
          <h3>Sign In</h3>
          <p>Choose your login method</p>
          {error && <div className="error-message">{error}</div>}
          <button
            className="google-login-btn"
            onClick={handleGoogleLogin}
            type="button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner" />
            ) : (
              <svg className="google-icon" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            {isLoading ? 'Redirecting...' : 'Sign in with Google'}
          </button>
        </div>
      </div>
    );

    return createPortal(popupContent, document.body);
  };

  return (
    <div className="profile-container">
      <div
        className="profile-icon"
        onClick={handleProfileClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleProfileClick();
          }
        }}
        role="button"
        tabIndex={0}
        ref={iconRef}
      >
        {isLoggedIn && user ? (
          <img
            src={user.picture}
            alt={user.name}
            className="profile-picture"
          />
        ) : (
          <svg
            className="profile-svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        )}
      </div>

      {renderPopup()}
    </div>
  );
};

export default ProfileIcon;
