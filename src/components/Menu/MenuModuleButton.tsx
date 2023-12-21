import Image from 'next/image';
import Link from 'next/link';

import { DTI, DTI_LIST } from 'dti';

import { type MenuModuleButtonProps } from '../interface';

const MenuModuleButton = (props: MenuModuleButtonProps): JSX.Element => {
  // Tomo los props
  const { el, open = true } = props;

  // Renderizo
  return (
    <Link
      className="bg-sky-100 dark:bg-slate-600 dark:text-white duration-300 flex gap-x-4 hover:bg-sky-200 hover:dark:bg-primary items-center mb-5 px-4 py-2 rounded-lg shadow tooltip tooltip-right w-full"
      data-testid={DTI(DTI_LIST.MENU.LINK(el.id))}
      data-tip={!open ? el.description : null}
      href={el.url}
    >
      <Image
        alt={el.description}
        className="bg-white border-none cursor-pointer rounded-full shadow"
        data-testid={DTI(DTI_LIST.MENU.IMAGE(el.id))}
        height={30}
        src={el.img.src}
        width={30}
      />
      <span
        className={`duration-300 ${!open ? 'scale-0' : ''} origin-left text-l`}
      >
        {el.description}
      </span>
    </Link>
  );
};

export default MenuModuleButton;
