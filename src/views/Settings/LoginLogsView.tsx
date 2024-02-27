import SearchFilter from '@/components/Common/SearchFilter';
import Title from '@/components/Common/Title';
import Results from '@/components/Views/Settings/V3_LoginLogs/Results/Results';

const LoginLogsView = () => {
  return (
    <>
      <Title title="Registros de inicios de sesión" />
      <SearchFilter
        placeholder="Buscar por CUIL (sin puntos)"
        queryKey="loginLogs"
      />
      <Results />
    </>
  );
};
export default LoginLogsView;
