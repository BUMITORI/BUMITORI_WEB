import { useState } from "react";
import * as S from "./mobileS";
import Header from "../../shared/components/Header";
import SubmitModal from "../../shared/components/Modal";

const NotAdmit = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [reasonText, setReasonText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReasonText(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const isSubmitDisabled = !(selectedButton && reasonText.trim() !== "");

  return (
    <>
      <Header />
      <S.NotAdmitLayout>
        <S.NotAdmitContainer>
          <S.TitleBox>
            <S.Title>미입소 사유</S.Title>
          </S.TitleBox>
          <S.SubTitle>B306호 강민지</S.SubTitle>
          <S.FormContainer>
            <S.DateChoice>
              <S.ReasonText>미입소 날짜</S.ReasonText>
              <S.DateInput 
                type="date"
                id="date"
                max="2025-12-29"
                min={new Date().toISOString().slice(0, 10)}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </S.DateChoice>
            <S.ReasonChoice>
              <S.ReasonText>사유선택</S.ReasonText>
              <S.ButtonBox>
                {['병결','체험활동','대회활동','기타'].map(item => (
                  <S.Button
                    key={item}
                    isSelected={selectedButton === item}
                    onClick={() => handleButtonClick(item)}
                  >
                    {item}
                  </S.Button>
                ))}
              </S.ButtonBox>
            </S.ReasonChoice>
            <S.ReasonExplain>
              <S.ReasonText>구체적인 설명</S.ReasonText>
              <S.ReasonTextArea
                value={reasonText}
                onChange={handleTextChange}
                placeholder="구체적인 설명을 입력해주세요."
              />
            </S.ReasonExplain>
          </S.FormContainer>
          <S.SubmitButton disabled={isSubmitDisabled} onClick={handleSubmit}>
            제출하기
          </S.SubmitButton>
        </S.NotAdmitContainer>
      </S.NotAdmitLayout>
      {isModalOpen && (
        <SubmitModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default NotAdmit;