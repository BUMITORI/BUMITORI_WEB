import * as S from "./style";
import Logo from "../../assets/logo.svg";
import GoogleLogo from "../../assets/googleLogo.svg";

const Login = () => {
  const handleGoogleLogin = () => {
    const redirectUri = `https://bumitori.duckdns.org/oauth2/authorization/google`;
    window.location.href = redirectUri;
  };

  return (
    <S.Layout>
      <S.MainContainer>
        <img src={Logo} alt="로고" />
        <S.LoginContainer onClick={handleGoogleLogin}>
          <S.GoogleLogoImg src={GoogleLogo} alt="Google 로고" />
          <S.GoLogin>Google로 로그인</S.GoLogin>
        </S.LoginContainer>
        <S.Precautions>BSSM 학교 계정으로만 로그인이 가능합니다.</S.Precautions>
      </S.MainContainer>
    </S.Layout>
  );
};

export default Login;
