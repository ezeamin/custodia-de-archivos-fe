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
    secondaryButton = null,
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
        <div className="flex justify-between gap-2">
          <h1 className="text-4xl font-bold">{title}</h1>
          <div className="flex items-center gap-2">
            <div className="h-full lg:h-auto">{secondaryButton}</div>
            {showButton && (
              <Link
                className={cn(
                  'btn btn-primary hidden text-white lg:inline-flex',
                  buttonClassName
                )}
                to={href}
              >
                {buttonText?.toUpperCase()}
              </Link>
            )}
          </div>
        </div>
        <div className="divider mt-1" />
        {showButton && (
          <Link
            className={cn(
              'btn btn-primary mb-3 w-full text-white lg:hidden',
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
      <div className="flex justify-between gap-2">
        <h1 className="text-4xl font-bold">{title}</h1>
        {showButton && (
          <Button
            unbordered
            className={cn('hidden text-white sm:inline-flex', buttonClassName)}
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
          className={cn('text-white sm:hidden', buttonClassName)}
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
