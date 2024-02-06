import TableRow from './AbsencesTableRow';

import { Table } from '@/components/ui';

import { AbsencesProps } from '@/components/interface/views';

const AbsencesTable = (props: AbsencesProps) => {
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
export default AbsencesTable;
