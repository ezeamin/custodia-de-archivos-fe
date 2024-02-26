import Title from '@/components/Common/Title';
import { Alert } from '@/components/ui';
import CreateNotificationForm from '@/components/Views/Notifications/V2_Create/CreateNotificationForm';

import { paths } from '@/constants/routes/paths';

const CreateNotificationView = () => {
  return (
    <>
      <Title
        buttonClassName="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 border-none"
        buttonText="Cancelar"
        href={paths.NOTIFICATIONS.MAIN}
        title="Crear nueva notificación"
      />
      <Alert className="mb-3" type="warning">
        <b>Advertencia:</b> No se podrá editar una notificación enviada. Por
        favor, corrobore sus datos y los adjuntos previo al envío.
      </Alert>
      <CreateNotificationForm />
    </>
  );
};
export default CreateNotificationView;
