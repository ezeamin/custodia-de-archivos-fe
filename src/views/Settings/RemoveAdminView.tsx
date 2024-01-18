import Title from '@/components/Common/Title';
import SearchFilter from '@/components/Views/Employees/V1_List/Filters/SearchFilter';
import Results from '@/components/Views/Settings/DeleteAdmin/Results/Results';

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
