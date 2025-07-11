import * as D from "./desktop.style";
import { useNavigate } from "react-router-dom";
import Header from "../../shared/components/Header";
import WholeBtn from "../../shared/components/WholeBtn";
import Status from "../../shared/components/Status";
import theme from "../../shared/style/theme";
import { getJoinStatus } from "../../hooks/getJoinStatus";

// API에서 받을 데이터 형태
interface StudentFromApi {
  name: string;
  roomPrefix: string;
  roomNumber: string;
  gender: string;
  enterStatus: string; // now string, e.g., "NON_ENTER"
  enterTime: string | null; // can be null
}

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

export const Desktop = ({ selectedFloor, setSelectedFloor, selectedCategory, setSelectedCategory, studentList, isError, isLoading }: Props) => {
  const navigate = useNavigate();

  // localStorage에서 role 가져오기
  const role = localStorage.getItem('role');

  // studentList가 배열인지 확인하고 안전하게 처리
  const safeStudentList = Array.isArray(studentList) ? studentList : [];
  
  console.log("Safe student list:", safeStudentList);
  console.log("Selected category:", selectedCategory);
  console.log("Selected floor:", selectedFloor);

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
    if (selectedFloor === "A동 기숙사 2층") return student.roomPrefix === "A" && String(student.roomNumber).startsWith("2");
    if (selectedFloor === "A동 기숙사 3층") return student.roomPrefix === "A" && String(student.roomNumber).startsWith("3");
    if (selectedFloor === "B동 기숙사 3층") return student.roomPrefix === "B" && String(student.roomNumber).startsWith("3");
    if (selectedFloor === "B동 기숙사 4층") return student.roomPrefix === "B" && String(student.roomNumber).startsWith("4");
    return true;
  });

  return (
    <D.Layout>
      <Header />
      <D.MainContainer>
        <D.RightContainer>
          <D.TitleContainer>
            <D.TextContainer>
              <D.Title>출석리스트</D.Title>
              <D.Date>{getCurrentWeekOfMonth()}</D.Date>
            </D.TextContainer>
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
            {isLoading ? (
              <D.ErrorMessage>
                데이터를 불러오는 중...
              </D.ErrorMessage>
            ) : isError ? (
              <D.ErrorMessage>
                로그인이 필요합니다
              </D.ErrorMessage>
            ) : (
              filteredList.map((student, idx) => (
                <Status
                  key={idx}
                  joinStatus={getJoinStatus(student.enterStatus)}
                  name={student.name}
                  roomNumber={`${student.roomNumber}`}
                  date={student.enterTime ? new Date(student.enterTime).toLocaleString() : ""}
                />
              ))
            )}
          </D.StudentListContainer>
        </D.RightContainer>

        <D.Line />

        <D.LeftContainer>
          {["전체", "A동 기숙사 2층", "A동 기숙사 3층", "B동 기숙사 3층", "B동 기숙사 4층"].map((floor) => (
            <D.FloorBtn
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              style={{ color: selectedFloor === floor ? theme.blue : theme.gray200 }}
            >
              {floor}
            </D.FloorBtn>
          ))}
          {role && (
            <D.NoJoinBtn 
              onClick={() => {
                if (role === 'ADMIN') {
                  navigate("/admin-main");
                } else {
                  navigate("/not-admit");
                }
              }}
            >
              {role === 'ADMIN' ? '미입소 확인' : '미입소 등록'}
            </D.NoJoinBtn>
          )}
        </D.LeftContainer>
      </D.MainContainer>
    </D.Layout>
  );
};

interface Props {
  selectedFloor: string;
  setSelectedFloor: (floor: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  studentList: StudentFromApi[];
  isError: boolean;
  isLoading: boolean;
}
