import ResultsTableRow from './ResultsTableRow';

import { Table } from '@/components/ui';

import { CreateAdminResults } from '@/components/interface/views';

const ResultsTable = (props: CreateAdminResults) => {
  const { data } = props;

  return (
    <section className="hidden md:block">
      <section className="content-card animate-in-bottom a-delay-300 overflow-x-auto">
        <Table rounded transparent zebra>
          <thead>
            <tr>
              <th className="w-16 text-center">Foto</th>
              <th className="hidden lg:table-cell">Apellido, Nombre</th>
              <th className="hidden lg:table-cell">CUIL</th>
              <th className="lg:hidden">Información</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => <ResultsTableRow key={user.id} user={user} />)}
          </tbody>
        </Table>
      </section>
    </section>
  );
};
export default ResultsTable;
