import HistoryTableRow from './HistoryTableRow';

import { Table } from '@/components/ui';

import { HistoryDataProps } from '@/components/interface/views';

const HistoryTable = (props: HistoryDataProps) => {
  const { data } = props;

  return (
    <Table rounded transparent zebra>
      <thead>
        <tr>
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
