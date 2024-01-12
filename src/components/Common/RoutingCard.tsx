import { MdArrowOutward, MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Icon } from '@/components/ui';

import { RoutingCardProps } from '@/components/interface/views';

const RoutingCard = (props: RoutingCardProps) => {
  const { route, index, showType = false } = props;

  if (route.disabled) {
    return (
      <div
        className="cursor-not-allowed !bg-gray-200 dark:!bg-gray-600 animate-in-bottom card content-card h-full !flex-row items-center gap-2 justify-between"
        style={{ animationDelay: `${index * 100 + 100}ms` }}
      >
        <div className="flex flex-row items-center gap-3 max-w-[60%]">
          <Icon iconComponent={<MdOutlineCancel />} title="No Navegar" />
          {showType ? (
            <p className="truncate">
              Tipos de <b>{route.name}</b>
            </p>
          ) : (
            <p className="truncate">{route.name}</p>
          )}
        </div>
        <p className="text-end font-bold w-1/2">No disponible</p>
      </div>
    );
  }

  return (
    <Link
      className="animate-in-bottom card content-card !flex-row items-center gap-3 hover:bg-gray-100 hover:dark:bg-gray-900 transition-colors h-full"
      style={{ animationDelay: `${index * 100 + 100}ms` }}
      to={route.path}
    >
      <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
      {showType ? (
        <p>
          Tipos de <b>{route.name}</b>
        </p>
      ) : (
        <p>{route.name}</p>
      )}
    </Link>
  );
};
export default RoutingCard;
