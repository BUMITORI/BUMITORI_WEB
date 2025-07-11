import { useState } from "react";
import useMedia from 'use-media';
import * as S from "./style";
import Header from "../../shared/components/Header";
import Status from "../../shared/components/Status";
import Dropdown from "../../shared/components/Dropdown";
import WholeBtn from "../../shared/components/WholeBtn";
import { getJoinStatus } from "../../hooks/getJoinStatus";
import { useStudentList } from "../../shared/hooks/useStudentList";
import { useNavigate } from "react-router-dom";
import { 
  getCurrentWeekOfMonth, 
  getFilteredStudents, 
  getRole 
} from "../../shared/utils";
import { 
  FLOOR_OPTIONS, 
  MOBILE_FLOOR_OPTIONS, 
  CATEGORY_OPTIONS, 
  BREAKPOINTS 
} from "../../shared/constants";
import theme from "../../shared/style/theme";

const Main = () => {
  const navigate = useNavigate();
  const isMobile = useMedia({ maxWidth: BREAKPOINTS.MOBILE });
  
  const [selectedFloor, setSelectedFloor] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  
  const { studentList, isLoading, isError } = useStudentList();
  const role = getRole();
  
  // Get appropriate floor options based on screen size
  const floorOptions = isMobile ? MOBILE_FLOOR_OPTIONS : FLOOR_OPTIONS;
  
  // Filter students based on selected filters
  const filteredStudents = getFilteredStudents(
    studentList, 
    selectedCategory, 
    selectedFloor, 
    isMobile
  );

  const handleNavigateToAbsentPage = () => {
    if (role === 'ADMIN') {
      navigate("/admin-main");
    } else {
      navigate("/not-admit");
    }
  };

  const renderStudentList = () => {
    if (isLoading) {
      return (
        <S.LoadingMessage>
          데이터를 불러오는 중...
        </S.LoadingMessage>
      );
    }
    
    if (isError) {
      return (
        <S.ErrorMessage>
          로그인이 필요합니다
        </S.ErrorMessage>
      );
    }
    
    if (filteredStudents.length === 0) {
      return (
        <S.LoadingMessage>
          해당 조건에 맞는 학생이 없습니다.
        </S.LoadingMessage>
      );
    }

    return filteredStudents.map((student, idx) => (
      <Status
        key={`${student.roomPrefix}${student.roomNumber}-${idx}`}
        joinStatus={getJoinStatus(student.enterStatus)}
        name={student.name}
        roomNumber={String(student.roomNumber)}
        date={student.enterTime ? new Date(student.enterTime).toLocaleString() : ""}
      />
    ));
  };

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
            {isMobile && (
              <S.MobileDropdownContainer>
                <Dropdown 
                  selectedFloor={selectedFloor} 
                  setSelectedFloor={setSelectedFloor} 
                />
              </S.MobileDropdownContainer>
            )}
          </S.TitleContainer>

          <S.RightWholeBtnContainer>
            {CATEGORY_OPTIONS.map((category) => (
              <WholeBtn
                key={category}
                text={category}
                isSelected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </S.RightWholeBtnContainer>

          <S.StudentListContainer>
            {renderStudentList()}
          </S.StudentListContainer>

          {role && (
            <S.NoJoinBtn onClick={handleNavigateToAbsentPage}>
              {role === 'ADMIN' ? '미입소 확인' : '미입소 등록'}
            </S.NoJoinBtn>
          )}
        </S.RightContainer>

        <S.Line />

        <S.LeftContainer>
          {floorOptions.map((floor) => (
            <S.FloorBtn
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              style={{ 
                color: selectedFloor === floor ? theme.blue : theme.gray200 
              }}
            >
              {floor}
            </S.FloorBtn>
          ))}
          {role && (
            <S.NoJoinBtn onClick={handleNavigateToAbsentPage}>
              {role === 'ADMIN' ? '미입소 확인' : '미입소 등록'}
            </S.NoJoinBtn>
          )}
        </S.LeftContainer>
      </S.MainContainer>
    </S.Layout>
  );
};

export default Main;
