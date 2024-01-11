import dayjs from 'dayjs';

import { useObservation } from '@/stores/useObservation';

import { Button } from '@/components/ui';

import { LicensesElementProps } from '@/components/interface/views';

const LicensesListItem = (props: LicensesElementProps) => {
  const { data } = props;

  const { message, setObservationData } = useObservation();

  const startDate = dayjs(data.startDate);
  const endDate = dayjs(data.endDate);

  // calculate working days between two dates
  const days = endDate.diff(startDate, 'day') + 1;

  const handleClickObservations = () => {
    if (!data.observations) return;

    setObservationData({ id: 'licenses', message: data.observations });
  };

  return (
    <article className="card content-card flex flex-col justify-between h-full">
      <ul>
        <li>
          Tipo: <b>{data.type.description}</b>
        </li>
        <li>
          Fecha de inicio: <b>{startDate.format('DD/MM/YYYY')}</b>
        </li>
        <li>
          Fecha de fin: <b>{endDate.format('DD/MM/YYYY')}</b>
        </li>
        <li>
          Dias totales: <b>{days}</b>
        </li>
      </ul>
      <footer>
        <div className="divider" />
        {!data.observations && (
          <p className="text-center -mt-1">Sin observaciones</p>
        )}
        {data.observations && data.observations !== message && (
          <Button className="-mt-1" onClick={handleClickObservations}>
            Ver observaciones
          </Button>
        )}
        {data.observations && data.observations === message && (
          <Button disabled className="-mt-1" onClick={handleClickObservations}>
            Observaciones visibles
          </Button>
        )}
      </footer>
    </article>
  );
};
export default LicensesListItem;
