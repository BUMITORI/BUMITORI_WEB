import { useState } from "react";
import * as S from "./style";
import Header from "../../shared/components/Header";
import SubmitModal from "../../shared/components/Modal";

const NotAdmit = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [reasonText, setReasonText] = useState<string>("");

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReasonText(e.target.value);
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
            <S.Date>2025년 3월 첫째주</S.Date>
          </S.TitleBox>
          <S.SubTitle>B306호 강민지</S.SubTitle>
          <S.FormContainer>
            <S.ReasonChoice>
              <S.ReasonText>사유선택</S.ReasonText>
              <S.ButtonBox>
                <S.Button
                  isSelected={selectedButton === "병결"}
                  onClick={() => handleButtonClick("병결")}
                >
                  병결
                </S.Button>
                <S.Button
                  isSelected={selectedButton === "체험활동"}
                  onClick={() => handleButtonClick("체험활동")}
                >
                  체험활동
                </S.Button>
                <S.Button
                  isSelected={selectedButton === "대회활동"}
                  onClick={() => handleButtonClick("대회활동")}
                >
                  대회활동
                </S.Button>
                <S.Button
                  isSelected={selectedButton === "기타"}
                  onClick={() => handleButtonClick("기타")}
                >
                  기타
                </S.Button>
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
      {/* 모달 닫기 */}
    </>
  );
};

export default NotAdmit;
