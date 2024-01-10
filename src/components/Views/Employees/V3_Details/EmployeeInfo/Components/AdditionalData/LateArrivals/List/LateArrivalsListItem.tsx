import dayjs from 'dayjs';

import { LateArrivalsElementProps } from '@/components/interface/views';

const LateArrivalsListItem = (props: LateArrivalsElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');
  const formattedTime = dayjs(data.date).format('HH:mm:ss');

  return (
    <article className="card content-card">
      <ul>
        <li>
          Fecha: <b>{formattedDate}</b>
        </li>
        <li>
          Hora de llegada: <b>{formattedTime}</b>
        </li>
      </ul>
    </article>
  );
};
export default LateArrivalsListItem;
