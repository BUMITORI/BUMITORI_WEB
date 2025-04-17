import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import SmallLogo from "../../assets/smallLogo.svg";
import NoAlarmImg from "../../assets/noAlarm.svg";
import AlarmImg from "../../assets/alarm.svg";
import ProfileImg from "../../assets/profile.svg";
import theme from "../style/theme";

interface HeaderProps {
  isAlarm?: boolean;
}

const Layout = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  padding: 19px 200px;
  border-bottom: 1px solid ${theme.gray100};
`;
const Logo = styled.img`
  cursor: pointer;
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
`;
const Name = styled.span`
  font-family: "Pretendard-Regular";
  font-size: 18px;
`;

const Header = ({ isAlarm }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Logo src={SmallLogo} onClick={() => navigate("/")}/>
      <DetailContainer>
        {isAlarm ? <Alarm src={AlarmImg} onClick={() => navigate("/alarm")}/> : <Alarm src={NoAlarmImg}  onClick={() => navigate("/alarm")}/>}
        <Profile src={ProfileImg} />
        <Name>강민지님</Name>
      </DetailContainer>
    </Layout>
  );
};

export default Header;
