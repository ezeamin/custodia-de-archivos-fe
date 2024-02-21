import { useModal } from '@/stores/useModal';

import { Button } from '@/components/ui';

const AddNewDocument = () => {
  const { openModal } = useModal();

  const handleOpen = () => {
    openModal('addNewDocument');
  };

  return (
    <Button
      className="w-full sm:w-auto lg:w-auto"
      colorLight="btn-primary"
      textColorLight="text-white"
      onClick={handleOpen}
    >
      Nuevo documento
    </Button>
  );
};
export default AddNewDocument;
