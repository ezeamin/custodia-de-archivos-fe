import dayjs from 'dayjs';

import { HistoryElementProps } from '@/components/interface/views';

const HistoryTableRow = (props: HistoryElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');
  const formattedHour = dayjs(data.date).format('HH:mm:ss');
  const formattedDni = data.user.description
    .toString()
    .replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');

  return (
    <tr>
      <td>
        <p>{formattedDate}</p>
        <p>{formattedHour}</p>
      </td>
      <td>{data.field}</td>
      <td>{data.previousValue}</td>
      <td>{data.newValue || 'N/A'}</td>
      <td>{formattedDni}</td>
    </tr>
  );
};
export default HistoryTableRow;
