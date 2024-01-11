import FormalWarningsList from './List/FormalWarningsList';
import FormalWarningsTable from './Table/FormalWarningsTable';

import { Modal } from '@/components/ui';

import { FormalWarningsProps } from '@/components/interface/views';

const FormalWarningsModal = (props: FormalWarningsProps) => {
  const { data } = props;

  if (!data) return null;

  return (
    <Modal className="pr-1" id="formalWarnings" title="Llamados de Atención">
      <section className="hidden sm:block">
        <FormalWarningsTable data={data} />
      </section>
      <section className="sm:hidden">
        <FormalWarningsList data={data} />
      </section>
    </Modal>
  );
};
export default FormalWarningsModal;
