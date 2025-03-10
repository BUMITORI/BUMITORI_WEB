import styled from "styled-components";
import theme from "../style/theme";
import { Pretendard } from "../style/font";

interface JoinCategoryProps {
  isJoin: string;
}

const Layout = styled.div<{ color: string }>`
  width: fit-content;
  background-color: ${({ color }) => color};
  color: ${theme.white};
  ${Pretendard.Bnt3}
  padding: 10px 18px;
  border-radius: 8px;
`;

const JoinCategory = ({ isJoin }: JoinCategoryProps) => {
  let categoryTitle = "";
  let color = "";

  if (isJoin === "join") {
    categoryTitle = "입소 완료";
    color = theme.blue;
  } else if (isJoin === "noJoin") {
    categoryTitle = "미입소";
    color = theme.red;
  } else {
    categoryTitle = "입소전";
    color = theme.green;
  }

  return (
    <Layout color={color}>
      <span>{categoryTitle}</span>
    </Layout>
  );
};

export default JoinCategory;
