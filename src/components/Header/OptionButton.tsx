import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui';

import type { MenuOptionButtonProps } from '@/components/interface';

const OptionButton = (props: MenuOptionButtonProps): JSX.Element => {
  const { option } = props;

  const navigate = useNavigate();

  const handlePrevious = (): void => {
    navigate(-1);
  };

  if (option.path === -1) {
    return (
      <Button
        colorDark="dark:btn-ghost"
        colorLight="btn-ghost"
        ignoreDefaultColor
        onClick={handlePrevious}
        type="button"
      >
        {option.description.toUpperCase()}
      </Button>
    );
  }

  if ('action' in option)
    return (
      <Button
        colorDark="dark:btn-ghost"
        colorLight="btn-ghost"
        ignoreDefaultColor
        onClick={option.action}
      >
        {option.description.toUpperCase()}
      </Button>
    );

  return (
    <Link className="btn btn-ghost" to={option.path}>
      {option.description.toUpperCase()}
    </Link>
  );
};
export default OptionButton;
