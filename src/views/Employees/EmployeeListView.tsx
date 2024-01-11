import Title from '@/components/Common/Title';
import { Modal } from '@/components/ui';
import FilterModalForm from '@/components/Views/Employees/V1_List/Filters/FilterModalForm';
import Legend from '@/components/Views/Employees/V1_List/Filters/Legend';
import SearchFilter from '@/components/Views/Employees/V1_List/Filters/SearchFilter';
import Results from '@/components/Views/Employees/V1_List/Results/Results';

import { paths } from '@/constants/routes/paths';

const EmployeeListView = () => {
  return (
    <>
      <Title
        buttonText="Crear nuevo empleado"
        href={paths.EMPLOYEES.CREATE}
        title="Listado de Empleados"
      />
      <section className="flex justify-between items-center">
        <SearchFilter />
        <Legend />
      </section>
      <Results />

      <Modal id="employeeSearchFilter" title="Filtrar resultados">
        <FilterModalForm />
      </Modal>
    </>
  );
};
export default EmployeeListView;
