import Head from "next/head";

import styled from "@mui/system/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const PageContainer = styled(Box)({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "50px",
});

const PageTitle = styled(Box)({
  textAlign: "center",
  gap: "20px",
});

const ErrorPage404: React.FC = () => (
  <>
    <Head>
      <title>404 Not Found</title>
    </Head>
    <PageContainer>
      <PageTitle>
        <Typography variant="h3" fontWeight="bold">
          404 Not Found
        </Typography>
        <Typography variant="body1">해당 페이지를 찾을 수 없습니다.</Typography>
      </PageTitle>
      <Button href="/" variant="contained" startIcon={<ArrowBackIosIcon />}>
        Go main page
      </Button>
    </PageContainer>
  </>
);

export default ErrorPage404;
