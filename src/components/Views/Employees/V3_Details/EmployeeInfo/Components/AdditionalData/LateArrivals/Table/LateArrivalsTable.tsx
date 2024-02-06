import TableRow from './LateArrivalsTableRow';

import { Table } from '@/components/ui';

import { LateArrivalsProps } from '@/components/interface/views';

const LateArrivalsTable = (props: LateArrivalsProps) => {
  const { data } = props;

  return (
    <Table rounded transparent zebra className="dark:bg-slate-700">
      <thead>
        <tr className="dark:bg-slate-900">
          <th>Fecha</th>
          <th>Hora de llegada</th>
          <th align="center">Observaciones</th>
          <th align="center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((element) => <TableRow data={element} key={element.id} />)}
      </tbody>
    </Table>
  );
};
export default LateArrivalsTable;
