import ResultsTableRow from './ResultsTableRow';

import { Table } from '@/components/ui';

import { ResultsTableProps } from '@/components/interface/views';

const ResultsTable = (props: ResultsTableProps) => {
  const { data } = props;

  return (
    <section className="content-card mt-5 overflow-x-auto animate-in-bottom">
      <Table rounded transparent zebra>
        <thead>
          <tr>
            <th className="w-5" />
            <th className="px-0 text-center w-16">Foto</th>
            <th>Apellido, Nombre</th>
            <th className="text-center">Edad</th>
            <th className="text-center">Antiguedad</th>
            <th>Puesto</th>
            <th>Area</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((employee) => (
            <ResultsTableRow employee={employee} key={employee.id} />
          ))}
        </tbody>
      </Table>
    </section>
  );
};
export default ResultsTable;
