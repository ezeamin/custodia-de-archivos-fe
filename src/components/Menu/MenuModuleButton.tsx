import { FaAngleRight } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

import { Icon } from '@/components/ui';

import type { MenuModuleButtonProps } from '@/components/interface';

const MenuModuleButton = (props: MenuModuleButtonProps): JSX.Element | null => {
  const { el, open = true } = props;

  const location = useLocation();

  const currentPath = location.pathname;
  const isActivePage = currentPath.includes(el.path);

  const icon = isActivePage ? <FaAngleRight /> : el.icon;

  const selectedOptionColors = 'bg-sky-200 dark:bg-gray-700';
  const nonSelectedOptionColors =
    'bg-sky-100 dark:bg-slate-600 dark:text-white hover:bg-sky-200 hover:dark:bg-gray-700';

  if (el.hidden) return null;

  return (
    <Link
      className={`${
        isActivePage ? selectedOptionColors : nonSelectedOptionColors
      } duration-300 flex gap-x-4 items-center mb-5 px-4 py-2 rounded-lg shadow tooltip tooltip-right h-12 ${
        open ? 'w-full' : 'w-12'
      } ${isActivePage ? 'justify-between' : ''}`}
      data-tip={!open ? el.description : null}
      to={el.path}
    >
      <Icon
        className="duration-200"
        iconComponent={open ? icon : el.icon}
        title={el.title}
      />
      <span
        className={`duration-200 ${!open ? 'scale-0' : ''} origin-left text-l`}
      >
        {el.title}
      </span>
    </Link>
  );
};

export default MenuModuleButton;
