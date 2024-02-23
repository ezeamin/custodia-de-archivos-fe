import Title from '@/components/Common/Title';
import { Alert } from '@/components/ui';
import DescriptionModal from '@/components/Views/TypesList/V2_Notifications/Modal/DescriptionModal';
import TypesForm from '@/components/Views/TypesList/V2_Notifications/TypesForm';
import TypesList from '@/components/Views/TypesList/V2_Notifications/TypesList';

import { paths } from '@/constants/routes/paths';

const NotificationsTypesView = () => {
  return (
    <>
      <Title
        buttonText="Crear notificacion"
        href={paths.NOTIFICATIONS.CREATE}
        title="Tipos de Notificaciones"
      />
      <Alert closable className="animate-in-bottom a-delay-200 mb-3">
        Crea un nuevo tipo de notificación. El título y la descripción serán
        visibles al crear una notificacion de este tipo. Además, una
        notificación de este tipo solo podrá ser emitida en el rango horario que
        se establezca, y por aquellos usuarios con los roles permitidos.
      </Alert>
      <TypesForm />
      <TypesList />

      <DescriptionModal />
    </>
  );
};
export default NotificationsTypesView;
