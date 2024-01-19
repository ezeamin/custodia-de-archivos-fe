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
              <th className="hidden lg:table-cell">DNI</th>
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
