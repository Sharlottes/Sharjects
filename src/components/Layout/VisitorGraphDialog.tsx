import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { Line } from "react-chartjs-2";
import { useVisitorGraphData } from "./VisitorGraphDialog.util";

export interface VisitorGraphDialogProps extends DialogProps {
  data: Record<string, number>;
}

const VisitorGraphDialog: React.FC<VisitorGraphDialogProps> = ({
  data: visitors,
  ...props
}) => {
  const data = useVisitorGraphData(visitors);

  return (
    <Dialog {...props}>
      <DialogTitle>
        <Typography fontWeight={500} fontSize={15}>
          조회수 그래프
        </Typography>
      </DialogTitle>
      <Line
        data={data}
        options={{
          responsive: true,
          interaction: {
            mode: "index" as const,
            intersect: false,
          },
        }}
        style={{ padding: "20px" }}
      />
    </Dialog>
  );
};
export default VisitorGraphDialog;
