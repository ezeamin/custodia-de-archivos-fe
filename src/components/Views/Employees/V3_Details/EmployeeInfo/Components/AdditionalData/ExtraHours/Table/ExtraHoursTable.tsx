import TableRow from './ExtraHoursTableRow';

import { Table } from '@/components/ui';

import { ExtraHoursProps } from '@/components/interface/views';

const ExtraHoursTable = (props: ExtraHoursProps) => {
  const { data } = props;

  return (
    <Table rounded transparent zebra>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Cantidad de horas extra</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((element) => <TableRow data={element} key={element.id} />)}
      </tbody>
    </Table>
  );
};
export default ExtraHoursTable;
