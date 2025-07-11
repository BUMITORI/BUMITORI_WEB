import Header from '../../shared/components/Header';
import styled from 'styled-components';
import theme from '../../shared/style/theme';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
`;

const ErrorMsg = styled.div`
  color: ${theme.red};
  font-size: 18px;
  text-align: center;
  margin-top: 60px;
`;



interface AbsentItem {
  id: number;
  name: string;
  room: string;
  date: string;
  status: '승인 전' | '승인 완료';
}

const AdminMain = () => {
  const navigate = useNavigate();
  const [absentList, setAbsentList] = useState<AbsentItem[]>([]);
  const [error, setError] = useState('');



  const fetchAbsentList = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('로그인이 필요합니다.');
      return;
    }
    try {
      const res = await axios.get('https://bumitori.duckdns.org/admin/absent', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = Array.isArray(res.data) ? res.data : [];
      const mapped = data.map((item: any) => ({
        id: item.absentId,
        name: item.name || `${item.room} ${item.studentName}` || '이름없음',
        room: item.room || '-',
        date: item.absentDate || '-',
        status: item.approval === true ? '승인 완료' : '승인 전' as '승인 전' | '승인 완료',
      }));
      setAbsentList(mapped);
      console.log(mapped)
    } catch (e) {
      setError('데이터를 불러오지 못했습니다.');
    }
  };

  let grouped = absentList.reduce((acc, cur) => {
    if (!acc[cur.date]) acc[cur.date] = [];
    acc[cur.date].push(cur);
    return acc;
  }, {} as Record<string, AbsentItem[]>);

  useEffect(() => {
    fetchAbsentList();
    grouped = absentList.reduce((acc, cur) => {
      if (!acc[cur.date]) acc[cur.date] = [];
      acc[cur.date].push(cur);
      return acc;
    }, {} as Record<string, AbsentItem[]>);
  }, []);

  // 날짜별 그룹핑


  useEffect(() => {
    console.log(grouped)
  }, [grouped])



  return (
    <Layout>
      <Header />
      <Container>
        <Title>미입소 신고 확인</Title>
        {error ? (
          <ErrorMsg>{error}</ErrorMsg>
        ) : (
          Object.keys(grouped).length === 0 ? (
            <div>신청 내역이 없습니다.</div>
          ) : (
            Object.entries(grouped).map(([date, list]) => (
              <div key={date}>
                <DateTitle>{date}</DateTitle>
                {list.map((item) => (
                  <Card key={item.id}>
                    <InfoBox>
                      <Label>🚨 미입소 신고</Label>
                      <Room>{item.name}</Room>
                    </InfoBox>
                    {item.status === '승인 전' ? (
                      <StatusBtn status={item.status} style={{cursor:'pointer'}} onClick={() => navigate(`/not-admit-admin/${item.id}`)}>
                        {item.status}
                      </StatusBtn>
                    ) : (
                      <StatusBtn status={item.status}>{item.status}</StatusBtn>
                    )}
                  </Card>
                ))}
              </div>
            ))
          )
        )}
      </Container>

    </Layout>
  );
};

export default AdminMain;