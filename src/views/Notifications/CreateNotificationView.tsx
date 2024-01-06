import Title from '@/components/Common/Title';
import { Alert } from '@/components/ui';
import CreateNotificationForm from '@/components/Views/Notifications/V2_Create/CreateNotificationForm';

const CreateNotificationView = () => {
  return (
    <>
      <Title title="Crear nueva notificación" />
      <Alert className="mb-3" type="warning">
        <b>Advertencia:</b> No se podrá editar una notificación enviada. Por
        favor, corrobore sus datos y los adjuntos previo al envío.
      </Alert>
      <CreateNotificationForm />
    </>
  );
};
export default CreateNotificationView;
