import ResultsTableRow from './ResultsTableRow';

import { Table } from '@/components/ui';

import { ResultsTableProps } from '@/components/interface/views';

const ResultsTable = (props: ResultsTableProps) => {
  const { data } = props;

  return (
    <section className="hidden md:block">
      <section className="content-card overflow-x-auto animate-in-bottom">
        <Table rounded transparent zebra>
          <thead>
            <tr>
              <th className="w-5" />
              <th className="px-0 text-center w-16">Foto</th>
              <th className="hidden lg:table-cell">Apellido, Nombre</th>
              <th className="lg:hidden">Datos personales</th>
              <th className="text-center hidden lg:table-cell">Edad</th>
              <th className="text-center hidden lg:table-cell">Antiguedad</th>
              <th className="lg:hidden">Puesto y area</th>
              <th className="hidden lg:table-cell">Puesto</th>
              <th className="hidden lg:table-cell">Area</th>
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
