import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import Title from '@/components/Common/Title';
import { Icon } from '@/components/ui';
import Results from '@/components/Views/Notifications/V3_History/Results';

import { paths } from '@/constants/routes/paths';

const NotificationsHistoryView = () => {
  return (
    <>
      <Title title="Historial de Notificaciones" />
      <Link
        className="btn w-full sm:w-auto dark:border-gray-500 hover:dark:border-gray-400"
        to={paths.NOTIFICATIONS.MAIN}
      >
        <Icon iconComponent={<IoArrowBackOutline />} title="Volver" />
        Volver a Nuevas Notificaciones
      </Link>
      <Results />
    </>
  );
};
export default NotificationsHistoryView;
