import ResultsTableRow from './ResultsTableRow';

import { Table } from '@/components/ui';

import { DeleteReadOnlyUserResults } from '@/components/interface/views';

const ResultsTable = (props: DeleteReadOnlyUserResults) => {
  const { data } = props;

  return (
    <section className="hidden md:block">
      <section className="content-card animate-in-bottom a-delay-300 overflow-x-auto">
        <Table rounded transparent zebra>
          <thead>
            <tr>
              <th className="hidden w-16 text-center lg:table-cell">Foto</th>
              <th className="hidden lg:table-cell">Apellido, Nombre</th>
              <th className="hidden lg:table-cell">CUIL</th>
              <th className="rounded-tl-lg lg:hidden">Información</th>
              <th>Descripción</th>
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
