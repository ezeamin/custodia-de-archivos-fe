import SearchFilter from '@/components/Common/SearchFilter';
import Title from '@/components/Common/Title';
import Results from '@/components/Views/Settings/V5_DeleteAdmin/Results/Results';

const RemoveAdminView = () => {
  return (
    <>
      <Title title="Quitar permisos de administrador" />
      <SearchFilter queryKey="adminUsers" />
      <Results />
    </>
  );
};
export default RemoveAdminView;
