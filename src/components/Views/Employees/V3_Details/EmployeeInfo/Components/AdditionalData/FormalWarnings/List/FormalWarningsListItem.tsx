import dayjs from 'dayjs';

import { FormalWarningsElementProps } from '@/components/interface/views';

const FormalWarningsListItem = (props: FormalWarningsElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  return (
    <article className="content-card">
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
export default FormalWarningsListItem;
