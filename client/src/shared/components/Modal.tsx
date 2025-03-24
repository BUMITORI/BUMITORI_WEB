import styled from "styled-components";
import theme from "../style/theme";
import { Pretendard } from "../style/font";

interface SubmitModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const SubmitModal = ({ onClose, onSubmit }: SubmitModalProps) => {
  return (
    <ModalContainer>
      <ModalContent>
        <ModalTitle>미입소 사유를 제출할까요?</ModalTitle>
        <SubTitle>제출 후 취소 및 수정이 불가합니다.</SubTitle>
        <SubText>
          ※ 사감 선생님께서 보시는 내용으로, 폭언 및 욕설 등 비속어 사용시
          <br /> 벌점 혹은 더 중대한 처벌이 내려질 수 있습니다.
        </SubText>
      </ModalContent>

      <ModalButtonWrapper>
        <ModalButtonContainer>
          <ModalButton onClick={onClose} cancel>
            취소
          </ModalButton>
          <ModalButton onClick={onSubmit}>제출하기</ModalButton>
        </ModalButtonContainer>
      </ModalButtonWrapper>
    </ModalContainer>
  );
};

export default SubmitModal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: ${theme.white};
  border-radius: 16px 16px 0 0;
  padding: 32px;
  text-align: center;
  width: 450px;
  max-width: 100%;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
`;

const ModalButtonWrapper = styled.div`
  width: 450px;
  max-width: 100%;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ModalButton = styled.button<{ cancel?: boolean }>`
  ${Pretendard.Bnt2}
  color: ${(props) => (props.cancel ? theme.gray500 : theme.white)};
  background-color: ${(props) => (props.cancel ? theme.gray100 : theme.blue)};
  font-weight: 600;
  padding: 20px 0;
  border: none;
  cursor: pointer;
  width: 50%;
  transition: background-color 0.3s;

  &:first-child {
    border-bottom-left-radius: 16px;
  }

  &:last-child {
    border-bottom-right-radius: 16px;
  }
`;

const ModalTitle = styled.p`
  ${Pretendard.Title2}
  color: ${theme.black};
  margin-bottom: 8px;
  font-weight: 700;
`;

const SubTitle = styled.p`
  ${Pretendard.Body2}
  color: ${theme.gray400};
  margin-bottom: 8px;
  font-weight: 600;
`;

const SubText = styled.p`
  ${Pretendard.caption}
  color: ${theme.gray300};
`;
