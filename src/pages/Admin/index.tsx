import Header from '../../shared/components/Header';
import styled from 'styled-components';
import theme from '../../shared/style/theme';
import { useNavigate } from 'react-router-dom';
import { useAbsentList } from '../../shared/hooks/useAbsentList';

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
`;

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 60px 0 100px 0;

  @media (max-width: 900px) {
    max-width: 100%;
    padding: 40px 10px 60px 10px;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
  margin-top: 0;
`;

const DateTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 40px 0 16px 0;
`;

const Card = styled.div`
  width: 100%;
  background: #fff;
  border: 1px solid ${theme.gray100};
  border-radius: 16px;
  padding: 24px 32px 20px 32px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);

  @media (max-width: 600px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  color: ${theme.red};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Room = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const StatusBtn = styled.div<{ status: '승인 전' | '승인 완료' }>`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: ${({ status }) => status === '승인 전' ? theme.red : theme.blue};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ status }) => status === '승인 전' ? 'pointer' : 'default'};
  transition: all 0.2s ease;

  &:hover {
    opacity: ${({ status }) => status === '승인 전' ? 0.9 : 1};
  }
`;

const ErrorMsg = styled.div`
  color: ${theme.red};
  font-size: 18px;
  text-align: center;
  margin-top: 60px;
`;

const LoadingMsg = styled.div`
  color: ${theme.gray300};
  font-size: 18px;
  text-align: center;
  margin-top: 60px;
`;

const EmptyMsg = styled.div`
  color: ${theme.gray300};
  font-size: 18px;
  text-align: center;
  margin-top: 60px;
`;

const AdminMain = () => {
  const navigate = useNavigate();
  const { groupedAbsentList, isLoading, isError, error } = useAbsentList();

  const handleStatusClick = (item: any) => {
    if (item.status === '승인 전') {
      navigate(`/not-admit-admin/${item.id}`);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingMsg>데이터를 불러오는 중...</LoadingMsg>;
    }

    if (isError) {
      return <ErrorMsg>{error || '데이터를 불러오지 못했습니다.'}</ErrorMsg>;
    }

    if (Object.keys(groupedAbsentList).length === 0) {
      return <EmptyMsg>신청 내역이 없습니다.</EmptyMsg>;
    }

    return Object.entries(groupedAbsentList).map(([date, list]) => (
      <div key={date}>
        <DateTitle>{date}</DateTitle>
        {list.map((item) => (
          <Card key={item.id}>
            <InfoBox>
              <Label>🚨 미입소 신고</Label>
              <Room>{item.name}</Room>
            </InfoBox>
            <StatusBtn 
              status={item.status}
              onClick={() => handleStatusClick(item)}
            >
              {item.status}
            </StatusBtn>
          </Card>
        ))}
      </div>
    ));
  };

  return (
    <Layout>
      <Header />
      <Container>
        <Title>미입소 신고 확인</Title>
        {renderContent()}
      </Container>
    </Layout>
  );
};

export default AdminMain;