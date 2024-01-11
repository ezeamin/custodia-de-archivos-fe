import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Icon } from '@/components/ui';

import { RoutingCardProps } from '@/components/interface/views';

const RoutingCard = (props: RoutingCardProps) => {
  const { route, index } = props;

  return (
    <Link
      className={`animate-in-bottom a-delay-${
        index * 100 + 100
      } card content-card !flex-row items-center gap-3 hover:bg-gray-100 hover:dark:bg-gray-900 transition-colors`}
      to={route.path}
    >
      <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
      <p>
        Tipos de <b>{route.name}</b>
      </p>
    </Link>
  );
};
export default RoutingCard;
