import List from './List/LicensesList';
import Table from './Table/LicensesTable';

import { Modal } from '@/components/ui';

import { LicensesProps } from '@/components/interface/views';

const LicensesModal = (props: LicensesProps) => {
  const { data } = props;

  if (!data) return null;

  return (
    <Modal id="licenses" title="Licencias">
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
