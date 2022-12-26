import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getComplementaryColor } from "src/utils/getComplementaryColor";

const Footer: React.FC<{ additional?: React.ReactNode | undefined }> = ({
  additional,
}) => (
  <Box
    component="footer"
    sx={{
      width: "100%",
      minHeight: "100px",
      borderTop: "solid 1px #6666667f",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? getComplementaryColor("#e6e6e6")
          : "#e6e6e6",
    }}
  >
    <Typography
      variant="body2"
      sx={{
        margin: "0 auto",
        p: "20px",
        width: "fit-content",
      }}
    >
      이 포트폴리오는 2년간 제작된 프로젝트들을 소개하기 위해 웹개발 공부
      목적으로 시작된 프로젝트입니다.
      <br />
      로그인을 통한 모든 개인정보는 데이터베이스에 저장되며 개발 테스트를 위한
      데이터로 이용됩니다. 사용에 주의해주세요.
      <br />
      <br />
      <span style={{ textAlign: "center" }}>
        Copyright 2022.Sharlotte. All rights reserved.
      </span>
    </Typography>
    {additional}
  </Box>
);

export default Footer;
