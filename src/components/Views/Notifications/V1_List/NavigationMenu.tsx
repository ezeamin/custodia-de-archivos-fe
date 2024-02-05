import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useSession } from '@/stores/useSession';

import { Icon } from '@/components/ui';

import { paths } from '@/constants/routes/paths';
import { userRoles } from '@/constants/userRoles/userRoles';

const NavigationMenu = () => {
  const { user } = useSession();

  return (
    <section className="flex flex-col gap-3 lg:flex-row">
      <div className="flex gap-3">
        <Link
          className="btn w-[calc(50%_-0.30rem)] dark:border-gray-500 hover:dark:border-gray-400 lg:w-auto"
          to={paths.NOTIFICATIONS.READ}
        >
          Leidas
          <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
        </Link>
        <Link
          className="btn w-[calc(50%_-0.30rem)] dark:border-gray-500 hover:dark:border-gray-400 lg:w-auto"
          to={paths.NOTIFICATIONS.SENT}
        >
          Enviadas
          <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
        </Link>
      </div>
      {user?.role === userRoles.ADMIN && (
        <>
          <Link
            className="btn dark:border-gray-500 hover:dark:border-gray-400"
            to={paths.TYPES_LIST.NOTIFICATIONS}
          >
            Administrar tipos
            <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
          </Link>
          <Link
            className="btn dark:border-gray-500 hover:dark:border-gray-400"
            to={paths.TYPES_LIST.NOTIFICATIONS}
          >
            Administrar horarios
            <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
          </Link>
        </>
      )}
    </section>
  );
};
export default NavigationMenu;
