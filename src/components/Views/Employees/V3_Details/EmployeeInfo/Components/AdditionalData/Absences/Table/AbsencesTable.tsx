import TableRow from './AbsencesTableRow';

import { Table } from '@/components/ui';

import { AbsencesProps } from '@/components/interface/views';

const AbsencesTable = (props: AbsencesProps) => {
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
