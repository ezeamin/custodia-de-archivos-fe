import dayjs from 'dayjs';

import { formatCuil } from '@/utilities/utils';

import { LoginLogsResultsElement } from '@/components/interface/views';

const ResultsListItem = (props: LoginLogsResultsElement) => {
  const { log, index } = props;

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  const cuil = formatCuil(log.username);
  const formattedDate = dayjs(log.date).format('DD/MM/YYYY - HH:mm:ss');

  return (
    <article
      className="content-card animate-in-bottom"
      style={{ animationDelay: `${index! * 200}ms` }}
    >
      <div className="card-body p-0">
        <h2 className="card-title">CUIL: {cuil}</h2>
        <div>
          <p>
            IP: <span className="font-bold">{log.ipAddress}</span>
          </p>
          <p>
            Dispositivo: <span className="font-bold">{log.userAgent}</span>
          </p>
          <p>
            Fecha: <span className="font-bold">{formattedDate}</span>
          </p>
        </div>
      </div>
    </article>
  );
};
export default ResultsListItem;
