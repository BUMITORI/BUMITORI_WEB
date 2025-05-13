import styled from "styled-components";
import theme from "../style/theme";
import { Pretendard } from "../style/font";

interface ButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const Button = styled.button<{ isSelected: boolean }>`
  padding: 16px 64px;
  ${Pretendard.Bnt2}
  background-color: white;
  color: ${({ isSelected }) => (isSelected ? theme.black : theme.gray200)};
  cursor: pointer;
  border: none;
  border-bottom: ${({ isSelected }) => (isSelected ? `2px solid black` : "none")};
  @media (max-width: 900px) {
    padding: 12px 0px;
  }
`;

const WholeBtn = ({ text, isSelected, onClick }: ButtonProps) => {
  return (
    <Button onClick={onClick} isSelected={isSelected}>
      {text}
    </Button>
  );
};

export default WholeBtn;