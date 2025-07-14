import styled from "styled-components";
import theme from "../style/theme";
import { Pretendard } from "../style/font";

interface JoinCategoryProps {
  isJoin: string;
}

const Layout = styled.div<{ color: string }>`
  text-align: center;
  width: 68px;
  background-color: ${({ color }) => color};
  color: ${theme.white};
  ${Pretendard.Bnt3}
  padding: 10px 0;
  border-radius: 8px;
`;

const JoinCategory = ({ isJoin }: JoinCategoryProps) => {
  let color = "";

  if (isJoin === "입소 완료") {
    color = theme.blue;
  } else if (isJoin === "미입소") {
    color = theme.red;
  } else {
    color = theme.red; // 입소전도 빨간색으로 변경
  }

  return (
    <Layout color={color}>
      <span>{isJoin}</span>
    </Layout>
  );
};

export default JoinCategory;
