import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  profileImage?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // 쿠키 확인
        const hasAuthorizationCookie = document.cookie.includes('Authorization');
        console.log('Has Authorization cookie:', hasAuthorizationCookie);
        console.log('All cookies:', document.cookie);

        // Authorization 쿠키가 있으면 로그인된 것으로 간주
        if (hasAuthorizationCookie) {
          // 쿠키가 있으면 로그인된 것으로 간주하고 기본 사용자 정보 사용
          console.log('User is authenticated based on cookies');
          setUser({
            name: '사용자',
            email: 'user@example.com',
            profileImage: undefined
          });
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      // 여러 로그아웃 엔드포인트 시도
      try {
        await axios.post('https://bumitori.duckdns.org/logout', {}, {
          withCredentials: true
        });
      } catch (error) {
        try {
          await axios.post('https://bumitori.duckdns.org/api/auth/logout', {}, {
            withCredentials: true
          });
        } catch (error2) {
          console.log('Logout API not found, proceeding with client-side logout');
        }
      }
      
      setUser(null);
      setIsAuthenticated(false);
      // 쿠키 삭제
      document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = '_xsrf=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { user, isAuthenticated, isLoading, logout };
}; 