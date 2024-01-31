import FilesModal from './FilesModal';
import NotificationBody from './NotificationBody';
import NotificationHeader from './NotificationHeader';

import { Alert } from '@/components/ui';

import { NotificationInfoProps } from '@/components/interface/views';

const NotificationInfo = (props: NotificationInfoProps) => {
  const { data, sent = false, showReadAlert = false } = props;

  const hasEveryoneReadIt =
    'receivers' in data &&
    data?.receivers.every((receiver) => receiver.hasReadNotification);
  const includesAreas =
    'receivers' in data &&
    data?.receivers.some((receiver) => receiver.name.includes('Área'));

  return (
    <>
      {sent && includesAreas && (
        <Alert>
          Atención: Esta notificación fue destinada a una o más áreas, que no
          registrarán cuando la notificación sea leída.
        </Alert>
      )}
      {sent && hasEveryoneReadIt && (
        <Alert className={includesAreas ? 'mt-2' : ''} type="success">
          Atención: Esta notificación ya fue leida por todos los destinatarios
        </Alert>
      )}
      {showReadAlert && (
        <Alert type="success">Esta notifición fue marcada como leida</Alert>
      )}
      <NotificationHeader data={data} />
      <NotificationBody data={data} />
      <FilesModal data={data} />
    </>
  );
};
export default NotificationInfo;
