import { useState } from "react";
import * as S from "./style";
import Header from "../../shared/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useAbsentDetail } from "../../shared/hooks/useAbsentDetail";
import { absentApi } from "../../shared/services/api";
import { REASON_MAP } from "../../shared/constants";

const NotAdmitAdmin = () => {
  const navigate = useNavigate();
  const { absentId } = useParams<{ absentId: string }>();
  const { absentDetail, isLoading, isError, error } = useAbsentDetail(absentId);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    if (!absentDetail || isProcessing || !absentId) return;

    setIsProcessing(true);
    try {
      await absentApi.approveAbsentRequest(absentId);
      alert('승인이 완료되었습니다.');
      navigate('/admin-main');
    } catch (err) {
      console.error('Failed to approve absent request:', err);
      alert('승인 처리에 실패했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin-main');
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <S.NotAdmitLayout>
          <S.NotAdmitContainer>
            <S.LoadingMessage>로딩 중...</S.LoadingMessage>
          </S.NotAdmitContainer>
        </S.NotAdmitLayout>
      </>
    );
  }

  if (isError || !absentDetail) {
    return (
      <>
        <Header />
        <S.NotAdmitLayout>
          <S.NotAdmitContainer>
            <S.ErrorMessage>
              {error || '데이터를 찾을 수 없습니다.'}
            </S.ErrorMessage>
          </S.NotAdmitContainer>
        </S.NotAdmitLayout>
      </>
    );
  }

  return (
    <>
      <Header />
      <S.NotAdmitLayout>
        <S.NotAdmitContainer>
          <S.TitleBox>
            <S.Title>미입소 신고 확인</S.Title>
          </S.TitleBox>
          <S.SubTitle>
            {absentDetail.roomPrefix}{absentDetail.roomNumber}호 {absentDetail.name}
          </S.SubTitle>
          <S.FormContainer>
            <S.DateChoice>
              <S.ReasonText>미입소 날짜</S.ReasonText>
              <S.DateDisplay>{absentDetail.absentDate}</S.DateDisplay>
            </S.DateChoice>
            <S.ReasonChoice>
              <S.ReasonText>사유선택</S.ReasonText>
              <S.ButtonBox>
                {Object.entries(REASON_MAP).map(([key, value]) => (
                  <S.Button
                    key={key}
                    isSelected={absentDetail.reason === key}
                    disabled={true}
                  >
                    {value}
                  </S.Button>
                ))}
              </S.ButtonBox>
            </S.ReasonChoice>
            <S.ReasonExplain>
              <S.ReasonText>구체적인 설명</S.ReasonText>
              <S.ReasonTextArea
                value={absentDetail.specificReason}
                readOnly
                placeholder="구체적인 설명"
              />
            </S.ReasonExplain>
          </S.FormContainer>
          <S.ButtonContainer>
            <S.ApproveButton onClick={handleApprove} disabled={isProcessing}>
              {isProcessing ? '처리중...' : '승인'}
            </S.ApproveButton>
            <S.CancelButton onClick={handleCancel} disabled={isProcessing}>
              취소
            </S.CancelButton>
          </S.ButtonContainer>
        </S.NotAdmitContainer>
      </S.NotAdmitLayout>
    </>
  );
};

export default NotAdmitAdmin; 