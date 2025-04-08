import styled from "styled-components";
import theme from "../../shared/style/theme";
import { Pretendard } from "../../shared/style/font";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  padding: 60px 0;
  align-items: center;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Title = styled.span`
  color: ${theme.black};
  ${Pretendard.Title1}
`;
export const Date = styled.span`
  color: ${theme.gray300};
  ${Pretendard.Title2}
`;
export const NoJoinListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
