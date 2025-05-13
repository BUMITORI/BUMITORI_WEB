import AlarmBox from "../../shared/components/AlarmBox";
import Header from "../../shared/components/Header";
import * as S from "./style";
import { useEffect, useState } from "react";

const Alarm = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <S.Layout>
      <Header />
      <div style={{ width:"100%", maxWidth:"700px", margin: "0 auto" }}>
        <S.MainContainer>
          <S.HeaderText>알림</S.HeaderText>
          {/* <S.Main>아직 알람이 없습니다.</S.Main> */}
          <S.Main>
            <AlarmBox
              isAlarm="공지"
              noticeText="오늘은 점호가 없는날입니다. 수고하세요"
            />
          </S.Main>
        </S.MainContainer>
      </div>
    </S.Layout>
  );
};

export default Alarm;
