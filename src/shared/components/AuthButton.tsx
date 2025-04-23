import React, { useState } from 'react';
import { GoogleLogin, googleLogout, CredentialResponse } from '@react-oauth/google';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface GoogleJwtPayload extends JwtPayload {
  name: string;
  email: string;
  picture: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) return;
    const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
    setUser({
      id: decoded.sub as string,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <img src={user.picture} alt="프로필" width={32} height={32} />
          <span>안녕하세요, {user.name}님!</span>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('로그인 에러')} />
      )}
    </div>
  );
}