import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

import { NotificationsResultsListItemProps } from '@/components/interface/views';

const ResultsListItem = (props: NotificationsResultsListItemProps) => {
  const { notification, index, hasBeenRead, sent } = props;

  const formattedDate = dayjs(notification.date).format('DD/MM/YYYY');

  let receiverName = '';
  if (sent && 'receivers' in notification) {
    if (notification.receivers.length === 1)
      receiverName = notification.receivers[0].name;
    else receiverName = 'Múltiples destinatarios';
  }

  return (
    <article
      className="content-card animate-in-bottom indicator h-full w-full"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="card-body flex flex-col justify-between p-0">
        <div>
          <h2 className="card-title">
            {receiverName ||
              `${notification.issuer.lastname}, ${notification.issuer.firstname}`}
          </h2>
          <div className="flex flex-col justify-between gap-2">
            <p>{notification.type.title}</p>
            <p className="text-sm">Fecha: {formattedDate}</p>
          </div>
        </div>
        <footer>
          <div className="divider my-0" />
          <Link
            className={`btn w-full ${
              !hasBeenRead
                ? 'btn-primary text-white'
                : 'border border-gray-300 text-black hover:border-gray-400 dark:border-gray-500 dark:bg-gray-600 dark:text-white'
            } `}
            to={
              sent
                ? `/notifications/sent/${notification.id}`
                : `/notifications/${notification.id}`
            }
          >
            {hasBeenRead ? 'VOLVER A VER' : 'ABRIR'}
          </Link>
        </footer>
      </div>
      {!hasBeenRead && (
        <span className="badge indicator-item badge-error right-5 top-5 animate-pulse" />
      )}
    </article>
  );
};
export default ResultsListItem;
