import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SmallLogo from "../../assets/smallLogo.svg";
import AlarmImg from "../../assets/alarm.svg";
import NoAlarmImg from "../../assets/noAlarm.svg";
import { Pretendard } from "../style/font";
import theme from "../style/theme";
import AuthButton from "./AuthButton";
import type { UserInfo } from "../types";
import { userApi } from "../services/api";
import { getToken, clearStorage } from "../utils";

interface HeaderProps {
  isAlarm?: boolean;
}

const Layout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background-color: ${theme.white};
  border-bottom: 1px solid ${theme.gray100};
  min-height: 60px;

  @media (max-width: 900px) {
    padding: 16px 20px;
  }
`;

const Logo = styled.img`
  cursor: pointer;
  height: 28px;
  width: auto;

  @media (max-width: 900px) {
    height: 24px;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Alarm = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const UserRole = styled.span`
  ${Pretendard.Body3}
  color: ${theme.gray300};
  font-weight: 500;
`;

const UserName = styled.span`
  ${Pretendard.Body2}
  color: ${theme.black};
  font-weight: 600;
`;

const LogoutButton = styled.button`
  ${Pretendard.Body3}
  color: ${theme.gray300};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.red};
  }
`;

const Header = ({ isAlarm = false }: HeaderProps) => {
  const navigate = useNavigate();
  const hasToken = !!getToken();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserInfo = async () => {
    if (!hasToken) return;

    setIsLoading(true);
    try {
      const data = await userApi.getUserInfo();
      setUserInfo(data);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      // If user info fetch fails, clear token and redirect to login
      clearStorage();
      navigate('/auth/login');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasToken) {
      fetchUserInfo();
    }
  }, [hasToken]);

  const getRoleText = (role: string) => {
    return role === 'ADMIN' ? '관리자' : '학생';
  };

  const handleLogout = async () => {
    try {
      await userApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearStorage();
    window.location.reload();
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleAlarmClick = () => {
    navigate("/alarm");
  };

  return (
    <Layout>
      <Logo src={SmallLogo} onClick={handleLogoClick} alt="Logo" />
      <DetailContainer>
        <Alarm 
          src={isAlarm ? AlarmImg : NoAlarmImg} 
          onClick={handleAlarmClick}
          alt="Alarm"
        />
        {hasToken && userInfo && !isLoading ? (
          <UserInfo>
            <UserRole>
              {getRoleText(userInfo.role)} • {userInfo.roomId}
            </UserRole>
            <UserName>{userInfo.name}님</UserName>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserInfo>
        ) : hasToken && isLoading ? (
          <UserInfo>
            <UserRole>로딩 중...</UserRole>
          </UserInfo>
        ) : !hasToken ? (
          <AuthButton />
        ) : null}
      </DetailContainer>
    </Layout>
  );
};

export default Header;
