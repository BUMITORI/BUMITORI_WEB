import * as M from "./mobileS";
// import { useNavigate } from "react-router-dom";
import Header from "../../shared/components/Header";
import Status from "../../shared/components/Status";
import Dropdown from "../../shared/components/Dropdown"
import { getJoinStatus } from "../../hooks/getJoinStatus";
import WholeBtn from "../../shared/components/WholeBtn";
import { useNavigate } from "react-router-dom";

type Props = {
    selectedFloor: any;
    setSelectedFloor: any;
    selectedCategory: any;
    setSelectedCategory: any;
  };

export const Mobile = ({selectedFloor, setSelectedFloor, selectedCategory, setSelectedCategory}: Props) => {
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
    <M.Layout>
      <Header />
      <M.MainContainer>
        <M.RightContainer>
          <M.TitleContainer>
            <M.TextContainer>
              <M.Title>출석리스트</M.Title>
              <M.Date>2025년 3월 첫째주</M.Date>
            </M.TextContainer>
            <Dropdown/>

          </M.TitleContainer>
          <M.RightWholeBtnContainer>
            {["전체", "남학생", "여학생", "미입소자"].map((category) => (
              <WholeBtn
                key={category}
                text={category}
                isSelected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </M.RightWholeBtnContainer>
          <M.StudentListContainer>
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
          </M.StudentListContainer>
          <M.NoJoinBtn onClick={() => navigate("/not-admit")}>미입소 신청</M.NoJoinBtn>
        </M.RightContainer>
      </M.MainContainer>
    </M.Layout>
  );
};

