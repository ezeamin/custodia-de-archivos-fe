import { useModal } from '@/stores/useModal';

import { Button } from '@/components/ui';

import { AddNewProps } from '@/components/interface/views';

const AddNewButton = (props: AddNewProps) => {
  const { disabled = false, modalName } = props;

  const { openModal } = useModal();

  const handleOpen = () => {
    if (!disabled) openModal(modalName);
  };

  return (
    <Button
      className="w-full sm:w-auto md:w-full lg:w-auto"
      colorLight="btn-primary"
      disabled={disabled}
      textColorLight="text-white"
      onClick={handleOpen}
    >
      Cargar nueva
    </Button>
  );
};
export default AddNewButton;
