import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const role = searchParams.get('role');
    
    if (token) {
      // 토큰을 localStorage에 저장
      localStorage.setItem('token', token);
      // role이 있으면 localStorage에 저장
      if (role) {
        localStorage.setItem('role', role);
      }
      // 메인 페이지로 리다이렉트
      navigate('/', { replace: true });
    } else {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      navigate('/login', { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '16px',
      color: '#666'
    }}>
      로그인 처리 중...
    </div>
  );
};

export default OAuthSuccess;