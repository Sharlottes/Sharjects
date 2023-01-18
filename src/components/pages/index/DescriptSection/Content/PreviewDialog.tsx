import React from "react";

import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import PreviewIcon from "@mui/icons-material/Preview";
import styled from "@mui/system/styled";
import Tooltip from "@mui/material/Tooltip";

const PreviewFrame = styled("iframe")({
  width: "100%",
  height: "100%",
});

export interface PreviewDialogProps {
  disabled: boolean;
  url: string;
}
const PreviewDialog: React.FC<PreviewDialogProps> = ({ disabled, url }) => {
  const [opened, setOpened] = React.useState(false);

  return (
    <>
      <Tooltip title="미리보기">
        <span>
          <IconButton
            disabled={disabled}
            onClick={() => setOpened((prev) => !prev)}
          >
            <PreviewIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Dialog
        open={opened}
        onClose={() => setOpened(false)}
        PaperProps={{
          sx: {
            "--height": "calc(100vh - 50px)",
            width: "calc(var(--height) * 1.618)",
            height: "var(--height)",
          },
        }}
      >
        <PreviewFrame src={url} />
      </Dialog>
    </>
  );
};
export default PreviewDialog;
