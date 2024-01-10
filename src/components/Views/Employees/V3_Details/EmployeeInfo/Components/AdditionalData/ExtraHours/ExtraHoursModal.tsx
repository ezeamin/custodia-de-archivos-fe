import List from './List/ExtraHoursList';
import Table from './Table/ExtraHoursTable';

import { Modal } from '@/components/ui';

import { ExtraHoursProps } from '@/components/interface/views';

const ExtraHoursModal = (props: ExtraHoursProps) => {
  const { data } = props;

  if (!data) return null;

  return (
    <Modal id="extraHours" title="Horas Extra">
      <section className="hidden sm:block">
        <Table data={data} />
      </section>
      <section className="sm:hidden">
        <List data={data} />
      </section>
    </Modal>
  );
};
export default ExtraHoursModal;
