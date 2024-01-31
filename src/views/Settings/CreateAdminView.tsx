import SearchFilter from '@/components/Common/SearchFilter';
import Title from '@/components/Common/Title';
import Results from '@/components/Views/Settings/V4_CreateAdmin/Results/Results';

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
