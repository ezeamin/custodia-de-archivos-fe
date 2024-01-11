import TableRow from './FormalWarningsTableRow';

import { Table } from '@/components/ui';

import { FormalWarningsProps } from '@/components/interface/views';

const FormalWarningsTable = (props: FormalWarningsProps) => {
  const { data } = props;

  return (
    <Table rounded transparent zebra>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Razón</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((element) => <TableRow data={element} key={element.id} />)}
      </tbody>
    </Table>
  );
};
export default FormalWarningsTable;
