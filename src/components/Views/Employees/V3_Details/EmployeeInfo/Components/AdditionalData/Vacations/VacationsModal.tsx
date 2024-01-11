import ObservationsMessage from '../Observations/ObservationsMessage';
import List from './List/VacationsList';
import Table from './Table/VacationsTable';

import { Alert, Modal } from '@/components/ui';

import { VacationsProps } from '@/components/interface/views';

const VacationsModal = (props: VacationsProps) => {
  const { data } = props;

  if (!data) return null;

  return (
    <Modal
      className="overflow-x-hidden pr-1"
      footerChildren={<ObservationsMessage id="vacations" />}
      id="vacations"
      title="Llegadas Tarde"
    >
      <Alert className="mb-3">
        La diferencia de días incluye fines de semana y feriados. No se hace
        distinción de días hábiles y no hábiles.
      </Alert>
      <section className="hidden sm:block">
        <Table data={data} />
      </section>
      <section className="sm:hidden">
        <List data={data} />
      </section>
    </Modal>
  );
};
export default VacationsModal;
