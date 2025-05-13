import styled from "styled-components";
import theme from "../../shared/style/theme";
import { Pretendard } from "../../shared/style/font";

export const Layout = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  
  @media (max-width: 900px) {
    padding: 0 16px;
    height: auto;
    min-height: 100vh;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 60px 0;
  gap: 14px;
  max-width: 840px;
  
  @media (max-width: 900px) {
    padding: 30px 0;
    gap: 10px;
    max-width: 100%;
  }
`;

export const HeaderText = styled.span`
  color: ${theme.black};
  ${Pretendard.Title1}
  
  @media (max-width: 900px) {
    font-size: 1.5rem;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  
  @media (max-width: 900px) {
    gap: 8px;
  }
`;
