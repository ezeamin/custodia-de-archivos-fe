import { Link } from 'react-router-dom';

import { Button } from '../ui';

import { cn } from '@/utilities';

import { TitleProps } from '@/components/interface';

const Title = (props: TitleProps) => {
  const {
    title,
    buttonText,
    onClick,
    href,
    buttonClassName = '',
    ...rest
  } = props;

  const isLink = !!href;
  const showButton = !!('href' in props || 'onClick' in props);

  if (isLink) {
    return (
      <section
        className={
          typeof rest?.className === 'string' ? rest?.className : undefined
        }
      >
        <div className="flex gap-2 justify-between">
          <h1 className="text-4xl font-bold">{title}</h1>
          {showButton && (
            <Link
              className={cn(
                'hidden sm:inline-flex btn btn-primary text-white border-none',
                buttonClassName
              )}
              to={href}
            >
              {buttonText?.toUpperCase()}
            </Link>
          )}
        </div>
        <div className="divider mt-1" />
        {showButton && (
          <Link
            className={cn(
              'sm:hidden btn btn-primary text-white border-none w-full mb-3',
              buttonClassName
            )}
            to={href}
          >
            {buttonText?.toUpperCase()}
          </Link>
        )}
      </section>
    );
  }

  return (
    <section
      className={
        typeof rest?.className === 'string' ? rest?.className : undefined
      }
    >
      <div className="flex gap-2 justify-between">
        <h1 className="text-4xl font-bold">{title}</h1>
        {showButton && (
          <Button
            unbordered
            className={cn('hidden sm:inline-flex text-white', buttonClassName)}
            colorLight="btn-primary"
            onClick={onClick}
          >
            {buttonText?.toUpperCase()}
          </Button>
        )}
      </div>
      <div className="divider mt-1" />
      {showButton && (
        <Button
          unbordered
          className={cn('sm:hidden text-white', buttonClassName)}
          colorLight="btn-primary"
          onClick={onClick}
        >
          {buttonText?.toUpperCase()}
        </Button>
      )}
    </section>
  );
};
export default Title;
