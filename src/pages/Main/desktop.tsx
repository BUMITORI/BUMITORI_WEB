import * as D from "./desktopS";
import { useNavigate } from "react-router-dom";
import Header from "../../shared/components/Header";
import WholeBtn from "../../shared/components/WholeBtn";
import Status from "../../shared/components/Status";
import theme from "../../shared/style/theme";
import Dropdown from "../../shared/components/Dropdown"
import { getJoinStatus } from "../../hooks/getJoinStatus";

type Props = {
    selectedFloor: any;
    setSelectedFloor: any;
    selectedCategory: any;
    setSelectedCategory: any;
  };

export const Desktop = ({selectedFloor, setSelectedFloor, selectedCategory, setSelectedCategory}: Props) => {
  const navigate = useNavigate();
  const StudentDetail = [
    {
      studentId: 1,
      name: "강민지",
      roomId: 304,
      building: "A",
      gender: "여",
      enterStatus: 2,
      enterTime: "3월 12일 (일) 6:40:55",
    },
    {
      studentId: 2,
      name: "김시연",
      roomId: 304,
      building: "A",
      gender: "여",
      enterStatus: 3,
      enterTime: "3월 12일 (일) 6:40:55",
    },
    {
      studentId: 3,
      name: "정소울",
      roomId: 405,
      building: "A",
      gender: "남",
      enterStatus: 2,
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

  return (
    <D.Layout>
      <Header />
      <D.MainContainer>
        <D.RightContainer>
          <D.TitleContainer>
            <D.TextContainer>
              <D.Title>출석리스트</D.Title>
              <D.Date>2025년 3월 첫째주</D.Date>
            </D.TextContainer>
            <Dropdown/>

          </D.TitleContainer>
          <D.RightWholeBtnContainer>
            {["전체", "남학생", "여학생", "미입소자"].map((category) => (
              <WholeBtn
                key={category}
                text={category}
                isSelected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </D.RightWholeBtnContainer>
          <D.StudentListContainer>
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
          </D.StudentListContainer>

        </D.RightContainer>
        <D.Line />
        <D.LeftContainer>
          {[
            "전체",
            "A동 기숙사 2층",
            "A동 기숙사 3층",
            "B동 기숙사 3층",
            "B동 기숙사 4층",
          ].map((floor) => (
            <D.FloorBtn
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              style={{
                color: selectedFloor === floor ? theme.blue : theme.gray200,
              }}
            >
              {floor}
            </D.FloorBtn>
          ))}
          <D.NoJoinBtn onClick={() => navigate("/not-admit")}>
            미입소 등록
          </D.NoJoinBtn>
        </D.LeftContainer>
      </D.MainContainer>
    </D.Layout>
  );
};

