import Typography from "@mui/material/Typography";
import useNearestItem from "../useNearestItem";

export interface DateTypographyProps {
  onDateClick: () => void;
}

const DateTypography: React.FC<DateTypographyProps> = ({ onDateClick }) => {
  const nearestItem = useNearestItem();

  return (
    <Typography
      sx={{ cursor: "pointer", width: "80px", textAlign: "center" }}
      onClick={onDateClick}
    >
      {nearestItem?.date}
    </Typography>
  );
};

export default DateTypography;
