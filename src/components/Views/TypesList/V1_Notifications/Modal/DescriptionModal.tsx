import { useModal } from '@/stores/useModal';

import { Modal } from '@/components/ui';

const DescriptionModal = () => {
  const { data } = useModal();

  // I love TS!
  if (
    data &&
    typeof data === 'object' &&
    'title' in data &&
    'description' in data &&
    typeof data.title === 'string' &&
    typeof data.description === 'string'
  ) {
    return (
      <Modal id="notificationTypeDescription" title={data.title}>
        <p>{data.description}</p>
      </Modal>
    );
  }

  return null;
};
export default DescriptionModal;
