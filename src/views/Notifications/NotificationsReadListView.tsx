import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import Title from '@/components/Common/Title';
import { Icon } from '@/components/ui';
import Results from '@/components/Views/Notifications/V3_Read/Results';

import { paths } from '@/constants/routes/paths';

const NotificationsReadListView = () => {
  return (
    <>
      <Title title="Notificaciones Leidas" />
      <Link
        className="btn w-full dark:border-gray-500 hover:dark:border-gray-400 sm:w-auto"
        to={paths.NOTIFICATIONS.MAIN}
      >
        <Icon iconComponent={<IoArrowBackOutline />} title="Volver" />
        Volver a Nuevas Notificaciones
      </Link>
      <Results />
    </>
  );
};
export default NotificationsReadListView;
