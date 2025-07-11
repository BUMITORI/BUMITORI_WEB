import { useState, useEffect } from "react";
import * as S from "./style";
import Header from "../../shared/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface AbsentDetail {
  userId: number;
  absentId: number;
  name: string;
  roomPrefix: string;
  roomNumber: string;
  reason: string;
  specificReason: string;
  approval: boolean;
  absentDate: string;
}

const NotAdmitAdmin = () => {
  const navigate = useNavigate();
  const { absentId } = useParams<{ absentId: string }>();
  const [absentDetail, setAbsentDetail] = useState<AbsentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const reasonMap: { [key: string]: string } = {
    "SICK_LEAVE": "병결",
    "EXPERIENCE": "체험활동", 
    "CONTEST": "대회활동",
    "ETC": "기타"
  };

  useEffect(() => {
    fetchAbsentDetail();
  }, [absentId]);

  const fetchAbsentDetail = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://bumitori.duckdns.org/admin/absent/${absentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAbsentDetail(response.data);
    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!absentDetail || isProcessing) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    setIsProcessing(true);
    try {
      await axios.patch(
        `https://bumitori.duckdns.org/admin/absent/${absentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('승인이 완료되었습니다.');
      navigate('/admin-main');
    } catch (err) {
      alert('승인 처리에 실패했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin-main');
  };

  if (loading) {
    return (
      <>
        <Header />
        <S.NotAdmitLayout>
          <S.NotAdmitContainer>
            <div>로딩 중...</div>
          </S.NotAdmitContainer>
        </S.NotAdmitLayout>
      </>
    );
  }

  if (error || !absentDetail) {
    return (
      <>
        <Header />
        <S.NotAdmitLayout>
          <S.NotAdmitContainer>
            <div>{error || '데이터를 찾을 수 없습니다.'}</div>
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
          <S.SubTitle>{absentDetail.roomPrefix}{absentDetail.roomNumber}호 {absentDetail.name}</S.SubTitle>
          <S.FormContainer>
            <S.DateChoice>
              <S.ReasonText>미입소 날짜</S.ReasonText>
              <S.DateDisplay>{absentDetail.absentDate}</S.DateDisplay>
            </S.DateChoice>
            <S.ReasonChoice>
              <S.ReasonText>사유선택</S.ReasonText>
              <S.ButtonBox>
                {['병결','체험활동','대회활동','기타'].map(item => (
                  <S.Button
                    key={item}
                    isSelected={reasonMap[absentDetail.reason] === item}
                    disabled={true}
                  >
                    {item}
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