import * as S from "./style";
import Header from "../../shared/components/Header";
import WholeBtn from "../../shared/components/WholeBtn";
import Status from "../../shared/components/Status";
import { useState } from "react";
import theme from "../../shared/style/theme";

const Main = () => {
  const [selectedFloor, setSelectedFloor] = useState("전체");

  const StudentDetail = [
    {
      studentId: 1,
      name: "강민지",
      roomId: 304,
      building: "A",
      gender: "여",
      enterStatus: 1,
      enterTime: "3월 12일 (일) 6:40:55",
    },
    {
      studentId: 2,
      name: "김시연",
      roomId: 304,
      building: "A",
      gender: "여",
      enterStatus: 1,
      enterTime: "3월 12일 (일) 6:40:55",
    },
    {
      studentId: 3,
      name: "정소울",
      roomId: 405,
      building: "A",
      gender: "남",
      enterStatus: 1,
      enterTime: "3월 12일 (일) 6:40:55",
    },
    {
      studentId: 4,
      name: "조윤소",
      roomId: 205,
      building: "B",
      gender: "여",
      enterStatus: 1,
      enterTime: "3월 12일 (일) 6:40:55",
    },
    {
      studentId: 5,
      name: "강민지",
      roomId: 305,
      building: "B",
      gender: "남",
      enterStatus: 1,
      enterTime: "3월 12일 (일) 6:40:55",
    },
  ];

  const getJoinStatus = (enterStatus: number) => {
    switch (enterStatus) {
      case 1:
        return "입소완료";
      case 2:
        return "입소전";
      case 3:
        return "미입소";
      default:
        return "";
    }
  };

  return (
    <S.Layout>
      <Header />
      <S.MainContainer>
        <S.RightContainer>
          <S.TextContainer>
            <S.Title>출석리스트</S.Title>
            <S.Date>2025년 3월 첫째주</S.Date>
          </S.TextContainer>
          <S.RightWholeBtnContainer>
            <WholeBtn text="전체" />
            <WholeBtn text="남학생" />
            <WholeBtn text="여학생" />
            <WholeBtn text="미입소자" />
          </S.RightWholeBtnContainer>
          <S.StudentListContainer>
            {StudentDetail.map((student) => (
              <Status
                key={student.studentId}
                joinStatus={getJoinStatus(student.enterStatus)}
                name={student.name}
                roomNumber={student.roomId}
                building={student.building}
                date={student.enterTime}
              />
            ))}
          </S.StudentListContainer>
        </S.RightContainer>
        <S.Line />
        <S.LeftContainer>
          {[
            "전체",
            "A동 기숙사 2층",
            "A동 기숙사 3층",
            "B동 기숙사 3층",
            "B동 기숙사 4층",
          ].map((floor) => (
            <S.FloorBtn
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              style={{
                color: selectedFloor === floor ? theme.blue : theme.gray200,
              }}
            >
              {floor}
            </S.FloorBtn>
          ))}
          <S.NoJoinBtn>미입소 등록</S.NoJoinBtn>
        </S.LeftContainer>
      </S.MainContainer>
    </S.Layout>
  );
};

export default Main;
