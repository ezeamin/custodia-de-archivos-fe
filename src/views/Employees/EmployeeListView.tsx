import SearchFilter from '@/components/Common/SearchFilter';
import Title from '@/components/Common/Title';
import GetEmployeeReport from '@/components/Reports/GetEmployeeReport';
import Legend from '@/components/Views/Employees/V1_List/Results/Legend';
import Results from '@/components/Views/Employees/V1_List/Results/Results';

import { paths } from '@/constants/routes/paths';
import { userRoles } from '@/constants/userRoles/userRoles';

const EmployeeListView = () => {
  return (
    <>
      <Title
        buttonText="Crear nuevo empleado"
        href={paths.EMPLOYEES.CREATE}
        onlyShowButtonsFor={[userRoles.ADMIN, userRoles.AREA]}
        secondaryButton={<GetEmployeeReport />}
        title="Listado de Empleados"
      />
      <section className="flex items-center justify-between">
        <SearchFilter queryKey="employees" />
        <Legend />
      </section>
      <Results />
    </>
  );
};
export default EmployeeListView;
