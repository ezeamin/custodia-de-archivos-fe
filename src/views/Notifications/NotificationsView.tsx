import Title from '@/components/Common/Title';
import NavigationMenu from '@/components/Views/Notifications/V1_List/NavigationMenu';
import Results from '@/components/Views/Notifications/V1_List/Results';

import { paths } from '@/constants/routes/paths';

const NotificationsView = () => {
  return (
    <>
      <Title
        buttonText="Nueva notificación"
        href={paths.NOTIFICATIONS.CREATE}
        title="Nuevas Notificaciones"
      />
      <NavigationMenu />
      <Results />
    </>
  );
};
export default NotificationsView;
