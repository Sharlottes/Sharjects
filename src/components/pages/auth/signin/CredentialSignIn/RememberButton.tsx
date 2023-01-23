import React from "react";

import Button from "@mui/material/Button";

import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";

const RememberButton: React.FC = () => {
  const [remember, setRemember] = React.useState(false);

  return (
    <Button
      sx={{
        justifyContent: "flex-start",
        alignItems: "center",
        verticalAlign: "middle",
        m: 0,
        p: 0,
      }}
      onClick={() => setRemember((prev) => !prev)}
      color="inherit"
    >
      <CheckBoxRoundedIcon
        color="primary"
        sx={{ opacity: remember ? 0 : 1, transition: "all 0.25s" }}
      />
      <CheckBoxOutlineBlankRoundedIcon
        sx={{
          opacity: remember ? 1 : 0,
          position: "absolute",
          transition: "all 0.25s",
        }}
      />
      Remember User
    </Button>
  );
};

export default RememberButton;
