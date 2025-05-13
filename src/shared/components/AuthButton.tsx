import React from 'react';

/**
 * Google OAuth Login Button Component
 *
 * Uses environment variables:
 * - VITE_GOOGLE_CLIENT_ID: Google OAuth client ID (from Vite)
 * - REACT_APP_REDIRECT_URI: OAuth2 redirect URI (from CRA or process.env)
 */
const GoogleOAuthButton = () => {
  // Retrieve the client ID and redirect URI from env
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const redirectUri = `${backendUrl}/oauth2/authorization/google`;

  const handleLogin = () => {

    const authUrl = 
      `${redirectUri}`

    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        fontSize: '1rem'
      }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google logo"
        style={{ width: '20px', height: '20px', marginRight: '0.5rem' }}
      />
      Sign in with Google
    </button>
  );
};

export default GoogleOAuthButton;
