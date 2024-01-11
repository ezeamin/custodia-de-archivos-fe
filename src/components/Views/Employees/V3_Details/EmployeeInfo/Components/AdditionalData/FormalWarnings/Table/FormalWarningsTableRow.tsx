import dayjs from 'dayjs';

import { FormalWarningsElementProps } from '@/components/interface/views';

const FormalWarningsTableRow = (props: FormalWarningsElementProps) => {
  const { data } = props;

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  return (
    <tr>
      <td className="w-[20%]">{formattedDate}</td>
      <td className="w-[80%]">{data.reason}</td>
    </tr>
  );
};
export default FormalWarningsTableRow;
