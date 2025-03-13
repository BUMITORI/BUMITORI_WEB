import styled from "styled-components";
import JoinCategory from "./JoinCategory";
import ChevronRightImg from "../../assets/chevronRight.svg";
import theme from "../style/theme";
import { Pretendard } from "../style/font";

interface StatusProps {
  joinStatus: string;
  roomNumber: number;
  building: string;
  name: string;
  date: string;
}

const Layout = styled.main`
  display: flex;
  width: fit-content;
  align-items: center;
  padding: 16px 20px;
  background-color: ${theme.gray50};
  border-radius: 16px;
  cursor: pointer;
`;
const StatusContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StudentInfo = styled.span`
  padding-left: 16px;
  ${Pretendard.Bnt2}
`;
const DateShow = styled.span`
  padding-left: 10px;
  ${Pretendard.caption}
  color: ${theme.gray200};
`;
const RightImg = styled.img`
  padding-left: 237px;
`;

const Status = ({
  joinStatus,
  roomNumber,
  building,
  name,
  date,
}: StatusProps) => {
  return (
    <Layout>
      <StatusContainer>
        <JoinCategory isJoin={joinStatus} />
        <StudentInfo>
          {building}
          {roomNumber}호 {name}
        </StudentInfo>
        <DateShow>{date}</DateShow>
      </StatusContainer>
      <RightImg src={ChevronRightImg} />
    </Layout>
  );
};

export default Status;
