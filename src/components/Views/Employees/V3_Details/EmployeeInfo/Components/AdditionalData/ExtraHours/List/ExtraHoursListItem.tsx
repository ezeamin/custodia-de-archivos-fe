import dayjs from 'dayjs';

import { ExtraHoursElementProps } from '@/components/interface/views';

const ExtraHoursListItem = (props: ExtraHoursElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  return (
    <article className="card content-card">
      <ul>
        <li>
          Fecha: <b>{formattedDate}</b>
        </li>
        <li>
          Cantidad de horas extra: <b>{data.hours}</b>
        </li>
      </ul>
    </article>
  );
};
export default ExtraHoursListItem;
