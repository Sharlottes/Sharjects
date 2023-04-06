import React from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";

import { motion, type TargetAndTransition } from "framer-motion";
import * as S from "./ThemedColorSelectionMenu.styled";
import { useThemeController } from "src/components/MainThemeProvider";
import ThemedColors from "src/core/ThemedColors";
import * as Colors from "@mui/material/colors";

export interface ThemedColorSelectionMenuProps {
  anchor: Element | null;
  onBackdropClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}
const ThemedColorSelectionMenu: React.FC<ThemedColorSelectionMenuProps> = ({
  anchor,
  onBackdropClick,
}) => {
  const { setColorPalette, currentColors } = useThemeController();

  return (
    <Menu
      open={Boolean(anchor)}
      anchorEl={anchor}
      componentsProps={{
        backdrop: {
          onClick: onBackdropClick,
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
        }}
      >
        {ThemedColors.map((color) => (
          <S.ColoredDoat
            key={color}
            color={Colors[color][300]}
            onClick={() => setColorPalette(color)}
          />
        ))}
        <motion.div
          animate={(() => {
            const index = ThemedColors.findIndex(
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
  );
};

const ThemedColorSelectionMenuWrapper: React.FC = () => {
  const [anchor, setAnchor] = React.useState<Element | null>(null);
  const theme = useTheme();

  return (
    <>
      <S.ColoredDoat
        onClick={({ currentTarget }) => setAnchor(currentTarget)}
        color={theme.palette.primary.main}
      />
      <ThemedColorSelectionMenu
        anchor={anchor}
        onBackdropClick={() => setAnchor(null)}
      />
    </>
  );
};

export default ThemedColorSelectionMenuWrapper;
