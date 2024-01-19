import dayjs from 'dayjs';

import { LoginLogsResultsElement } from '@/components/interface/views';

const ResultsTableRow = (props: LoginLogsResultsElement) => {
  const { log } = props;

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  const dni = log.username.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
  const formattedDate = dayjs(log.date).format('DD/MM/YYYY - HH:mm:ss');

  return (
    <tr>
      <td>{dni}</td>
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
