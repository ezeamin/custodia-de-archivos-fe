import ResultsTableRow from './ResultsTableRow';

import { Table } from '@/components/ui';

import { EmployeesResultsTableProps } from '@/components/interface/views';

const ResultsTable = (props: EmployeesResultsTableProps) => {
  const { data } = props;

  return (
    <section className="hidden md:block">
      <section className="content-card overflow-x-auto animate-in-bottom a-delay-300">
        <Table rounded transparent zebra>
          <thead>
            <tr>
              <th className="w-5" />
              <th className="px-0 text-center w-16">Foto</th>
              <th className="hidden lg:table-cell">Apellido, Nombre</th>
              <th className="lg:hidden">Datos personales</th>
              <th className="text-center hidden lg:table-cell">Edad</th>
              <th className="text-center hidden lg:table-cell">Antiguedad</th>
              <th className="xl:hidden">Puesto y area</th>
              <th className="hidden xl:table-cell">Puesto</th>
              <th className="hidden xl:table-cell">Area</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data?.map((employee) => (
              <ResultsTableRow employee={employee} key={employee.id} />
            ))}
          </tbody>
        </Table>
      </section>
    </section>
  );
};
export default ResultsTable;
