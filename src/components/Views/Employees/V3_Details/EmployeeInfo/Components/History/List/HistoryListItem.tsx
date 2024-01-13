import dayjs from 'dayjs';

import { HistoryElementProps } from '@/components/interface/views';

const HistoryListItem = (props: HistoryElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY - HH:mm:ss');

  return (
    <article className="content-card card">
      <ul>
        <li>
          Fecha: <b>{formattedDate}</b>
        </li>
        <li>
          Campo: <b>{data.field}</b>
        </li>
        <li>
          Usuario: <b>{data.user.description}</b>
        </li>
        <li>
          Valor anterior: <b>{data.previousValue}</b>
        </li>
        <li>
          Valor nuevo: <b>{data.newValue}</b>
        </li>
      </ul>
    </article>
  );
};
export default HistoryListItem;
