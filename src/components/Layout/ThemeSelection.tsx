import React from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Switch, { type SwitchProps } from "@mui/material/Switch";
import styled from "@mui/system/styled";

import { useThemeController } from "../MainThemeProvider";
import { useTheme } from "@mui/material/styles";

import * as Colors from "@mui/material/colors";
import { Popper, ClickAwayListener, Paper } from "@mui/material";

/**
 * from @see https://mui.com/material-ui/react-switch/#customization
 */
const ThemeSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 0,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode !== "dark" ? "#8796A5" : "#aab4be",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },

      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode !== "dark" ? "#F2C039" : "#001e3c",
    boxSizing: "border-box",
    width: 26,
    height: 26,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode !== "dark" ? "#8796A5" : "#aab4be",
    opacity: 1,
    transition: (theme.transitions as any).create(["background-color"], {
      duration: 500,
    }),
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 20,
      height: 20,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#bdbdbd"
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      left: 21,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#616161"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      right: 21,
    },
  },
}));

const colors: Array<Exclude<keyof typeof Colors, "common">> = [
  "amber",
  "blue",
  "blueGrey",
  "brown",
  "cyan",
  "deepOrange",
  "deepPurple",
  "green",
  "grey",
  "indigo",
  "lightBlue",
  "lightGreen",
  "lime",
  "orange",
  "pink",
  "purple",
  "red",
  "teal",
  "yellow",
];

const ColoredDoat = styled("div")<{ color: string }>(({ color }) => ({
  backgroundColor: color,
  width: "20px",
  height: "20px",
  borderRadius: "10px",
  margin: "5px",
  cursor: "pointer",
}));

const ThemeSelection: React.FC = () => {
  const { toggleColorMode, setColorPalette, currentColors } =
    useThemeController();
  const theme = useTheme();
  const [anchorEl, setAnchorEL] = React.useState<Element | null>(null);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          margin: "0 10px",
          width: "100%",
        }}
      >
        <ColoredDoat
          onClick={({ currentTarget }) => setAnchorEL(currentTarget)}
          color={theme.palette.primary.main}
        />
        <ThemeSwitch
          onClick={toggleColorMode}
          checked={theme.palette.mode === "dark"}
          sx={{ margin: "5px" }}
        />
      </div>

      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={() => setAnchorEL(null)}>
          <Paper sx={{ padding: "8px" }}>
            <Typography fontSize={15} fontWeight={500}>
              Theme Selection
            </Typography>
            <Divider />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "300px",
              }}
            >
              {colors.map((color) => (
                <ColoredDoat
                  key={color}
                  color={Colors[color][300]}
                  onClick={() => setColorPalette(color)}
                  sx={[
                    currentColors[300] === Colors[color][300] && {
                      "&:before": {
                        content: "''",
                        position: "absolute",
                        width: "30px",
                        height: "5px",
                        backgroundColor: "#ffd37f",
                        transform: "translateX(-5px) translateY(20px)",
                      },
                    },
                  ]}
                />
              ))}
            </div>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default ThemeSelection;
