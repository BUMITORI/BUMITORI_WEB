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
  background-color: ${theme.gray50};

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

export const DateDisplay = styled.div`
  ${Pretendard.Body2}
  color: ${theme.black};
  font-weight: 500;
  background-color: ${theme.white};
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${theme.gray100};

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

export const Button = styled.button<{ isSelected: boolean; disabled?: boolean }>`
  ${Pretendard.Headline}
  color: ${({ isSelected, disabled }) => 
    disabled 
      ? (isSelected ? theme.white : theme.gray300) 
      : (isSelected ? theme.white : theme.gray400)
  };
  background-color: ${({ isSelected, disabled }) =>
    disabled 
      ? (isSelected ? theme.gray300 : theme.gray100) 
      : (isSelected ? theme.blue : theme.gray50)
  };
  font-weight: 600;
  border-radius: 8px;
  padding: 14px 24px;
  white-space: nowrap;
  border: none;
  cursor: not-allowed;
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};

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
  background-color: ${theme.white};
  border: 1px solid ${theme.gray100};
  cursor: not-allowed;
  opacity: 0.8;

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

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;

  @media (max-width: ${BREAKPOINT}) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const ApproveButton = styled.button<{ disabled?: boolean }>`
  ${Pretendard.Headline}
  color: ${({ disabled }) => (disabled ? theme.gray400 : theme.white)};
  background-color: ${({ disabled }) => (disabled ? theme.gray100 : theme.blue)};
  font-weight: 600;
  border-radius: 8px;
  padding: 14px 32px;
  white-space: nowrap;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  min-width: 120px;

  @media (max-width: ${BREAKPOINT}) {
    width: 100%;
    padding: 12px;
  }
`;

export const CancelButton = styled.button<{ disabled?: boolean }>`
  ${Pretendard.Headline}
  color: ${({ disabled }) => (disabled ? theme.gray300 : theme.gray400)};
  background-color: ${({ disabled }) => (disabled ? theme.gray100 : theme.gray50)};
  font-weight: 600;
  border-radius: 8px;
  padding: 14px 32px;
  white-space: nowrap;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  min-width: 120px;

  @media (max-width: ${BREAKPOINT}) {
    width: 100%;
    padding: 12px;
  }
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

export const ErrorMessage = styled.div`
  ${Pretendard.Body1}
  color: ${theme.red};
  text-align: center;
  padding: 40px 20px;
  background: ${theme.gray50};
  border-radius: 8px;
  border: 1px solid ${theme.gray100};
`; 