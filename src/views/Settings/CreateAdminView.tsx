import Title from '@/components/Common/Title';
import SearchFilter from '@/components/Views/Employees/V1_List/Filters/SearchFilter';
import Results from '@/components/Views/Settings/CreateAdmin/Results/Results';

const CreateAdminView = () => {
  return (
    <>
      <Title title="Hacer administrador a otro usuario" />
      <SearchFilter queryKey="users" />
      <Results />
    </>
  );
};
export default CreateAdminView;
