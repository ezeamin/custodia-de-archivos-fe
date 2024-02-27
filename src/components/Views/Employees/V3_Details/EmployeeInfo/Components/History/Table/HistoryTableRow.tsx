import HistoryTableValue from './HistoryTableValue';
import dayjs from 'dayjs';

import { HistoryElementProps } from '@/components/interface/views';

const HistoryTableRow = (props: HistoryElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');
  const formattedHour = dayjs(data.date).format('HH:mm:ss');
  const formattedCuil = data.user.description.replace(
    /(\d{2})(\d{2})(\d{3})(\d{3})(\d{1})/,
    '$1-$2.$3.$4-$5'
  );

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
