const GoogleOAuthButton = () => {
  // Retrieve the client ID and redirect URI from env
  const redirectUri = `http://bumitori.duckdns.org:8080/oauth2/authorization/google`;

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
