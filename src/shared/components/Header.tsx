import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AuthButton from "./AuthButton";

import SmallLogo from "../../assets/smallLogo.svg";
import NoAlarmImg from "../../assets/noAlarm.svg";
import AlarmImg from "../../assets/alarm.svg";
import theme from "../style/theme";

interface HeaderProps {
  isAlarm?: boolean;
}

interface UserInfo {
  userId: number;
  email: string;
  name: string;
  role: string;
  rfid: string;
  studentNo: number;
  roomId: string;
  gender: string;
  username: string;
}

const Layout = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  padding: 16px 200px;
  border-bottom: 1px solid ${theme.gray100};

  @media (max-width: 900px) {
    padding: 12px 30px;
    text-align: left;
  }
`;
const Logo = styled.img`
  cursor: pointer;
  @media (max-width: 900px) {
    width: 64px;
  }
`;
const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;
const Alarm = styled.img`
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const UserRole = styled.span`
  font-size: 12px;
  color: ${theme.gray400};
  font-weight: 500;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.gray600};
`;

const LogoutButton = styled.button`
  background: none;
  border: solid lightgray 1px;

  color: black;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: red;
    color: white;
  }
`;

const Header = ({ isAlarm }: HeaderProps) => {
  const navigate = useNavigate();
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.get('https://bumitori.duckdns.org:8080/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error('사용자 정보를 가져오는데 실패했습니다:', error);
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

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Layout>
      <Logo src={SmallLogo} onClick={() => navigate("/")}/>
      <DetailContainer>
        {isAlarm ? <Alarm src={AlarmImg} onClick={() => navigate("/alarm")}/> : <Alarm src={NoAlarmImg}  onClick={() => navigate("/alarm")}/>}
        {hasToken && userInfo ? (
          <UserInfo>
            <UserRole>{getRoleText(userInfo.role)} • {userInfo.roomId}</UserRole>
            <UserName>{userInfo.name}님</UserName>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserInfo>
        ) : !hasToken ? (
          <AuthButton />
        ) : null}
      </DetailContainer>
    </Layout>
  );
};

export default Header;
