import ObservationsMessage from '../Observations/ObservationsMessage';
import List from './List/LicensesList';
import Table from './Table/LicensesTable';

import { Alert, Modal } from '@/components/ui';

import { LicensesProps } from '@/components/interface/views';

const LicensesModal = (props: LicensesProps) => {
  const { data } = props;

  if (!data) return null;

  return (
    <Modal
      className="overflow-x-hidden pr-1"
      footerChildren={<ObservationsMessage id="licenses" />}
      id="licenses"
      title="Licencias"
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
export default LicensesModal;
