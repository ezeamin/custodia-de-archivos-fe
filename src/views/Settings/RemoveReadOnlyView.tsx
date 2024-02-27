import SearchFilter from '@/components/Common/SearchFilter';
import Title from '@/components/Common/Title';
import Results from '@/components/Views/Settings/V7_DeleteReadOnly/Results/Results';

const RemoveReadOnlyView = () => {
  return (
    <>
      <Title title="Eliminar usuarios de solo lectura" />
      <SearchFilter
        placeholder="Buscar por CUIL (sin puntos)"
        queryKey="readOnlyUsers"
      />
      <Results />
    </>
  );
};
export default RemoveReadOnlyView;
