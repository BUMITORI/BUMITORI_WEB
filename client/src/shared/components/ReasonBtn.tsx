import styled from "styled-components";
import { Pretendard } from "../style/font";
import theme from "../style/theme";
import { useState } from "react";

interface ReasonBtnProps {
  reason: string;
}

const Layout = styled.button<{ isClicked: boolean }>`
  padding: 14px 70px;
  ${Pretendard.Headline}
  border-radius: 8px;
  border: none;
  background-color: ${({ isClicked }) =>
    isClicked ? theme.blue : theme.gray50};
  cursor: pointer;
  color: ${({ isClicked }) => (isClicked ? theme.white : theme.gray400)};
`;

const ReasonBtn = ({ reason }: ReasonBtnProps) => {
  const [isClicked, setCliked] = useState(false);
  const onClickBtn = () => {
    setCliked(!isClicked);
  };
  return (
    <Layout isClicked={isClicked} onClick={onClickBtn}>
      {reason}
    </Layout>
  );
};

export default ReasonBtn;
