import dayjs from 'dayjs';

import { useObservation } from '@/stores/useObservation';

import { Button } from '@/components/ui';

import { LateArrivalsElementProps } from '@/components/interface/views';

const LateArrivalsListItem = (props: LateArrivalsElementProps) => {
  const { data } = props;

  const { message, setObservationData } = useObservation();

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');
  const formattedTime = dayjs(data.date).format('HH:mm:ss');

  const handleClickObservations = () => {
    if (!data.observations) return;

    setObservationData({ id: 'lateArrivals', message: data.observations });
  };

  return (
    <article className="content-card card flex h-full flex-col justify-between">
      <ul>
        <li>
          Fecha: <b>{formattedDate}</b>
        </li>
        <li>
          Hora de llegada: <b>{formattedTime}</b>
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
export default LateArrivalsListItem;
