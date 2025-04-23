import * as S from "./style";
import Logo from "../../assets/logo.svg";
import GoogleLogo from "../../assets/googleLogo.svg";

const Login = () => {
  return (
    <S.Layout>
      <S.MainContainer>
        <img src={Logo} />
        <S.LoginContainer>
          <S.GoogleLogoImg src={GoogleLogo} />
          <S.GoLogin>Google로 로그인</S.GoLogin>
        </S.LoginContainer>
        <S.Precautions>BSSM 학교 계정으로만 로그인이 가능합니다.</S.Precautions>
      </S.MainContainer>
    </S.Layout>
  );
};

export default Login;
