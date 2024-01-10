import dayjs from 'dayjs';

import { ExtraHoursElementProps } from '@/components/interface/views';

const ExtraHoursTableRow = (props: ExtraHoursElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  return (
    <tr>
      <td className="w-[20%]">{formattedDate}</td>
      <td className="w-[80%]">{data.hours} horas</td>
    </tr>
  );
};
export default ExtraHoursTableRow;
