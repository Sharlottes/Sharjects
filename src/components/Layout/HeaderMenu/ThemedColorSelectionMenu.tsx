import React from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";

import useTheme from "@mui/system/useTheme";
import * as Colors from "@mui/material/colors";

import * as S from "./ThemedColorSelectionMenu.styled";
import { useThemeController } from "src/components/MainThemeProvider";
import ThemedColors from "src/core/ThemedColors";

export interface ThemedColorSelectionMenuProps {
  anchor: Element | null;
  onBackdropClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}
const ThemedColorSelectionMenu: React.FC<ThemedColorSelectionMenuProps> = ({
  anchor,
  onBackdropClick,
}) => {
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
