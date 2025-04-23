import styled from "styled-components";
import theme from "../../shared/style/theme";
import { Pretendard } from "../../shared/style/font";

export const Layout = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 60px 0;
  gap: 14px;
`;
export const HeaderText = styled.span`
  color: ${theme.black};
  ${Pretendard.Title1}
`;
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
