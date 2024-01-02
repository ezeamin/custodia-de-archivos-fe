import Title from '@/components/Common/Title';
import FilterModal from '@/components/Views/Employees/V1/FilterModal';
import Legend from '@/components/Views/Employees/V1/Legend';
import SearchFilter from '@/components/Views/Employees/V1/SearchFilter';

const EmployeeListView = () => {
  return (
    <>
      <Title title="Listado de empleados" />
      <section className="flex justify-between items-center">
        <SearchFilter />
        <Legend />
      </section>
      <FilterModal />
    </>
  );
};
export default EmployeeListView;
