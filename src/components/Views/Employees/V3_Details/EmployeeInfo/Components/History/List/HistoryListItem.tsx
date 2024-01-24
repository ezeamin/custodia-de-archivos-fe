import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

import { Icon } from '@/components/ui';

import { HistoryElementProps } from '@/components/interface/views';

const HistoryListItem = (props: HistoryElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY - HH:mm:ss');
  const formattedDni = data.user.description.replace(
    /(\d{2})(\d{3})(\d{3})/,
    '$1.$2.$3'
  );

  const isPreviousLink =
    typeof data.previousValue === 'string' &&
    data.previousValue?.includes('http');
  const isNewLink =
    typeof data.newValue === 'string' && data.newValue?.includes('http');

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
          Valor anterior:{' '}
          {isPreviousLink ? (
            <Link
              className="nowrap btn btn-outline btn-sm mb-2 w-full text-black hover:text-white dark:text-white dark:hover:text-black"
              target="_blank"
              to={data.previousValue}
            >
              <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
              VER
            </Link>
          ) : (
            <b>{data.previousValue || 'N/A'}</b>
          )}
        </li>
        <li>
          Valor nuevo:{' '}
          {isNewLink ? (
            <Link
              className="nowrap btn btn-outline btn-sm w-full text-black hover:text-white dark:text-white dark:hover:text-black"
              target="_blank"
              to={data.newValue}
            >
              <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
              VER
            </Link>
          ) : (
            <b>{data.newValue || 'N/A'}</b>
          )}
        </li>
      </ul>
    </article>
  );
};
export default HistoryListItem;
