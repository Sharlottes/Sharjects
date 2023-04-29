import React from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import useTheme from "@mui/system/useTheme";
import * as Colors from "@mui/material/colors";

import S from "./ThemedColorSelectionMenu.styled";
import { useThemeController } from "src/components/providers/MainThemeProvider";
import ThemedColors from "src/core/ThemedColors";
import MenuWrapper from "src/components/MenuWrapper";

const IconDrawer: React.FC<{ onClick: React.MouseEventHandler }> = ({
  onClick,
}) => {
  const theme = useTheme();
  return <S.ColoredDoat onClick={onClick} color={theme.palette.primary.main} />;
};

const ThemedColorSelectionMenu: React.FC = () => {
  const { setColorPalette, currentColors } = useThemeController();

  const getCurrentColorCoord = () => {
    const index = ThemedColors.findIndex(
      (color) => currentColors[300] === Colors[color][300]
    );

    return {
      x: 30 * (index % 10),
      y: 25 + 30 * ~~(index / 10),
    };
  };

  return (
    <MenuWrapper
      IconDrawer={IconDrawer}
      PaperProps={{ sx: { padding: "8px" } }}
    >
      <Typography fontSize={15} fontWeight={500}>
        Theme Selection
      </Typography>
      <Divider />
      <S.ColorSelectionContainer>
        {ThemedColors.map((color) => (
          <S.ColoredDoat
            key={color}
            color={Colors[color][300]}
            onClick={() => setColorPalette(color)}
          />
        ))}
        <S.ColorSelectIndicator animate={getCurrentColorCoord()} />
      </S.ColorSelectionContainer>
    </MenuWrapper>
  );
};

export default ThemedColorSelectionMenu;
