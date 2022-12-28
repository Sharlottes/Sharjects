import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const TimelineContentTitle: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <div style={{ marginBottom: "min(1vw, 5px)" }}>
    <Typography variant="h5">{children}</Typography>
    <Divider
      sx={{ transform: "translateX(-20px)", width: "50vw", margin: "5px 0px" }}
    />
  </div>
);

export default TimelineContentTitle;
