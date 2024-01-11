import ObservationsMessage from '../Observations/ObservationsMessage';
import List from './List/LateArrivalsList';
import Table from './Table/LateArrivalsTable';

import { Modal } from '@/components/ui';

import { LateArrivalsProps } from '@/components/interface/views';

const LateArrivalsModal = (props: LateArrivalsProps) => {
  const { data } = props;

  if (!data) return null;

  return (
    <Modal
      className="pr-1"
      footerChildren={<ObservationsMessage id="lateArrivals" />}
      id="lateArrivals"
      title="Llegadas Tarde"
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
export default LateArrivalsModal;
