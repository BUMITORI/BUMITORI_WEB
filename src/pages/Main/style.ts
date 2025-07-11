import styled from "styled-components";
import { Pretendard } from "../../shared/style/font";
import theme from "../../shared/style/theme";

const BREAKPOINT = '900px';

export const Layout = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 60px);
  
  @media (max-width: ${BREAKPOINT}) {
    flex-direction: column;
  }
`;

export const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 60px 40px 40px 40px;
  
  @media (max-width: ${BREAKPOINT}) {
    padding: 20px;
  }
`;

export const LeftContainer = styled.div`
  width: 280px;
  padding: 60px 40px 40px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${theme.gray50};
  border-left: 1px solid ${theme.gray100};
  
  @media (max-width: ${BREAKPOINT}) {
    display: none;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  
  @media (max-width: ${BREAKPOINT}) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h1`
  ${Pretendard.Title1}
  color: ${theme.black};
  margin: 0;
  
  @media (max-width: ${BREAKPOINT}) {
    font-size: 1.5rem;
  }
`;

export const Date = styled.p`
  ${Pretendard.Body3}
  color: ${theme.gray300};
  margin: 0;
  
  @media (max-width: ${BREAKPOINT}) {
    font-size: 0.875rem;
  }
`;

export const RightWholeBtnContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  
  @media (max-width: ${BREAKPOINT}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
`;

export const StudentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 400px);
  
  @media (max-width: ${BREAKPOINT}) {
    max-height: none;
  }
`;

export const Line = styled.div`
  width: 1px;
  background: ${theme.gray100};
  
  @media (max-width: ${BREAKPOINT}) {
    display: none;
  }
`;

export const FloorBtn = styled.button`
  ${Pretendard.Body2}
  background: none;
  border: none;
  padding: 12px 16px;
  text-align: left;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.gray100};
  }
  
  &:active {
    background: ${theme.gray200};
  }
`;

export const NoJoinBtn = styled.button`
  ${Pretendard.Headline}
  color: ${theme.white};
  background: ${theme.red};
  font-weight: 600;
  border-radius: 8px;
  padding: 16px 24px;
  border: none;
  cursor: pointer;
  margin-top: auto;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    opacity: 0.8;
  }
  
  @media (max-width: ${BREAKPOINT}) {
    margin-top: 24px;
    width: 100%;
    padding: 12px;
  }
`;

export const ErrorMessage = styled.div`
  ${Pretendard.Body1}
  color: ${theme.red};
  text-align: center;
  padding: 40px 20px;
  background: ${theme.gray50};
  border-radius: 8px;
  border: 1px solid ${theme.gray100};
`;

export const LoadingMessage = styled.div`
  ${Pretendard.Body1}
  color: ${theme.gray300};
  text-align: center;
  padding: 40px 20px;
  background: ${theme.gray50};
  border-radius: 8px;
  border: 1px solid ${theme.gray100};
`;

export const MobileDropdownContainer = styled.div`
  display: none;
  
  @media (max-width: ${BREAKPOINT}) {
    display: block;
    margin-top: 16px;
  }
`; 