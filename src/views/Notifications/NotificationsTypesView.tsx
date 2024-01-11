import Title from '@/components/Common/Title';
import { Alert } from '@/components/ui';
import DescriptionModal from '@/components/Views/TypesList/V1_Notifications/Modal/DescriptionModal';
import TypesForm from '@/components/Views/TypesList/V1_Notifications/TypesForm';
import TypesList from '@/components/Views/TypesList/V1_Notifications/TypesList';

const NotificationsTypesView = () => {
  return (
    <>
      <Title title="Tipos de Notificaciones" />
      <Alert closable className="mb-3 animate-in-bottom a-delay-200">
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
