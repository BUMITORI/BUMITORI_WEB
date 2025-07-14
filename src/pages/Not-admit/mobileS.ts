import styled from "styled-components";
import { Pretendard } from "../../shared/style/font";
import theme from "../../shared/style/theme";

const BREAKPOINT = '900px';

export const NotAdmitLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NotAdmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 0px;
  width: 740px;
  margin: 0 auto;
  @media (max-width: ${BREAKPOINT}) {
    padding: 20px;
    width: 100%;
    margin: 0 auto;
  }
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: ${BREAKPOINT}) {
    gap: 8px;
  }
`;

export const Title = styled.p`
  ${Pretendard.Title1}
  color: ${theme.black};
  @media (max-width: ${BREAKPOINT}) {
    font-size: 1.5rem;
  }
`;

export const Date = styled.p`
  ${Pretendard.Body3}
  color: ${theme.gray300};
  font-weight: 600;

  @media (max-width: ${BREAKPOINT}) {
    font-size: 0.875rem;
  }
`;

export const SubTitle = styled.p`
  ${Pretendard.Body3}
  color: ${theme.gray300};
  @media (max-width: ${BREAKPOINT}) {
    font-size: 0.875rem;
  }
`;

export const FormContainer = styled.div`
  border-radius: 16px;
  border: 1px solid ${theme.gray100};
  padding: 32px;
  margin: 20px 0;

  @media (max-width: ${BREAKPOINT}) {
    padding: 16px;
  }
`;

export const DateChoice = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: ${BREAKPOINT}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 16px;
  }
`;

export const DateInput = styled.input`
  ${Pretendard.Body2}
  color: ${({ theme }) => theme.black};
  font-weight: 500;
  border: none;
  background-color: ${theme.gray50};
  padding: 8px;
  border-radius: 4px;

  @media (max-width: ${BREAKPOINT}) {
    width: 100%;
  }
`;

export const ReasonChoice = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;

  @media (max-width: ${BREAKPOINT}) {
    margin-bottom: 16px;
  }
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

  @media (max-width: ${BREAKPOINT}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

export const Button = styled.button<{ isSelected: boolean }>`
  ${Pretendard.Headline}
  color: ${({ isSelected }) => (isSelected ? theme.white : theme.gray400)};
  background-color: ${({ isSelected }) =>
    isSelected ? theme.blue : theme.gray50};
  font-weight: 600;
  border-radius: 8px;
  padding: 14px 24px;
  white-space: nowrap;
  border: none;
  cursor: pointer;

  width: auto;
  @media (max-width: ${BREAKPOINT}) {
    width: 100%;
    padding: 12px;
  }
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

  @media (max-width: ${BREAKPOINT}) {
    height: 150px;
  }
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
  ${Pretendard.Headline}
  color: ${({ disabled }) => (disabled ? theme.gray400 : theme.white)};
  background-color: ${({ disabled }) => (disabled ? theme.gray50 : theme.blue)};
  font-weight: 600;
  border-radius: 8px;
  padding: 14px 24px;
  white-space: nowrap;
  border: none;
  width: auto;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  @media (max-width: ${BREAKPOINT}) {
    width: 100%;
    padding: 12px;
  }
`;

export const ErrorMessage = styled.div`
  ${Pretendard.Body3}
  color: ${theme.red};
  margin: 8px 0;
  font-weight: 500;
`;

export const CharCount = styled.div`
  ${Pretendard.Body3}
  color: ${theme.gray300};
  text-align: right;
  margin-top: 8px;
  font-size: 0.75rem;
`;
