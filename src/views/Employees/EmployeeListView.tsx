import Title from '@/components/Common/Title';
import FilterModal from '@/components/Views/Employees/V1/Filters/FilterModal';
import Legend from '@/components/Views/Employees/V1/Filters/Legend';
import SearchFilter from '@/components/Views/Employees/V1/Filters/SearchFilter';
import Results from '@/components/Views/Employees/V1/Results/Results';

const EmployeeListView = () => {
  return (
    <>
      <Title title="Listado de empleados" />
      <section className="flex justify-between items-center">
        <SearchFilter />
        <Legend />
      </section>
      <Results />

      <FilterModal />
    </>
  );
};
export default EmployeeListView;
