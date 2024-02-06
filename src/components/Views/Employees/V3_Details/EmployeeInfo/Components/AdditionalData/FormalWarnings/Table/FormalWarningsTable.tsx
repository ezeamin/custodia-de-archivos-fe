import TableRow from './FormalWarningsTableRow';

import { Table } from '@/components/ui';

import { FormalWarningsProps } from '@/components/interface/views';

const FormalWarningsTable = (props: FormalWarningsProps) => {
  const { data } = props;

  return (
    <Table rounded transparent zebra className="dark:bg-slate-700">
      <thead>
        <tr className="dark:bg-slate-900">
          <th>Fecha</th>
          <th>Razón</th>
          <th align="center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((element) => <TableRow data={element} key={element.id} />)}
      </tbody>
    </Table>
  );
};
export default FormalWarningsTable;
