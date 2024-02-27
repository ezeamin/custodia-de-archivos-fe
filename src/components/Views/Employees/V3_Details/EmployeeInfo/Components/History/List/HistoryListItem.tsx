import HistoryListValue from './HistoryListValue';
import dayjs from 'dayjs';

import { formatCuil } from '@/utilities/utils';

import { HistoryElementProps } from '@/components/interface/views';

const HistoryListItem = (props: HistoryElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY - HH:mm:ss');
  const formattedCuil = formatCuil(data.user.description);

  const isJSON = data.field.includes('JSON');
  const label = isJSON ? data.field.split(' - ')[0] : data.field;

  return (
    <article className="content-card">
      <ul>
        <li>
          Fecha: <b>{formattedDate}</b>
        </li>
        <li>
          Usuario: <b>{formattedCuil}</b>
        </li>
        <div className="divider my-0" />
        <li>
          Campo: <b>{label}</b>
        </li>
        <li>
          Valor anterior:{' '}
          <HistoryListValue isJSON={isJSON} value={data.previousValue} />
        </li>
        <li>
          Valor nuevo:{' '}
          <HistoryListValue isJSON={isJSON} value={data.newValue} />
        </li>
      </ul>
    </article>
  );
};
export default HistoryListItem;
