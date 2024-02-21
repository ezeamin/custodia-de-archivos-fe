import { useModal } from '@/stores/useModal';

import { Button } from '@/components/ui';

const AddNewFolder = () => {
  const { openModal } = useModal();

  const handleOpen = () => {
    openModal('addNewFolder');
  };

  return (
    <Button
      outlineButton
      className="w-full sm:w-auto lg:w-auto"
      colorLight="btn-primary"
      textColorLight="text-white"
      onClick={handleOpen}
    >
      Nueva carpeta
    </Button>
  );
};
export default AddNewFolder;
