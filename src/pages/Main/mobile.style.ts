import styled from "styled-components";
import { Pretendard } from "../../shared/style/font";
import theme from "../../shared/style/theme";

export const Layout = styled.main`
  display: flex;
  flex-direction: column;
`;

export const MainContainer = styled.div`
  display: flex;
  padding: 20px 0 200px 0;
  justify-content: center;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 0px;
  width: 90%;
`;
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0px;
`;

export const RightWholeBtnContainer = styled.div`
  padding-top: 20px;
  border-bottom: 1px solid ${theme.gray100};
  display: flex;
  justify-content: space-around;
`;

export const Title = styled.span`
  ${Pretendard.Title2}
  color: ${theme.black};
`;
export const Date = styled.span`
  ${Pretendard.Body3}
  color: ${theme.gray300};
`;

export const StudentListContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const WholeBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  ${Pretendard.Bnt2}
  color: ${theme.blue};
`;
export const FloorBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  ${Pretendard.Bnt2}


`;
export const NoJoinBtn = styled.button`
  border: none;
  background-color: ${theme.red};
  ${Pretendard.Bnt2}
  cursor: pointer;
  color: ${theme.white};
  padding: 12px;
  border-radius: 8px;
  width: 8rem;
  margin-top: 2rem;
  margin-left: auto;
`; 