import Typography from "@mui/material/Typography";
import * as S from "./Footer.styled";

const Footer: React.FC = () => (
  <S.FooterContainer>
    <S.FooterBody variant="body2">
      이 포트폴리오는 2년간 제작된 프로젝트들을 소개하기 위해 웹개발 공부
      목적으로 시작된 프로젝트입니다.
      <br />
      <span style={{ textAlign: "center" }}>
        Copyright 2022.Sharlotte. All rights reserved.
      </span>
    </S.FooterBody>
  </S.FooterContainer>
);

export default Footer;
