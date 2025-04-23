import styled from "styled-components";
import theme from "../style/theme";
import { Pretendard } from "../style/font";

interface NoJoinStatusProps {
  noJoinStatus: string;
}

const Layout = styled.main<{ bgColor: string }>`
  width: 76px;
  padding: 10px 0;
  text-align: center;
  color: ${theme.white};
  background-color: ${(props) => props.bgColor};
  border-radius: 8px;
  ${Pretendard.Bnt3}
`;
const NoJoinStatus = ({ noJoinStatus }: NoJoinStatusProps) => {
  let bgColor = "";
  if (noJoinStatus === "승인 완료") {
    bgColor = theme.blue;
  } else {
    bgColor = theme.red;
  }
  return <Layout bgColor={bgColor}>{noJoinStatus}</Layout>;
};

export default NoJoinStatus;
