import dayjs from 'dayjs';

import { LicensesElementProps } from '@/components/interface/views';

const LicensesListItem = (props: LicensesElementProps) => {
  const { data } = props;

  const startDate = dayjs(data.startDate);
  const endDate = dayjs(data.endDate);

  // calculate working days between two dates
  const days = endDate.diff(startDate, 'day') + 1;

  return (
    <article className="card content-card">
      <ul>
        <li>
          Tipo: <b>{data.type.description}</b>
        </li>
        <li>
          Fecha de inicio: <b>{startDate.format('DD/MM/YYYY')}</b>
        </li>
        <li>
          Fecha de fin: <b>{endDate.format('DD/MM/YYYY')}</b>
        </li>
        <li>
          Dias totales: <b>{days}</b>
        </li>
      </ul>
    </article>
  );
};
export default LicensesListItem;
