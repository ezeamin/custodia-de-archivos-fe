import dayjs from 'dayjs';

import { useObservation } from '@/stores/useObservation';

import { Button } from '@/components/ui';

import { TrainingsElementProps } from '@/components/interface/views';

const TrainingsListItem = (props: TrainingsElementProps) => {
  const { data } = props;

  const { message, setObservationData } = useObservation();

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  const handleClickObservations = () => {
    if (!data.observations) return;

    setObservationData({ id: 'trainings', message: data.observations });
  };

  return (
    <article className="card content-card flex flex-col justify-between h-full">
      <ul>
        <li>
          Fecha: <b>{formattedDate}</b>
        </li>
        <li>
          Tipo: <b>{data.type.description}</b>
        </li>
        <li>
          Razón: <b>{data.reason}</b>
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
export default TrainingsListItem;
