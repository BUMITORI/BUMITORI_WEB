import * as S from "./style";
import { useNavigate } from "react-router-dom";
import Header from "../../shared/components/Header";
import WholeBtn from "../../shared/components/WholeBtn";
import Status from "../../shared/components/Status";
import theme from "../../shared/style/theme";
import { getJoinStatus } from "../../hooks/getJoinStatus";
import { useStudentList } from "../../shared/hooks/useStudentList";
import { useState, useEffect } from "react";
import { Mobile } from "./mobile";

// 현재 주차를 계산하는 함수 (예전 방식)
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

const Main = () => {
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isMobile, setIsMobile] = useState(false);
  
  const { studentList, isLoading, isError } = useStudentList();

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // localStorage에서 role 가져오기
  const role = localStorage.getItem('role');

  // studentList가 배열인지 확인하고 안전하게 처리
  const safeStudentList = Array.isArray(studentList) ? studentList : [];
  
  console.log("Safe student list:", safeStudentList);
  console.log("Selected category:", selectedCategory);
  console.log("Selected floor:", selectedFloor);

  // 모바일 버전 렌더링
  if (isMobile) {
    return (
      <Mobile
        selectedFloor={selectedFloor}
        setSelectedFloor={setSelectedFloor}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        studentList={safeStudentList}
        isError={isError}
        isLoading={isLoading}
      />
    );
  }

  // 데스크탑 버전 렌더링
  // Category filtering (예전 방식)
  const categoryFiltered = safeStudentList.filter((student: any) => {
    if (selectedCategory === "전체") return true;
    if (selectedCategory === "남학생") return student.gender === "M" || student.gender === "남";
    if (selectedCategory === "여학생") return student.gender === "W" || student.gender === "여";
    if (selectedCategory === "미입소자") return student.enterStatus === "NON_ENTER";
    return true;
  });

  // Floor filtering (예전 방식)
  const filteredList = categoryFiltered.filter((student: any) => {
    if (selectedFloor === "전체") return true;
    if (selectedFloor === "A동 기숙사 2층") return student.roomPrefix === "A" && String(student.roomNumber).startsWith("2");
    if (selectedFloor === "A동 기숙사 3층") return student.roomPrefix === "A" && String(student.roomNumber).startsWith("3");
    if (selectedFloor === "B동 기숙사 3층") return student.roomPrefix === "B" && String(student.roomNumber).startsWith("3");
    if (selectedFloor === "B동 기숙사 4층") return student.roomPrefix === "B" && String(student.roomNumber).startsWith("4");
    return true;
  });

  return (
    <S.Layout>
      <Header />
      <S.MainContainer>
        <S.RightContainer>
          <S.TitleContainer>
            <S.TextContainer>
              <S.Title>출석리스트</S.Title>
              <S.Date>{getCurrentWeekOfMonth()}</S.Date>
            </S.TextContainer>
          </S.TitleContainer>

          <S.RightWholeBtnContainer>
            {["전체", "남학생", "여학생", "미입소자"].map((category) => (
              <WholeBtn
                key={category}
                text={category}
                isSelected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </S.RightWholeBtnContainer>

          <S.StudentListContainer>
            {isLoading ? (
              <S.ErrorMessage>
                데이터를 불러오는 중...
              </S.ErrorMessage>
            ) : isError ? (
              <S.ErrorMessage>
                로그인이 필요합니다
              </S.ErrorMessage>
            ) : (
              filteredList.map((student: any, idx: number) => (
                <Status
                  key={idx}
                  joinStatus={getJoinStatus(student.enterStatus)}
                  name={student.name}
                  roomNumber={`${student.roomNumber}`}
                  date={student.enterTime ? new Date(student.enterTime).toLocaleString() : ""}
                />
              ))
            )}
          </S.StudentListContainer>
        </S.RightContainer>

        <S.Line />

        <S.LeftContainer>
          {["전체", "A동 기숙사 2층", "A동 기숙사 3층", "B동 기숙사 3층", "B동 기숙사 4층"].map((floor) => (
            <S.FloorBtn
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              style={{ color: selectedFloor === floor ? theme.blue : theme.gray200 }}
            >
              {floor}
            </S.FloorBtn>
          ))}
          {role && (
            <S.NoJoinBtn 
              onClick={() => {
                if (role === 'ADMIN') {
                  navigate("/admin-main");
                } else {
                  navigate("/not-admit");
                }
              }}
            >
              {role === 'ADMIN' ? '미입소 확인' : '미입소 등록'}
            </S.NoJoinBtn>
          )}
        </S.LeftContainer>
      </S.MainContainer>
    </S.Layout>
  );
};

export default Main;
