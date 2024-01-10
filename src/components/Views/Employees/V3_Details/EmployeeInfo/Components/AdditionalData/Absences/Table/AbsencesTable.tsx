import TableRow from './AbsencesTableRow';

import { Table } from '@/components/ui';

import { AbsenceProps } from '@/components/interface/views';

const AbsencesTable = (props: AbsenceProps) => {
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
export default AbsencesTable;
