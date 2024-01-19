import Title from '@/components/Common/Title';
import SearchFilter from '@/components/Views/Employees/V1_List/Filters/SearchFilter';
import Results from '@/components/Views/Settings/V3_LoginLogs/Results/Results';

const LoginLogsView = () => {
  return (
    <>
      <Title title="Registros de inicios de sesión" />
      <SearchFilter
        placeholder="Buscar por DNI (sin puntos)"
        queryKey="loginLogs"
      />
      <Results />
    </>
  );
};
export default LoginLogsView;
