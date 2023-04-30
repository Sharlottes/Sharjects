import styled from "@mui/system/styled";

export default {
  GithubCardContainer: styled("div")(({ theme }) =>
    theme.unstable_sx({
      fontFamily:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      border: "1px solid",
      borderRadius: "6px",
      borderColor: "githubBorderColor",
      background: "githubBackgroundColor",
      padding: "16px",
      fontSize: "14px",
      lineHeight: "1.5",
      color: "themedBlack",
    })
  ),

  GithubCardHeader: styled("div")(({ theme }) =>
    theme.unstable_sx({
      display: "flex",
      gap: "10px",
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
      },
      "& .MuiButton-root": {
        height: "35px",
        position: "relative",
        top: "5px",
      },
    })
  ),

  GithubCardBody: styled("div")(({ theme }) =>
    theme.unstable_sx({
      marginLeft: "20px",
      "& .MuiTypography-body1": {
        marginLeft: "5px",
      },
      "& .icons": {
        display: "flex",
        margin: "10px auto",
        "& a": {
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
          margin: "auto 5px",
          "& .MuiSvgIcon-root": {
            fill: "githubIconColor",
            marginRight: "8px",
          },
        },
      },
    })
  ),
};
