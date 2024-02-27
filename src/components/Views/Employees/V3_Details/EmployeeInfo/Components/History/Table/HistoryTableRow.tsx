import HistoryTableValue from './HistoryTableValue';
import dayjs from 'dayjs';

import { formatCuil } from '@/utilities/utils';

import { HistoryElementProps } from '@/components/interface/views';

const HistoryTableRow = (props: HistoryElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');
  const formattedHour = dayjs(data.date).format('HH:mm:ss');
  const formattedCuil = formatCuil(data.user.description);

  const isJSON = data.field.includes('JSON');
  const label = isJSON ? data.field.split(' - ')[0] : data.field;

  return (
    <tr>
      <td>
        <p>{formattedDate}</p>
        <p>{formattedHour}</p>
      </td>
      <td>{label}</td>
      <td>
        <HistoryTableValue isJSON={isJSON} value={data.previousValue} />
      </td>
      <td>
        <HistoryTableValue isJSON={isJSON} value={data.newValue} />
      </td>
      <td>{formattedCuil}</td>
    </tr>
  );
};
export default HistoryTableRow;
