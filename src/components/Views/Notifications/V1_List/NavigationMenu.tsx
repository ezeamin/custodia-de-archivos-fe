import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Icon } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

const NavigationMenu = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-3">
      <div className="flex gap-3">
        <Link
          className="btn dark:border-gray-500 hover:dark:border-gray-400 w-[calc(50%_-0.30rem)] lg:w-auto"
          to={paths.NOTIFICATIONS.HISTORY}
        >
          Historial
          <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
        </Link>
        <Link
          className="btn dark:border-gray-500 hover:dark:border-gray-400 w-[calc(50%_-0.30rem)] lg:w-auto"
          to={paths.NOTIFICATIONS.SENT}
        >
          Enviadas
          <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
        </Link>
      </div>
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
    </section>
  );
};
export default NavigationMenu;
