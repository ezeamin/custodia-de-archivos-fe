import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

import { Icon } from '@/components/ui';

import { HistoryElementProps } from '@/components/interface/views';

const HistoryTableRow = (props: HistoryElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');
  const formattedHour = dayjs(data.date).format('HH:mm:ss');
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
    <tr>
      <td>
        <p>{formattedDate}</p>
        <p>{formattedHour}</p>
      </td>
      <td>{data.field}</td>
      <td>
        {isPreviousLink ? (
          <Link
            className="nowrap btn btn-outline btn-sm text-black hover:text-white dark:text-white dark:hover:text-black"
            target="_blank"
            to={data.previousValue}
          >
            <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
            VER
          </Link>
        ) : (
          data.previousValue || 'N/A'
        )}
      </td>
      <td>
        {isNewLink ? (
          <Link
            className="nowrap btn btn-outline btn-sm text-black hover:text-white dark:text-white dark:hover:text-black"
            target="_blank"
            to={data.newValue}
          >
            <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
            VER
          </Link>
        ) : (
          data.newValue || 'N/A'
        )}
      </td>
      <td>{formattedDni}</td>
    </tr>
  );
};
export default HistoryTableRow;
