import { Link } from 'react-router-dom';

import { Icon } from '../ui';

import type { MenuModuleButtonProps } from '@/components/interface';

const MenuModuleButton = (props: MenuModuleButtonProps): JSX.Element | null => {
  const { el, open = true } = props;

  if (el.hidden) return null;

  return (
    <Link
      className="bg-sky-100 dark:bg-slate-600 dark:text-white duration-300 flex gap-x-4 hover:bg-sky-200 hover:dark:bg-gray-700 items-center mb-5 px-4 py-2 rounded-lg shadow tooltip tooltip-right w-full"
      data-tip={!open ? el.description : null}
      to={el.path}
    >
      <Icon
        className={`duration-200 ${!open ? 'ml-1' : ''}`}
        iconComponent={el.icon}
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
