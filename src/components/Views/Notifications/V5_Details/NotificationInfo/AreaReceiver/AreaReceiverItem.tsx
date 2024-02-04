import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

import { Icon } from '@/components/ui';

import { AreaReceiverItemProps } from '@/components/interface/views';

const AreaReceiverItem = (props: AreaReceiverItemProps) => {
  const { receiver } = props;

  return (
    <article className="flex h-full gap-2">
      <img
        alt={receiver.name}
        className="h-full min-h-[75px] w-[75px] rounded-md object-cover"
        height={75}
        src={receiver.imgSrc}
        width={75}
      />
      <div>
        <h3 className="font-bold">{receiver.name}</h3>
        <p className="text-sm">{receiver.email}</p>
        <div className="mt-1 flex items-center gap-1">
          <Icon
            iconComponent={
              receiver.hasReadNotification ? (
                <IoCheckmarkCircle color="#328221" />
              ) : (
                <IoCloseCircle color="#949494" />
              )
            }
            title="Estado"
          />
          <p className="text-sm">
            {receiver.hasReadNotification
              ? `Leído - ${receiver.timeReadNotification}`
              : 'No leído'}
          </p>
        </div>
      </div>
    </article>
  );
};
export default AreaReceiverItem;
