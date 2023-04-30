import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Card from "@mui/material/Card";
import styled from "@mui/system/styled";

export default {
  StyledOpenInNewIcon: styled(OpenInNewIcon)({
    transform: "scale(0.8)",
    color: "lightgray",
    transition: "color 300ms ease-out",
    "&:hover": {
      color: "text.primary",
    },
  }),

  ProjectCardWrapper: styled(Card)(({ theme }) =>
    theme.unstable_sx({
      borderRadius: "20px",
      border: "1px solid #dcdcdc",
      minWidth: "250px",
      height: "100%",
      transition: "all 250ms ease-in",
      display: "grid",
      flexDirection: "column",
      justifyContent: "space-between",
      gridTemplateColumns: "1fr",
      "& .collapse-bar": {
        width: "100%",
        height: "100%",
        color: "#777777",
        gridColumnStart: 1,
        gridRowStart: 1,
        alignSelf: "flex-end",
        pointerEvents: "none",
        opacity: 0,
        transition: "opacity,transform",
        transitionDuration: "100ms,250ms",
        transitionDelay: "125ms",
        transitionTimingFunction: "ease,cubic-bezier(.01,1.76,.67,.79)",
        "&>div": {
          backgroundColor: "black",
          padding: "15px 10px 10px 10px",
          boxShadow: "inset 0 7px 7px #777777",
          height: "100%",
          pointerEvents: "fill",
          "&>div": {
            height: "100%",
          },
        },
      },
      "&:hover": {
        boxShadow: "0 0 10px black",
        "& .collapse-bar": {
          opacity: 1,
          transform: "translateY(80%)",
        },
      },
    })
  ),
  LinkButton: styled("div")(({ theme }) => ({})),
  ProjectCardContainer: styled("div")(({ theme }) =>
    theme.unstable_sx({
      padding: "10px 15px",
      gridColumnStart: 1,
      gridRowStart: 1,
      "& .MuiDivider-root": {
        transition: "width,background-color",
        transitionDuration: "250ms",
        transitionDelay: "0ms,250ms",
        width: 0,
        backgroundColor: "gray",
      },
      "& .link-btn": {
        display: "flex",
        gap: "10px",
        alignItems: "center",
        float: "right",
        "& div": {
          transition: "opacity 500ms",
          opacity: 0,
        },
        "& :nth-of-type(1)": {
          width: 24,
          height: 24,
        },
        "& :nth-of-type(2)": {
          width: "60px",
          height: "30px",
          borderRadius: "20px",
          border: "1px solid #dcdcdc",
          padding: "2px 10px",
          transition: "opacity,color 500ms,500ms",
          transitionDuration: "500ms",
          color: "themedBlack",
          whiteSpace: "nowrap",
          [theme.breakpoints.down("md")]: {
            "&:nth-of-type(2)": {
              color: "white",
              "&::before": {
                opacity: 1,
              },
            },
          },
          "& a": {
            position: "absolute",
          },
          "&:hover": {
            color: "white",
            "&::before": {
              opacity: 1,
            },
          },
          "&::before": {
            content: "''",
            position: "absolute",
            width: "inherit",
            height: "inherit",
            borderRadius: "20px",
            backgroundImage: "linear-gradient(30deg, #50d4d9, #b662c4)",
            transition: "opacity 500ms",
            opacity: 0,
            transform: "translateX(-10px) translateY(-2px)",
          },
        },
      },
      "&:hover": {
        "& .MuiDivider-root": {
          width: "100%",
          backgroundColor: (themes) => themes.palette.primary.main,
        },
        "& .link-btn": {
          "& >div": {
            opacity: 1,
          },
        },
      },
    })
  ),
};
