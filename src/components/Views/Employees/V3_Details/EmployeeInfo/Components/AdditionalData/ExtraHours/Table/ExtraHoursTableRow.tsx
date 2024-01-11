import { FaEye } from 'react-icons/fa6';

import dayjs from 'dayjs';

import { useObservation } from '@/stores/useObservation';

import { IconButton } from '@/components/ui';

import { ExtraHoursElementProps } from '@/components/interface/views';

const ExtraHoursTableRow = (props: ExtraHoursElementProps) => {
  const { data } = props;

  const { setObservationData } = useObservation();

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  const handleClickObservations = () => {
    if (!data.observations) return;

    setObservationData({ id: 'extraHours', message: data.observations });
  };

  return (
    <tr>
      <td className="w-[20%]">{formattedDate}</td>
      <td className="w-[80%]">{data.hours} horas</td>
      <td align="right">
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
export default ExtraHoursTableRow;
