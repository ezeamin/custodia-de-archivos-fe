import dayjs from 'dayjs';

import { AbsenceElementProps } from '@/components/interface/views';

const AbsencesListItem = (props: AbsenceElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  return (
    <article className="card content-card">
      <ul>
        <li>
          Fecha: <b>{formattedDate}</b>
        </li>
        <li>
          Razón: <b>{data.reason}</b>
        </li>
      </ul>
    </article>
  );
};
export default AbsencesListItem;
