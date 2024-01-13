import { MdArrowOutward, MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Icon } from '@/components/ui';

import { RoutingCardProps } from '@/components/interface/views';

const RoutingCard = (props: RoutingCardProps) => {
  const { route, index, showType = false } = props;

  if (route.disabled) {
    return (
      <div
        className="animate-in-bottom content-card card h-full cursor-not-allowed !flex-row items-center justify-between gap-2 !bg-gray-200 dark:!bg-gray-600"
        style={{ animationDelay: `${index * 100 + 100}ms` }}
      >
        <div className="flex max-w-[60%] flex-row items-center gap-3">
          <Icon iconComponent={<MdOutlineCancel />} title="No Navegar" />
          {showType ? (
            <p className="truncate">
              Tipos de <b>{route.name}</b>
            </p>
          ) : (
            <p className="truncate">{route.name}</p>
          )}
        </div>
        <p className="w-1/2 text-end font-bold">No disponible</p>
      </div>
    );
  }

  return (
    <Link
      className="animate-in-bottom content-card card h-full !flex-row items-center gap-3 transition-colors hover:bg-gray-100 hover:dark:bg-gray-900"
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
