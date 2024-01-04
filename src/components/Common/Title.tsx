import { Link } from 'react-router-dom';

import { Button } from '../ui';

import { TitleProps } from '@/components/interface';

const Title = (props: TitleProps) => {
  const { title, buttonText, onClick, href, ...rest } = props;

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
          <h1 className="text-4xl">{title}</h1>
          {showButton && (
            <Link
              className="hidden md:inline-flex btn btn-primary text-white border-none"
              to={href}
            >
              {buttonText?.toUpperCase()}
            </Link>
          )}
        </div>
        <div className="divider mt-1" />
        {showButton && (
          <Link
            className="md:hidden btn btn-primary text-white border-none w-full mb-3"
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
        <h1 className="text-4xl">{title}</h1>
        {showButton && (
          <Button
            unbordered
            className="hidden md:inline-flex text-white"
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
          className="md:hidden text-white"
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
