import HistoryTableRow from './HistoryTableRow';

import { Table } from '@/components/ui';

import { HistoryDataProps } from '@/components/interface/views';

const HistoryTable = (props: HistoryDataProps) => {
  const { data } = props;

  return (
    <Table rounded transparent zebra className="dark:bg-slate-700">
      <thead>
        <tr className="dark:bg-slate-900">
          <th>Fecha</th>
          <th>Campo</th>
          <th>Valor anterior</th>
          <th>Valor nuevo</th>
          <th>Usuario</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((historyItem) => (
          <HistoryTableRow data={historyItem} key={historyItem.id} />
        ))}
      </tbody>
    </Table>
  );
};
export default HistoryTable;
