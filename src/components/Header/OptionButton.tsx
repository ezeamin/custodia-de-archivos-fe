'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from 'ui';

import { DTI, DTI_LIST } from 'dti';

import type { MenuOptionButtonProps } from '../interface';

const OptionButton = (props: MenuOptionButtonProps): JSX.Element => {
  const { option } = props;

  const router = useRouter();

  const handlePrevious = (): void => {
    router.back();
  };

  if (option.url === -1) {
    return (
      <Button
        colorDark="dark:btn-ghost"
        colorLight="btn-ghost"
        dti={DTI(DTI_LIST.BUTTON(option.description))}
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
        dti={DTI(DTI_LIST.BUTTON(option.description))}
        ignoreDefaultColor
        onClick={option.action}
      >
        {option.description.toUpperCase()}
      </Button>
    );

  return (
    <Link
      className="btn btn-ghost"
      data-testid={DTI(DTI_LIST.BUTTON(option.description))}
      href={option.url}
    >
      {option.description.toUpperCase()}
    </Link>
  );
};
export default OptionButton;
