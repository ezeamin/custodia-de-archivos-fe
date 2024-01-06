import FilesModal from './FilesModal';
import NotificationBody from './NotificationBody';
import NotificationHeader from './NotificationHeader';

import { Alert } from '@/components/ui';

import { NotificationInfoProps } from '@/components/interface/views';

const NotificationInfo = (props: NotificationInfoProps) => {
  const { data, showReadAlert = false, isLoadingRead = false } = props;

  return (
    <>
      {showReadAlert && (
        <Alert type="success">Esta notifición fue marcada como leida</Alert>
      )}
      {isLoadingRead && <Alert type="loading">Cargando...</Alert>}
      <NotificationHeader data={data} />
      <NotificationBody data={data} />
      <FilesModal data={data} />
    </>
  );
};
export default NotificationInfo;
