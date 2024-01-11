import TableRow from './TrainingsTableRow';

import { Table } from '@/components/ui';

import { TrainingsProps } from '@/components/interface/views';

const TrainingsTable = (props: TrainingsProps) => {
  const { data } = props;

  return (
    <Table rounded transparent zebra>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Razón</th>
          <th align="center">Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((element) => <TableRow data={element} key={element.id} />)}
      </tbody>
    </Table>
  );
};
export default TrainingsTable;
