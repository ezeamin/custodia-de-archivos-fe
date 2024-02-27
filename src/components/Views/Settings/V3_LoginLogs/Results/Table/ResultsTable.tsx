import ResultsTableRow from './ResultsTableRow';

import { Table } from '@/components/ui';

import { LoginLogsResults } from '@/components/interface/views';

const ResultsTable = (props: LoginLogsResults) => {
  const { data } = props;

  return (
    <section className="hidden md:block">
      <section className="content-card animate-in-bottom a-delay-300 overflow-x-auto">
        <Table rounded transparent zebra>
          <thead>
            <tr>
              <th>CUIL</th>
              <th className="lg:hidden">Información</th>
              <th className="hidden lg:table-cell">IP</th>
              <th className="hidden lg:table-cell">Dispositivo</th>
              <th className="w-1/3 lg:w-1/4">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((log) => <ResultsTableRow key={log.id} log={log} />)}
          </tbody>
        </Table>
      </section>
    </section>
  );
};
export default ResultsTable;
