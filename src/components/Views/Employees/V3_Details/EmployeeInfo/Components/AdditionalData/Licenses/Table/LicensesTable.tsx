import TableRow from './LicensesTableRow';

import { Table } from '@/components/ui';

import { LicensesProps } from '@/components/interface/views';

const LicensesTable = (props: LicensesProps) => {
  const { data } = props;

  return (
    <Table rounded transparent zebra>
      <thead>
        <tr>
          <th>Motivo</th>
          <th>Fecha de inicio</th>
          <th>Fecha de fin</th>
          <th>Cantidad de días</th>
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
export default LicensesTable;
