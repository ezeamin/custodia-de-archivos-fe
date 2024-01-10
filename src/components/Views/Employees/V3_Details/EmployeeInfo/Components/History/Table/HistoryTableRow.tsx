import dayjs from 'dayjs';

import { HistoryElementProps } from '@/components/interface/views';

const HistoryTableRow = (props: HistoryElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');
  const formattedHour = dayjs(data.date).format('HH:mm:ss');

  return (
    <tr>
      <td>
        <p>{formattedDate}</p>
        <p>{formattedHour}</p>
      </td>
      <td>{data.field}</td>
      <td>{data.previousValue}</td>
      <td>{data.newValue}</td>
      <td>{data.user.description}</td>
    </tr>
  );
};
export default HistoryTableRow;
