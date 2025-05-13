import styled from "styled-components";
import alarmRedIcon from "../../assets/alarmRedIcon.svg";
import notice from "../../assets/notice.svg";
import theme from "../style/theme";
import { Pretendard } from "../style/font";
import NoJoinStatus from "./NoJoinStatus";

interface AlarmBoxProps {
  isAlarm: string;
  name?: string;
  roomNumber?: number;
  date?: string;
  noticeText?: string;
}

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 25.5px 26px;
  border-radius: 16px;
  gap: 4px;
  border: 1px solid ${theme.gray100};
  
  @media (max-width: 900px) {
    padding: 16px;
    gap: 2px;
  }
`;

const AlarmStatusContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 900px) {
    img {
      width: 18px;
      height: 18px;
    }
  }
`;

const AlarmInfo = styled.span`
  padding-left: 10px;
  ${Pretendard.Body3}
  color: ${theme.gray300};
  
  @media (max-width: 900px) {
    font-size: 12px;
    padding-left: 6px;
  }
`;

const AlarmTime = styled.span`
  font-family: Pretendard;
  font-size: 14px;
  color: #9e9e9e;
  margin-left: auto;
  
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

const StudentInfo = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${Pretendard.Body1}
  color: ${theme.black};
  
  @media (max-width: 900px) {
    font-size: 14px;
  }
`;

const AlarmBox = ({
  isAlarm,
  name,
  roomNumber,
  date,
  noticeText,
}: AlarmBoxProps) => {
  let alarmIcon = "";
  let alarmTitle = "";

  if (isAlarm === "알림") {
    alarmIcon = alarmRedIcon;
    alarmTitle = "미입소 신고";
  } else {
    alarmIcon = notice;
    alarmTitle = "공지사항";
  }
  return (
    <Layout>
      <AlarmStatusContainer>
        <img src={alarmIcon} />
        <AlarmInfo>{alarmTitle}</AlarmInfo>
        {isAlarm != "알림" && <AlarmTime>{date}</AlarmTime>}
      </AlarmStatusContainer>
      {isAlarm == "알림" ? (
        <StudentInfo>
          <span>
            {roomNumber}호 {name}
          </span>
          <NoJoinStatus noJoinStatus="승인 완료" />
        </StudentInfo>
      ) : (
        <StudentInfo>
          <span>{noticeText}</span>
        </StudentInfo>
      )}
    </Layout>
  );
};

export default AlarmBox;
