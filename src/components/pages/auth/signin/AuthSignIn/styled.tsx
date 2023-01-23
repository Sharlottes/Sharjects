import Button from "@mui/material/Button";
import styled from "@mui/system/styled";

export const OAuthButton = styled(Button)<
  Record<"base" | "bg" | "accent", string>
>(({ base, bg, accent }) => ({
  width: "min(70vw, 300px)",
  margin: "auto",
  transition: "background-color,color 0.3s",
  borderColor: base,
  color: base,
  "&:hover": {
    backgroundColor: bg,
    color: accent,
    "& .githubIcon": {
      color: "white",
    },
  },
  "& .githubIcon": {
    transition: "color, 0.3s",
    color: "black",
  },
}));

export const OAuthButtonsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
});
