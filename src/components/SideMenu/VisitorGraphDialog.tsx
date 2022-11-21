import Dialog, { type DialogProps } from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'

import { Line } from 'react-chartjs-2'

const monthes = ['월', '화', '수', '목', '금', '토', '일'];
function parseDate(str: string): string {
  const date = new Date(`${str.slice(0, 4)} ${str.slice(4, 6)} ${str.slice(6, 8)}`);
  return `${date.getMonth() + 1}/${date.getDate()} (${monthes[date.getUTCDay()]})`
}

interface VisitorGraphDialogProps extends DialogProps {
  data: Record<string, number>
}
const VisitorGraphDialog: React.FC<VisitorGraphDialogProps> = ({
  data: visitors,
  ...props
}) => {
  const entries = Object.entries(visitors);
  const data = {
    datasets: [
      {
        type: 'line' as const,
        label: 'Dataset 1',
        data: entries.slice(Math.max(0, entries.length - 7)).map(([date, amount]) => ({ x: parseDate(date), y: amount })),
        borderColor: 'green',
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
  }

  return (
    <Dialog {...props}>
      <DialogTitle><Typography fontWeight={500} fontSize={15}>조회수 그래프</Typography></DialogTitle>
      <Line data={data} options={options} style={{ padding: '20px' }} />
    </Dialog>
  )
}
export default VisitorGraphDialog;