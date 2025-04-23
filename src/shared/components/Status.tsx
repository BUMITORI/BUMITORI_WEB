import styled from "styled-components";
import JoinCategory from "./JoinCategory";
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
  width: 100%;
  align-items: center;
  padding: 16px;
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
  padding-left: 16px;
  ${Pretendard.caption}
  color: ${theme.gray200};
`;
const TextContainer = styled.div`
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 4px;
  }
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
        <TextContainer>
          <StudentInfo>
            {building}
            {roomNumber}호 {name}
          </StudentInfo>
          <DateShow>{date}</DateShow>
        </TextContainer>
      </StatusContainer>
    </Layout>
  );
};

export default Status;
