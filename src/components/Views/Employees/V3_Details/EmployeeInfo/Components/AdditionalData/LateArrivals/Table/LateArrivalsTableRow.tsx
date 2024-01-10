import dayjs from 'dayjs';

import { LateArrivalsElementProps } from '@/components/interface/views';

const LateArrivalsTableRow = (props: LateArrivalsElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');
  const formattedTime = dayjs(data.date).format('HH:mm:ss');

  return (
    <tr>
      <td className="w-[20%]">{formattedDate}</td>
      <td className="w-[80%]">{formattedTime}</td>
    </tr>
  );
};
export default LateArrivalsTableRow;
