import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

import { Icon } from '@/components/ui';

import { ReceiverItemProps } from '@/components/interface/views';

const ReceiverItem = (props: ReceiverItemProps) => {
  const { data } = props;

  const type = data.name.split(' - ')[0];
  const name = data.name.split(' - ')[1];

  return (
    <article className="flex h-full gap-2">
      <img
        alt={data.name}
        className="h-full min-h-[75px] w-[75px] rounded-md object-cover"
        height={75}
        src={data.imgSrc}
        width={75}
      />
      <div>
        <h3>{type}</h3>
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm">{data.email}</p>
        {type === 'Empleado' && (
          <div className="flex items-center gap-1">
            <Icon
              iconComponent={
                data.hasReadNotification ? (
                  <IoCheckmarkCircle color="#328221" />
                ) : (
                  <IoCloseCircle color="#949494" />
                )
              }
              title="Estado"
            />
            <p className="text-sm">
              {data.hasReadNotification ? 'Leído' : 'No leído'}
            </p>
          </div>
        )}
      </div>
    </article>
  );
};
export default ReceiverItem;
