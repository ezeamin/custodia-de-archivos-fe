import ObservationsMessage from '../Observations/ObservationsMessage';
import List from './List/TrainingsList';
import Table from './Table/TrainingsTable';

import { Modal } from '@/components/ui';

import { TrainingsProps } from '@/components/interface/views';

const TrainingsModal = (props: TrainingsProps) => {
  const { data } = props;

  if (!data) return null;

  return (
    <Modal
      className="pr-1"
      footerChildren={<ObservationsMessage id="trainings" />}
      id="trainings"
      title="Capacitaciones"
    >
      <section className="hidden sm:block">
        <Table data={data} />
      </section>
      <section className="sm:hidden">
        <List data={data} />
      </section>
    </Modal>
  );
};
export default TrainingsModal;
