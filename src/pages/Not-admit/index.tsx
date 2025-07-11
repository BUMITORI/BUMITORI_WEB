import { useState } from "react";
import * as S from "./mobileS";
import Header from "../../shared/components/Header";
import SubmitModal from "../../shared/components/Modal";
import { useNavigate } from "react-router-dom";
import { absentApi } from "../../shared/services/api";
import { ABSENT_REASON_OPTIONS, REASON_TO_API_MAP } from "../../shared/constants";
import { getCurrentDate, getToken } from "../../shared/utils";

const NotAdmit = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [reasonText, setReasonText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    setErrorMessage(""); // Clear error when user makes changes
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReasonText(e.target.value);
    setErrorMessage(""); // Clear error when user makes changes
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setErrorMessage(""); // Clear error when user makes changes
  };

  const validateForm = (): string | null => {
    // Check authentication
    if (!getToken()) {
      return "로그인이 필요합니다.";
    }

    // Check required fields
    if (!selectedButton) {
      return "사유를 선택해주세요.";
    }

    if (!reasonText.trim()) {
      return "구체적인 설명을 입력해주세요.";
    }

    if (reasonText.trim().length < 5) {
      return "구체적인 설명을 최소 5자 이상 입력해주세요.";
    }

    if (!selectedDate) {
      return "미입소 날짜를 선택해주세요.";
    }

    // Check if reason mapping exists
    const reasonKey = REASON_TO_API_MAP[selectedButton as keyof typeof REASON_TO_API_MAP];
    if (!reasonKey) {
      return "올바르지 않은 사유입니다. 다시 선택해주세요.";
    }

    // Check date validity
    const selectedDateObj = new Date(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDateObj < today) {
      return "과거 날짜는 선택할 수 없습니다.";
    }

    return null;
  };

  const handleSubmit = () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    
    setIsModalOpen(true);
  };

  const isSubmitDisabled = isSubmitting;

  const handleModalSubmit = async () => {
    if (isSubmitting) return;

    // Final validation before submission
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setIsModalOpen(false);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const reasonKey = REASON_TO_API_MAP[selectedButton as keyof typeof REASON_TO_API_MAP];
      
      console.log('📝 Form Data:', {
        selectedButton,
        reasonKey,
        reasonText: reasonText.trim(),
        selectedDate,
        textLength: reasonText.trim().length
      });

      if (!reasonKey) {
        throw new Error('Invalid reason selected');
      }
      
      await absentApi.submitAbsentRequest({
        reason: reasonKey,
        specificReason: reasonText.trim(),
        absentDate: selectedDate,
      });

      setIsModalOpen(false);
      alert("미입소 신청이 완료되었습니다.");
      navigate("/");
    } catch (err: any) {
      console.error("❌ Failed to submit absent request:", err);
      
      let errorMsg = "제출에 실패했습니다.";
      
      // Handle specific error cases
      if (err.response?.status === 400) {
        const responseData = err.response?.data;
        if (typeof responseData === 'string') {
          errorMsg = `요청 오류: ${responseData}`;
        } else if (responseData?.message) {
          errorMsg = `요청 오류: ${responseData.message}`;
        } else {
          errorMsg = "입력 데이터를 확인해주세요.";
        }
      } else if (err.response?.status === 401) {
        errorMsg = "로그인이 필요합니다.";
      } else if (err.response?.status === 403) {
        errorMsg = "권한이 없습니다.";
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      setErrorMessage(errorMsg);
      setIsModalOpen(false);
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
          
          {errorMessage && (
            <S.ErrorMessage>
              {errorMessage}
            </S.ErrorMessage>
          )}
          
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
                placeholder="구체적인 설명을 입력해주세요. (최소 5자)"
                maxLength={500}
              />
              <S.CharCount>
                {reasonText.length}/500
              </S.CharCount>
            </S.ReasonExplain>
          </S.FormContainer>
          <S.SubmitButton disabled={isSubmitDisabled} onClick={handleSubmit}>
            {isSubmitting ? "제출 중..." : "제출하기"}
          </S.SubmitButton>
        </S.NotAdmitContainer>
      </S.NotAdmitLayout>
      {isModalOpen && (
        <SubmitModal
          onClose={() => {
            if (!isSubmitting) {
              setIsModalOpen(false);
            }
          }}
          onSubmit={handleModalSubmit}
        />
      )}
    </>
  );
};

export default NotAdmit;