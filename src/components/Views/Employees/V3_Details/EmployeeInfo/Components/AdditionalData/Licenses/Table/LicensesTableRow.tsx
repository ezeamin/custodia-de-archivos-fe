import dayjs from 'dayjs';

import { LicensesElementProps } from '@/components/interface/views';

const LicensesTableRow = (props: LicensesElementProps) => {
  const { data } = props;

  const startDate = dayjs(data.startDate);
  const endDate = dayjs(data.endDate);

  // calculate working days between two dates
  const days = endDate.diff(startDate, 'day') + 1;

  return (
    <tr>
      <td>{data.type.description}</td>
      <td>{startDate.format('DD/MM/YYYY')}</td>
      <td>{endDate.format('DD/MM/YYYY')}</td>
      <td align="right">{days}</td>
    </tr>
  );
};
export default LicensesTableRow;
