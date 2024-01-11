import { FaEye } from 'react-icons/fa6';

import dayjs from 'dayjs';

import { useObservation } from '@/stores/useObservation';

import { IconButton } from '@/components/ui';

import { LateArrivalsElementProps } from '@/components/interface/views';

const LateArrivalsTableRow = (props: LateArrivalsElementProps) => {
  const { data } = props;

  const { setObservationData } = useObservation();

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');
  const formattedTime = dayjs(data.date).format('HH:mm:ss');

  const handleClickObservations = () => {
    if (!data.observations) return;

    setObservationData({ id: 'lateArrivals', message: data.observations });
  };

  return (
    <tr>
      <td className="w-[20%]">{formattedDate}</td>
      <td className="w-[80%]">{formattedTime}</td>
      <td align="center">
        {data.observations ? (
          <IconButton
            iconComponent={<FaEye />}
            onClick={handleClickObservations}
          />
        ) : (
          'N/A'
        )}
      </td>
    </tr>
  );
};
export default LateArrivalsTableRow;
