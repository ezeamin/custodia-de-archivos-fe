import dayjs from 'dayjs';

import { HistoryElementProps } from '@/components/interface/views';

const HistoryListItem = (props: HistoryElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY - HH:mm:ss');
  const formattedDni = data.user.description
    .toString()
    .replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');

  return (
    <article className="content-card">
      <ul>
        <li>
          Fecha: <b>{formattedDate}</b>
        </li>
        <li>
          Usuario: <b>{formattedDni}</b>
        </li>
        <div className="divider my-0" />
        <li>
          Campo: <b>{data.field}</b>
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
