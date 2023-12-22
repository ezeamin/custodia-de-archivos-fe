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

  if (option.path === -1)
    return (
      <Button
        className="duration-500 flex gap-x-4 items-center h-10 mb-4 px-4 rounded-lg shadow dark:text-white"
        colorDark="dark:bg-slate-600"
        colorLight="bg-sky-100"
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
      to={option.path}
    >
      {option.description}
    </Link>
  );
};

export default MenuOptionButton;
