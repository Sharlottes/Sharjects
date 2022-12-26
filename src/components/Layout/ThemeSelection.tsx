import React from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";

import { useThemeController } from "../MainThemeProvider";
import { useTheme } from "@mui/material/styles";

import * as Colors from "@mui/material/colors";
import { ThemeSwitch, ColoredDoat } from "./styled";
import { motion, type TargetAndTransition } from "framer-motion";

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

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        componentsProps={{
          backdrop: {
            onClick: () => setAnchorEL(null),
          },
        }}
        disableScrollLock
        PaperProps={{ sx: { padding: "8px" } }}
      >
        <Typography fontSize={15} fontWeight={500}>
          Theme Selection
        </Typography>
        <Divider />
        <Box
          sx={{
            overflow: "hidden",
            display: "flex",
            flexWrap: "wrap",
            width: "300px",
            "& .selected": {},
          }}
        >
          {colors.map((color) => (
            <ColoredDoat
              key={color}
              color={Colors[color][300]}
              onClick={() => setColorPalette(color)}
              className={
                currentColors[300] === Colors[color][300] ? "selected" : ""
              }
            />
          ))}
          <motion.div
            animate={(() => {
              const index = colors.findIndex(
                (color) => currentColors[300] === Colors[color][300]
              );

              return {
                x: 30 * (index % 10),
                y: 25 + 30 * ~~(index / 10),
              } as TargetAndTransition;
            })()}
            style={{
              position: "absolute",
              width: "30px",
              height: "5px",
              backgroundColor: "#ffd37f",
            }}
          />
        </Box>
      </Menu>
    </>
  );
};

export default ThemeSelection;
