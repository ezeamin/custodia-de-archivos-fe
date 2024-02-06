import ResultsTableRow from './ResultsTableRow';

import { Table } from '@/components/ui';

import { EmployeesResultsTableProps } from '@/components/interface/views';

const ResultsTable = (props: EmployeesResultsTableProps) => {
  const { data } = props;

  return (
    <section className="hidden lg:block">
      <section className="content-card animate-in-bottom a-delay-300 overflow-x-auto">
        <Table rounded transparent zebra>
          <thead>
            <tr>
              <th className="w-5" />
              <th className="w-16 px-0 text-center">Foto</th>
              <th className="hidden xl:table-cell">Apellido, Nombre</th>
              <th className="xl:hidden">Datos personales</th>
              <th className="hidden text-center xl:table-cell">Edad</th>
              <th className="hidden text-center xl:table-cell">Antiguedad</th>
              <th className="xl:hidden">Puesto y área</th>
              <th className="hidden xl:table-cell">Puesto</th>
              <th className="hidden xl:table-cell">Área</th>
              <th>Estado del Carnet</th>
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
