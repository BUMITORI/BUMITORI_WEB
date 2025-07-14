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
    isLoading: boolean;
};

// 현재 주차를 계산하는 함수
const getCurrentWeekOfMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 0부터 시작하므로 +1
  
  // 해당 월의 첫 번째 날
  const firstDay = new Date(year, now.getMonth(), 1);
  // 현재 날짜
  const today = new Date(year, now.getMonth(), now.getDate());
  
  // 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ...)
  const firstDayOfWeek = firstDay.getDay();
  
  // 첫 번째 주의 시작일 (첫 번째 월요일)
  const firstMonday = new Date(firstDay);
  firstMonday.setDate(1 + (firstDayOfWeek === 0 ? 1 : 8 - firstDayOfWeek));
  
  // 오늘까지의 일수
  const daysDiff = Math.floor((today.getTime() - firstMonday.getTime()) / (1000 * 60 * 60 * 24));
  
  // 주차 계산 (1주차부터 시작)
  const weekNumber = Math.floor(daysDiff / 7) + 1;
  
  const weekNames = ["첫째", "둘째", "셋째", "넷째", "다섯째"];
  const weekName = weekNames[weekNumber - 1] || "다섯째";
  
  return `${year}년 ${month}월 ${weekName}주`;
};

export const Mobile = ({selectedFloor, setSelectedFloor, selectedCategory, setSelectedCategory, studentList, isError, isLoading}: Props) => {
  const navigate = useNavigate();

  // studentList가 배열인지 확인하고 안전하게 처리
  const safeStudentList = Array.isArray(studentList) ? studentList : [];

  const role = localStorage.getItem('role');

  // Filtering logic
  // Category filtering
  const categoryFiltered = safeStudentList.filter((student) => {
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
              <M.Date>{getCurrentWeekOfMonth()}</M.Date>
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
            {isLoading ? (
              <div>데이터를 불러오는 중...</div>
            ) : isError ? (
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
          {role && (
            <M.NoJoinBtn 
              onClick={() => {
                if (role === 'ADMIN') {
                  navigate("/admin-main");
                } else {
                  navigate("/not-admit");
                }
              }}
            >
              {role === 'ADMIN' ? '미입소 확인' : '미입소 등록'}
            </M.NoJoinBtn>
          )}
        </M.RightContainer>
      </M.MainContainer>
    </M.Layout>
  );
}; 