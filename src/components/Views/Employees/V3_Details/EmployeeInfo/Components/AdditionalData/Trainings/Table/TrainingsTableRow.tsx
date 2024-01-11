import { FaEye } from 'react-icons/fa6';

import dayjs from 'dayjs';

import { useObservation } from '@/stores/useObservation';

import { IconButton } from '@/components/ui';

import { TrainingsElementProps } from '@/components/interface/views';

const TrainingsTableRow = (props: TrainingsElementProps) => {
  const { data } = props;

  const { setObservationData } = useObservation();

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  const handleClickObservations = () => {
    if (!data.observations) return;

    setObservationData({ id: 'trainings', message: data.observations });
  };

  return (
    <tr>
      <td>{formattedDate}</td>
      <td>{data.type.description}</td>
      <td>{data.reason}</td>
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
export default TrainingsTableRow;
