import dayjs from 'dayjs';

import { useObservation } from '@/stores/useObservation';

import { Button } from '@/components/ui';

import { ExtraHoursElementProps } from '@/components/interface/views';

const ExtraHoursListItem = (props: ExtraHoursElementProps) => {
  const { data } = props;

  const { message, setObservationData } = useObservation();

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  const handleClickObservations = () => {
    if (!data.observations) return;

    setObservationData({ id: 'extraHours', message: data.observations });
  };

  return (
    <article className="content-card flex h-full flex-col justify-between">
      <ul>
        <li>
          Fecha: <b>{formattedDate}</b>
        </li>
        <li>
          Cantidad de horas extra: <b>{data.hours}</b>
        </li>
      </ul>
      <footer>
        <div className="divider" />
        {!data.observations && (
          <p className="-mt-1 text-center">Sin observaciones</p>
        )}
        {data.observations && data.observations !== message && (
          <Button className="-mt-1 w-full" onClick={handleClickObservations}>
            Ver observaciones
          </Button>
        )}
        {data.observations && data.observations === message && (
          <Button
            disabled
            className="-mt-1 w-full"
            onClick={handleClickObservations}
          >
            Observaciones visibles
          </Button>
        )}
      </footer>
    </article>
  );
};
export default ExtraHoursListItem;
