import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import Title from '@/components/Common/Title';
import { Icon } from '@/components/ui';
import Results from '@/components/Views/Notifications/V5_Sent/Results';

import { paths } from '@/constants/routes/paths';

const NotificationsSentListView = () => {
  return (
    <>
      <Title title="Notificaciones Enviadas" />
      <Link
        className="btn dark:border-gray-500 hover:dark:border-gray-400 w-full sm:w-auto"
        to={paths.NOTIFICATIONS.MAIN}
      >
        <Icon iconComponent={<IoArrowBackOutline />} title="Volver" />
        Volver a Nuevas Notificaciones
      </Link>
      <Results />
    </>
  );
};
export default NotificationsSentListView;
