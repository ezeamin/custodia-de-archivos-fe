import { FaAngleRight } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

import { Icon } from '@/components/ui';

import type { MenuModuleButtonProps } from '@/components/interface';

const MenuModuleButton = (props: MenuModuleButtonProps): JSX.Element | null => {
  const { el } = props;

  const location = useLocation();

  const currentPath = location.pathname;
  const isActivePage = currentPath.includes(el.path);

  const icon = isActivePage ? <FaAngleRight /> : el.icon;

  const selectedOptionColors =
    'bg-sky-200 dark:bg-gray-800 dark:text-white hover:bg-sky-300 hover:dark:bg-gray-900 border dark:border-gray-500';
  const nonSelectedOptionColors =
    'bg-sky-100 dark:bg-slate-600 dark:text-white hover:bg-sky-200 hover:dark:bg-gray-700';

  if (el.hidden) return null;

  return (
    <Link
      className={`${
        isActivePage ? selectedOptionColors : nonSelectedOptionColors
      } flex gap-x-4 items-center mb-5 px-4 py-2 rounded-lg shadow h-12 w-full ${
        isActivePage ? 'justify-between' : ''
      }`}
      to={el.path}
    >
      <Icon iconComponent={icon} title={el.title} />
      <span>{el.title}</span>
    </Link>
  );
};

export default MenuModuleButton;
