import styled from "@mui/system/styled";
import { motion } from "framer-motion";

export default {
  TimeConnecter: styled(motion.span)<{ hascontent: string }>(
    ({ hascontent, theme }) => ({
      "--gap": "20px",
      "--size": !!hascontent ? "var(--gap)" : "calc(var(--gap) / 2)",
      "--color": !!hascontent ? theme.palette.primary.main : "lightgray",
      borderLeft: "solid 1px #bdbdbd",
      minHeight: "48px",
      marginRight: "var(--gap)",
      "&::after": {
        content: "''",
        position: "absolute",
        transform:
          "translate(calc(var(--size) / -2), calc(var(--size) * 3 / 4))",
        borderRadius: "calc(var(--size) / 2)",
        width: "var(--size)",
        height: "var(--size)",
        backgroundColor: "var(--color)",
      },
    })
  ),

  TimeContent: styled("div")({
    margin: "20px 0px 20px 10px",
    border: "1px solid #fcfcfc",
    borderRadius: "20px",
    padding: "15px",
  }),

  Header: styled("p")({
    color: "themedBlack",
    fontFamily: "bold",
    fontSize: 35,
  }),

  DummyHeader: styled("span")({
    fontSize: 5,
    color: "#9e9e9e",
  }),
};
