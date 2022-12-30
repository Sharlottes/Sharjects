import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import { tryScroll } from ".";

export interface TimelineItemProps {
  title: string;
  children?: JSX.Element | undefined;
  last?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  children,
  last = false,
}) => (
  <Step expanded last={last} sx={{ padding: "auto 1vw" }}>
    <div>
      {children ? (
        <span
          style={{ color: "themedBlack", fontFamily: "bold", fontSize: 35 }}
          className="has-content"
        >
          {title}
        </span>
      ) : (
        <span style={{ fontSize: 5, color: "#9e9e9e" }}>{title}</span>
      )}
    </div>
    <StepContent>
      {children}
      {children && (
        <span
          onClick={() => tryScroll("down")}
          style={{
            position: "absolute",
            right: "10px",
            color: "blue",
            margin: "5px",
          }}
        >
          next
        </span>
      )}
    </StepContent>
  </Step>
);

export default TimelineItem;
