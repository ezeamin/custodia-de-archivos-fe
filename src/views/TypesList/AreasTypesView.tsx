import Title from '@/components/Common/Title';
import { Alert } from '@/components/ui';
import NewAreaUserModal from '@/components/Views/TypesList/V5_Areas/NewAreaUserModal';
import TypesForm from '@/components/Views/TypesList/V5_Areas/TypesForm';
import TypesList from '@/components/Views/TypesList/V5_Areas/TypesList';

const AreasTypesView = () => {
  return (
    <>
      <Title title="Tipos de Áreas" />
      <Alert closable className="mb-4">
        Si quiere crear el usuario para un area que aún no lo tenga, edítela
        agregándole un Email del responsable.
      </Alert>
      <TypesForm />
      <TypesList />
      <NewAreaUserModal />
    </>
  );
};
export default AreasTypesView;
