import dayjs from 'dayjs';

import { formatCuil } from '@/utilities/utils';

import { LoginLogsResultsElement } from '@/components/interface/views';

const ResultsTableRow = (props: LoginLogsResultsElement) => {
  const { log } = props;

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  const cuil = formatCuil(log.username);
  const formattedDate = dayjs(log.date).format('DD/MM/YYYY - HH:mm:ss');

  return (
    <tr>
      <td>{cuil}</td>
      <td className="lg:hidden">
        <p className="text-xs">IP: {log.ipAddress}</p>
        <p className="text-xs">Dispositivo: {log.userAgent}</p>
      </td>
      <td className="hidden lg:table-cell">{log.ipAddress}</td>
      <td className="hidden lg:table-cell">{log.userAgent}</td>
      <td>{formattedDate}</td>
    </tr>
  );
};
export default ResultsTableRow;
