import styled from "styled-components";
import theme from "../style/theme";
import { Pretendard } from "../style/font";
import { useState } from "react";

const Button = styled.button<{ isClicked?: boolean }>`
  padding: 16px 44px;
  ${Pretendard.Bnt2}
  background-color: white;
  color: ${theme.gray200};
  cursor: pointer;
  border: none;
  border-bottom: ${({ isClicked }) => (isClicked ? `2px solid black` : "none")};
`;

const WholeBtn = () => {
  const [isClicked, setIsClicked] = useState(false);
  const onClickBtn = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Button onClick={onClickBtn} isClicked={isClicked}>
      전체
    </Button>
  );
};

export default WholeBtn;
