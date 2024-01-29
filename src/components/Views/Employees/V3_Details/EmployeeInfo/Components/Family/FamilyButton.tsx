import { MdArrowOutward } from 'react-icons/md';

import { useModal } from '@/stores/useModal';

import { Button, Icon } from '@/components/ui';

import { FamilyButtonProps } from '@/components/interface/views';

const FamilyButton = (props: FamilyButtonProps) => {
  const { member } = props;

  const { openModal, setModalData } = useModal();

  const handleClick = () => {
    setModalData(member.id);
    openModal('family');
  };

  return (
    <Button className="flex w-full justify-between" onClick={handleClick}>
      <p>
        {member.name} - {member.relationship}
      </p>
      <Icon iconComponent={<MdArrowOutward />} title="Ver" />
    </Button>
  );
};
export default FamilyButton;
