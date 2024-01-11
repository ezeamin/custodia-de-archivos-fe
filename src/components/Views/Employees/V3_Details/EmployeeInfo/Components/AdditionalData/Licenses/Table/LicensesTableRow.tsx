import { FaEye } from 'react-icons/fa6';

import dayjs from 'dayjs';

import { useObservation } from '@/stores/useObservation';

import { IconButton } from '@/components/ui';

import { LicensesElementProps } from '@/components/interface/views';

const LicensesTableRow = (props: LicensesElementProps) => {
  const { data } = props;

  const { setObservationData } = useObservation();

  const startDate = dayjs(data.startDate);
  const endDate = dayjs(data.endDate);

  // calculate working days between two dates
  const days = endDate.diff(startDate, 'day') + 1;

  const handleClickObservations = () => {
    if (!data.observations) return;

    setObservationData({ id: 'licenses', message: data.observations });
  };

  return (
    <tr>
      <td>{data.type.description}</td>
      <td>{startDate.format('DD/MM/YYYY')}</td>
      <td>{endDate.format('DD/MM/YYYY')}</td>
      <td align="right">{days}</td>
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
export default LicensesTableRow;
