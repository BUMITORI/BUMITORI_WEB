import styled from "styled-components";
import { Pretendard } from "../../shared/style/font";
import theme from "../../shared/style/theme";

export const NotAdmitLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NotAdmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 300px;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Title = styled.p`
  ${Pretendard.Title1}
  color: ${theme.black};
`;

export const Date = styled.p`
  ${Pretendard.Body3}
  color: ${theme.gray300};
  font-weight: 600;
`;

export const SubTitle = styled.p`
  ${Pretendard.Body3}
  color: ${theme.gray200};
  padding-top: 8px;
  font-weight: 600;
`;

export const FormContainer = styled.div`
  border-radius: 16px;
  border: 1px solid ${theme.gray100};
  padding: 32px;
  margin: 20px 0;
`;


export const DateChoice = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`

export const DateInput = styled.input`
  ${Pretendard.Body2}
  color: ${({ theme }) => theme.black};
  font-weight: 500;
  border: none;
  backgorund-color: ${theme.gray400};
  margin-bottom: 10px;
`;

export const ReasonChoice = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const ReasonText = styled.p`
  ${Pretendard.Headline}
  color: ${theme.black};
  font-weight: 600;
  margin-bottom: 10px;
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 16px;
`;

export const Button = styled.button<{ isSelected: boolean }>`
  ${Pretendard.Headline}
  color: ${({ isSelected }) => (isSelected ? theme.white : theme.gray400)};
  background-color: ${({ isSelected }) =>
    isSelected ? theme.blue : theme.gray50};
  font-weight: 600;
  border-radius: 8px;
  padding: 14px 70px;
  white-space: nowrap;
  border: none;
  width: 100%;
  text-align: center;
`;

export const ReasonExplain = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReasonTextArea = styled.textarea`
  height: 200px;
  width: 100%;
  padding: 16px 20px;
  border-radius: 8px;
  background-color: ${theme.gray50};
  border: none;

  ${Pretendard.Body1}
  color: ${theme.black};
  font-weight: 500;
  resize: none;
  overflow-y: auto;

  &::placeholder {
    color: ${theme.gray200};
  }
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
  ${Pretendard.Headline}
  color: ${({ disabled }) => (disabled ? theme.gray400 : theme.white)};
  background-color: ${({ disabled }) => (disabled ? theme.gray50 : theme.blue)};
  font-weight: 600;
  border-radius: 8px;
  padding: 14px 70px;
  white-space: nowrap;
  border: none;
  width: 100%;
  text-align: center;
`;
