import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";

import SmallLogo from "../../assets/smallLogo.svg";
import NoAlarmImg from "../../assets/noAlarm.svg";
import AlarmImg from "../../assets/alarm.svg";
import theme from "../style/theme";

interface HeaderProps {
  isAlarm?: boolean;
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
const Profile = styled.img`
  cursor: pointer;
  @media (max-width: 900px) {
    width: 32px;
  }
`;
const Name = styled.span`
  font-family: "Pretendard-Regular";
  font-size: 14px;
`;

const Header = ({ isAlarm }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Logo src={SmallLogo} onClick={() => navigate("/")}/>
      <DetailContainer>
        {isAlarm ? <Alarm src={AlarmImg} onClick={() => navigate("/alarm")}/> : <Alarm src={NoAlarmImg}  onClick={() => navigate("/alarm")}/>}
        {/* <Profile src={ProfileImg} />
        <Name>강민지님</Name> */}
        <AuthButton />
      </DetailContainer>
    </Layout>
  );
};

export default Header;
