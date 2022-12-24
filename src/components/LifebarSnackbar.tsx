import React from "react";

import { SnackbarContent, type CustomContentProps } from "notistack";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

import { motion } from "framer-motion";

const LifebarSnackbar: React.FC<CustomContentProps> = React.forwardRef<
  HTMLDivElement,
  CustomContentProps
>(({ id, action, ...props }, ref) => {
  return (
    <SnackbarContent ref={ref}>
      <Card>
        <CardActions>
          <Typography variant="body2" sx={{ marginRight: "10px" }}>
            {props.message}
          </Typography>
          {typeof action === "function" ? action(id) : action}
        </CardActions>
        <motion.div
          initial={{
            backgroundColor: "lightGray",
            height: "5px",
            width: "100%",
          }}
          whileInView={{ width: "0%" }}
          transition={{ duration: (props.autoHideDuration ?? 0) / 1000 }}
        />
      </Card>
    </SnackbarContent>
  );
});

export default LifebarSnackbar;
