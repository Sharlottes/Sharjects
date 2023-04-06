import styled from "@mui/system/styled";

export const MainBody = styled("main")(({ theme }) =>
  theme.unstable_sx({
    minHeight: "100vh",
    padding: "60px 0 20px 0",
  })
);
