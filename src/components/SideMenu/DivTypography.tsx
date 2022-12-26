import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export interface DivTypographyProps {
  title?: string;
}

const DivTypography: React.FC<DivTypographyProps> = ({ title }) => (
  <Divider
    textAlign="left"
    sx={{ margin: "10px 0", "&::before": { top: 0 }, "&::after": { top: 0 } }}
  >
    {title && (
      <Typography fontWeight={500} fontSize={12}>
        {title}
      </Typography>
    )}
  </Divider>
);
export default DivTypography;
