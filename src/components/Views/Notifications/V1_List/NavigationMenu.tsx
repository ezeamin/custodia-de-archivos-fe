import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Icon } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

const NavigationMenu = () => {
  return (
    <section className="flex flex-col sm:flex-row gap-3">
      <Link
        className="btn dark:border-gray-500 hover:dark:border-gray-400"
        to={paths.NOTIFICATIONS.HISTORY}
      >
        Historial
        <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
      </Link>
      <Link
        className="btn dark:border-gray-500 hover:dark:border-gray-400"
        to={paths.NOTIFICATIONS.ADMIN_TYPES}
      >
        Administrar tipos
        <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
      </Link>
    </section>
  );
};
export default NavigationMenu;
