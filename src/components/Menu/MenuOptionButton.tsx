import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from 'ui';

import { DTI, DTI_LIST } from 'dti';

import { type MenuOptionButtonProps } from '../interface';

const MenuOptionButton = (props: MenuOptionButtonProps): JSX.Element => {
  // Tomo los props
  const { option } = props;

  const router = useRouter();

  const handlePrevious = (): void => {
    router.back();
  };

  if (option.url === -1)
    return (
      <Button
        className="duration-500 flex gap-x-4 items-center h-10 mb-4 px-4 rounded-lg shadow dark:text-white"
        colorDark="dark:bg-slate-600"
        colorLight="bg-sky-100"
        dti={DTI(DTI_LIST.BUTTON(option.description))}
        lowerCase
        onClick={handlePrevious}
        unstyled
      >
        {option.description}
      </Button>
    );

  if ('action' in option)
    return (
      <Button
        className="duration-500 flex gap-x-4 items-center h-10 mb-4 px-4 rounded-lg shadow dark:text-white"
        colorDark="dark:bg-slate-600"
        colorLight="bg-sky-100"
        dti={DTI(DTI_LIST.BUTTON(option.description))}
        lowerCase
        onClick={option.action}
        unstyled
      >
        {option.description}
      </Button>
    );

  return (
    <Link
      className="bg-sky-100 dark:bg-slate-600 duration-500 flex gap-x-4 items-center h-10 mb-5 px-4 rounded-lg shadow dark:text-white"
      data-testid={DTI(DTI_LIST.MENU.LINK(option.id))}
      href={option.url}
    >
      {option.description}
    </Link>
  );
};

export default MenuOptionButton;
