import Title from '@/components/Common/Title';
import TypesForm from '@/components/Views/Notifications/V4_Admin_Types/TypesForm';
import TypesList from '@/components/Views/Notifications/V4_Admin_Types/TypesList';

const NotificationsTypesView = () => {
  return (
    <>
      <Title title="Tipos de Notificaciones" />
      <TypesForm />
      <TypesList />
    </>
  );
};
export default NotificationsTypesView;
