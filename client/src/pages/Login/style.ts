import styled from "styled-components";
import { Pretendard } from "../../shared/style/font";
import theme from "../../shared/style/theme";

export const Layout = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  border: 1px solid #dddddd;
  border-radius: 20px;
  background-color: ${theme.white};
  padding: 130px 70px;
  ${Pretendard.LargeTitle}
`;
export const LoginContainer = styled.div`
  display: flex;
  padding: 17.5px 100px;
  align-items: center;
  justify-content: center;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  ${Pretendard.Bnt1}
  position: relative;
  cursor: pointer;
`;
export const GoogleLogoImg = styled.img`
  position: absolute;
  left: 22px;
`;
export const GoLogin = styled.span`
  width: 100%;
  text-align: center;
`;
export const Precautions = styled.span`
  ${Pretendard.Body2}
  color: ${theme.gray300};
`;
