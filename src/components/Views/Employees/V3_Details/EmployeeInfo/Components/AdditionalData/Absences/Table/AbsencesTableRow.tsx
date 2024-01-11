import dayjs from 'dayjs';

import { AbsencesElementProps } from '@/components/interface/views';

const AbsencesTableRow = (props: AbsencesElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  return (
    <tr>
      <td className="w-[20%]">{formattedDate}</td>
      <td className="w-[80%]">{data.reason}</td>
    </tr>
  );
};
export default AbsencesTableRow;
