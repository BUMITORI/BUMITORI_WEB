import AlarmBox from "../../shared/components/AlarmBox";
import Header from "../../shared/components/Header";
import * as S from "./style";

interface AdminMainProps {
  date: string;
}

const AdminMain = ({ date }: AdminMainProps) => {
  const AlarmDetail = [
    {
      id: 1,
      isAlarm: "알림",
      name: "강민지",
      roomNumber: 405,
      date: "4월 5일",
    },
    {
      id: 2,
      isAlarm: "알림",
      name: "김시연",
      roomNumber: 406,
      date: "4월 5일",
    },
    {
      id: 3,
      isAlarm: "알림",
      name: "정수환",
      roomNumber: 407,
      date: "4월 5일",
    },
    {
      id: 4,
      isAlarm: "알림",
      name: "정소울",
      roomNumber: 408,
      date: "4월 5일",
    },
    {
      id: 5,
      isAlarm: "알림",
      name: "이승현",
      roomNumber: 409,
      date: "4월 5일",
    },
    {
      id: 6,
      isAlarm: "알림",
      name: "추성우",
      roomNumber: 410,
      date: "4월 5일",
    },
  ];
  return (
    <>
      <Header />
      <S.Container>
        <S.Layout>
          <S.Title>미입소 신고 확인</S.Title>
          <S.Date>{date}</S.Date>
          <S.NoJoinListContainer>
            {AlarmDetail.map((detail) => (
              <AlarmBox
                isAlarm={detail.isAlarm}
                name={detail.name}
                roomNumber={detail.roomNumber}
                date={detail.date}
              />
            ))}
          </S.NoJoinListContainer>
        </S.Layout>
      </S.Container>
    </>
  );
};

export default AdminMain;
