import styled from "@mui/system/styled";

namespace S {
  export const ColoredDoat = styled("span")<{
    color: string;
  }>(({ color }) => ({
    width: "12px",
    height: "12px",
    borderRadius: "100%",
    backgroundColor: color,
    display: "inline-block",
    top: "1px",
    position: "relative",
  }));

  export const GithubCardContainer = styled("div")(({ theme }) =>
    theme.unstable_sx({
      fontFamily:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      border: "1px solid",
      borderRadius: "6px",
      borderColor: "github.borderColor",
      background: "github.backgroundColor",
      padding: "16px",
      fontSize: "14px",
      lineHeight: "1.5",
      color: "themedBlack",
    })
  );

  export const GithubCardTitle = styled("div")(({ theme }) =>
    theme.unstable_sx({
      display: "flex",
      alignItems: "top",
      gap: "10px",
      "& svg": {
        position: "relative",
        top: "5px",
        fill: "github.iconColor",
      },
      "& .MuiTypography-subtitle1": {
        fontWeight: "bold",
        "& a": {
          textDecoration: "none",
          color: "github.linkColor",
        },
      },
      "& .MuiTypography-caption": {
        position: "relative",
        top: "-10px",
        "& a": {
          color: "github.linkColor",
          fontWeight: 600,
          textDecoration: "none",
        },
      },
    })
  );

  export const GithubCardFork = styled("div")(({ theme }) =>
    theme.unstable_sx({
      display: "block",
      fontSize: "12px",
      color: "github.iconColor",
    })
  );

  export const GithubCardDescription = styled("div")(({ theme }) =>
    theme.unstable_sx({
      fontSize: "12px",
      marginBottom: "16px",
      marginTop: "8px",
      color: "github.iconColor",
      "& img": {
        verticalAlign: "-0.2rem",
      },
    })
  );

  export const GithubCardFooter = styled("div")(({ theme }) =>
    theme.unstable_sx({
      display: "flex",
      gap: "16px",
      fontSize: "12px",
      color: "github.iconColor",

      "& a": {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "github.iconColor",
      },
    })
  );
}
export default S;
