import Title from '@/components/Common/Title';
import SearchFilter from '@/components/Views/Employees/V1_List/Filters/SearchFilter';
import Results from '@/components/Views/Settings/V7_DeleteReadOnly/Results/Results';

const RemoveReadOnlyView = () => {
  return (
    <>
      <Title title="Eliminar usuarios de solo lectura" />
      <SearchFilter
        placeholder="Buscar por DNI (sin puntos)"
        queryKey="readOnlyUsers"
      />
      <Results />
    </>
  );
};
export default RemoveReadOnlyView;
