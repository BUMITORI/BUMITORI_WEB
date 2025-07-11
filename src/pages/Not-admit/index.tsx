import { useState } from "react";
import * as S from "./mobileS";
import Header from "../../shared/components/Header";
import SubmitModal from "../../shared/components/Modal";
import { useNavigate } from "react-router-dom";
import { absentApi } from "../../shared/services/api";
import { ABSENT_REASON_OPTIONS, REASON_TO_API_MAP } from "../../shared/constants";
import { getCurrentDate } from "../../shared/utils";

const NotAdmit = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [reasonText, setReasonText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    if (!isSubmitDisabled) {
      setIsModalOpen(true);
    }
  };

  const isSubmitDisabled = !(selectedButton && reasonText.trim() !== "") || isSubmitting;

  const handleModalSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const reasonKey = REASON_TO_API_MAP[selectedButton as keyof typeof REASON_TO_API_MAP];
      
      await absentApi.submitAbsentRequest({
        reason: reasonKey,
        specificReason: reasonText,
        absentDate: selectedDate,
      });

      setIsModalOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Failed to submit absent request:", err);
      alert("제출에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                min={getCurrentDate()}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </S.DateChoice>
            <S.ReasonChoice>
              <S.ReasonText>사유선택</S.ReasonText>
              <S.ButtonBox>
                {ABSENT_REASON_OPTIONS.map(item => (
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
            {isSubmitting ? "제출 중..." : "제출하기"}
          </S.SubmitButton>
        </S.NotAdmitContainer>
      </S.NotAdmitLayout>
      {isModalOpen && (
        <SubmitModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </>
  );
};

export default NotAdmit;