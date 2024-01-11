import AbsencesList from './List/AbsencesList';
import AbsencesTable from './Table/AbsencesTable';

import { Modal } from '@/components/ui';

import { AbsenceProps } from '@/components/interface/views';

const AbsencesModal = (props: AbsenceProps) => {
  const { data } = props;

  if (!data) return null;

  return (
    <Modal className="pr-1" id="absences" title="Inasistencias">
      <section className="hidden sm:block">
        <AbsencesTable data={data} />
      </section>
      <section className="sm:hidden">
        <AbsencesList data={data} />
      </section>
    </Modal>
  );
};
export default AbsencesModal;
