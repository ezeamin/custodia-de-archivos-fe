import { MdArrowOutward } from 'react-icons/md';

import { useModal } from '@/stores/useModal';

import { Button, Icon } from '@/components/ui';

import { LifeInsuranceButtonProps } from '@/components/interface/views';

const LifeInsuranceButton = (props: LifeInsuranceButtonProps) => {
  const { data } = props;

  const { openModal, setModalData } = useModal();

  const handleClick = () => {
    setModalData(data);
    openModal('lifeInsuranceInfo');
  };

  return (
    <Button className="flex w-full justify-between" onClick={handleClick}>
      <p>
        {data.name} - {data.policyNumber}
      </p>
      <Icon iconComponent={<MdArrowOutward />} title="Ver" />
    </Button>
  );
};
export default LifeInsuranceButton;
