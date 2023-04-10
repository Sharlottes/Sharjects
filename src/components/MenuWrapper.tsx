import React from "react";

import Menu, { type MenuProps } from "@mui/material/Menu";

export interface MenuWrapperProps extends Omit<MenuProps, "open" | "anchorEl"> {
  IconDrawer: React.FC<{ onClick: React.MouseEventHandler }>;
  onOpenChanged?: ((isOpened: boolean) => void) | undefined;
}
const MenuWrapper: React.FC<MenuWrapperProps> = ({
  IconDrawer,
  onOpenChanged,
  ...props
}) => {
  const [anchor, setAnchor] = React.useState<Element | null>(null);

  React.useEffect(() => {
    if (onOpenChanged) onOpenChanged(Boolean(anchor));
  }, [anchor]);

  return (
    <>
      <IconDrawer
        onClick={({ currentTarget }) =>
          setAnchor((prev) => (prev ? null : currentTarget))
        }
      />
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        componentsProps={{
          backdrop: {
            onClick: () => setAnchor(null),
          },
        }}
        disableScrollLock
        {...props}
      />
    </>
  );
};

export default MenuWrapper;
