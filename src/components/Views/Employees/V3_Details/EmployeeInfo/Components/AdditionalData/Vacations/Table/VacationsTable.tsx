import TableRow from './VacationsTableRow';

import { Table } from '@/components/ui';

import { VacationsProps } from '@/components/interface/views';

const VacationsTable = (props: VacationsProps) => {
  const { data } = props;

  return (
    <Table rounded transparent zebra>
      <thead>
        <tr>
          <th>Fecha de inicio</th>
          <th>Fecha de fin</th>
          <th align="right">Cantidad de días</th>
          <th align="right">Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((element) => <TableRow data={element} key={element.id} />)}
      </tbody>
    </Table>
  );
};
export default VacationsTable;
