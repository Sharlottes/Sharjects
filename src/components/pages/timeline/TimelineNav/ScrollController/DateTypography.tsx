import Typography from "@mui/material/Typography";
import { getTLD, useTimeline } from "../../TimelineProvider";
import useScrollEvent from "src/hooks/useScrollEvent";
import { useRef } from "react";

export interface DateTypographyProps {
  onDateClick: () => void;
}

const DateTypography: React.FC<DateTypographyProps> = ({ onDateClick }) => {
  const { currentItem: currentItemRef } = useTimeline();
  const typoRef = useRef<HTMLSpanElement>(null);

  useScrollEvent(() => {
    if (typoRef.current && currentItemRef.current) {
      setTimeout(() => {
        if (typoRef.current && currentItemRef.current) {
          typoRef.current.textContent = getTLD(currentItemRef.current, "date");
        }
      }, 500);
    }
  });

  return (
    <Typography
      ref={typoRef}
      sx={{ cursor: "pointer", width: "80px", textAlign: "center" }}
      onClick={onDateClick}
    />
  );
};

export default DateTypography;
