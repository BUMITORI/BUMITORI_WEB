import * as M from "./mobile.style";
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
    studentList: any[];
    isError: boolean;
};

export const Mobile = ({selectedFloor, setSelectedFloor, selectedCategory, setSelectedCategory, studentList, isError}: Props) => {
  const navigate = useNavigate();

  // Filtering logic
  // Category filtering
  const categoryFiltered = studentList.filter((student) => {
    if (selectedCategory === "전체") return true;
    if (selectedCategory === "남학생") return student.gender === "M" || student.gender === "남";
    if (selectedCategory === "여학생") return student.gender === "W" || student.gender === "여";
    if (selectedCategory === "미입소자") return student.enterStatus === "NON_ENTER";
    return true;
  });
  
  // Floor filtering
  const filteredList = categoryFiltered.filter((student) => {
    if (selectedFloor === "전체") return true;
    if (selectedFloor === "A동 2층") return student.roomPrefix === "A" && String(student.roomNumber).startsWith("2");
    if (selectedFloor === "A동 3층") return student.roomPrefix === "A" && String(student.roomNumber).startsWith("3");
    if (selectedFloor === "B동 3층") return student.roomPrefix === "B" && String(student.roomNumber).startsWith("3");
    if (selectedFloor === "B동 4층") return student.roomPrefix === "B" && String(student.roomNumber).startsWith("4");
    return true;
  });

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
            <Dropdown selectedFloor={selectedFloor} setSelectedFloor={setSelectedFloor} />
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
            {isError ? (
              <div>로그인이 필요합니다</div>
            ) : (
              filteredList.map((student, idx) => (
                <Status
                  key={idx}
                  joinStatus={getJoinStatus(student.enterStatus)}
                  name={student.name}
                  roomNumber={String(student.roomNumber)}
                  date={student.enterTime ? new Date(student.enterTime).toLocaleString() : ""}
                />
              ))
            )}
          </M.StudentListContainer>
          <M.NoJoinBtn onClick={() => navigate("/not-admit")}>미입소 신청</M.NoJoinBtn>
        </M.RightContainer>
      </M.MainContainer>
    </M.Layout>
  );
};

