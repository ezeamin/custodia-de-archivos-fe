import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { Button, Icon } from '../ui';

import { TitleProps } from '@/components/interface';

const Title = (props: TitleProps) => {
  const { title, showBackButton, ...rest } = props;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section
      className={
        typeof rest?.className === 'string' ? rest?.className : undefined
      }
    >
      <div className="flex gap-2 justify-between">
        <h1 className="text-4xl">{title}</h1>
        {showBackButton && (
          <Button
            unbordered
            className="hover:bg-slate-500 dark:hover:bg-slate-700 fixed bottom-4 left-4 md:relative md:bottom-0 md:left-0"
            colorDark="dark:bg-slate-600"
            colorLight="bg-slate-400"
            textColorDark="dark:text-white"
            onClick={handleBack}
          >
            <Icon iconComponent={<IoMdArrowRoundBack />} title="Atrás" />
          </Button>
        )}
      </div>
      <div className="divider mt-1" />
    </section>
  );
};
export default Title;
