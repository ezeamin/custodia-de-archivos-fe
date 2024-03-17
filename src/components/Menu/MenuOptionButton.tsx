import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui';

import type { MenuOptionButtonProps } from '@/components/interface';

const MenuOptionButton = (props: MenuOptionButtonProps): JSX.Element => {
  // Tomo los props
  const { option } = props;

  const navigate = useNavigate();

  const handlePrevious = (): void => {
    navigate(-1);
  };

  // @ts-expect-error -- Path can be number, but setting that on type breaks everything
  if (option.path === -1)
    return (
      <Button
        lowerCase
        unstyled
        className="mb-4 flex h-10 items-center gap-x-4 rounded-lg px-4 shadow duration-500 dark:text-white"
        colorDark="dark:bg-slate-600"
        colorLight="bg-sky-100"
        onClick={handlePrevious}
      >
        {option.description}
      </Button>
    );

  if ('action' in option)
    return (
      <Button
        lowerCase
        unstyled
        className="mb-4 flex h-10 items-center gap-x-4 rounded-lg px-4 shadow duration-500 dark:text-white"
        colorDark="dark:bg-slate-600"
        colorLight="bg-sky-100"
        onClick={option.action}
      >
        {option.description}
      </Button>
    );

  return (
    <Link
      className="mb-5 flex h-10 items-center gap-x-4 rounded-lg bg-sky-100 px-4 shadow duration-500 dark:bg-slate-600 dark:text-white"
      to={option.path as string}
    >
      {option.description}
    </Link>
  );
};

export default MenuOptionButton;
