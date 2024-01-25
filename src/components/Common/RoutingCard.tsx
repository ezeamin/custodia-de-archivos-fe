import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useSession } from '@/stores/useSession';

import { Icon } from '@/components/ui';

import { RoutingCardProps } from '@/components/interface/views';

const RoutingCard = (props: RoutingCardProps) => {
  const { route, index, showType = false } = props;

  const { user } = useSession();

  if (!route.allowedRoles?.includes(user?.role ?? '')) return null;

  return (
    <Link
      className="animate-in-bottom content-card h-full !flex-row items-center gap-3 transition-colors hover:bg-gray-100 hover:dark:bg-gray-900"
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
