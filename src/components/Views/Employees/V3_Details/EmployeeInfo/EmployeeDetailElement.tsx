import { cn } from '@/utilities';

import { EmployeeDetailsElementProps } from '@/components/interface/views';

const EmployeeDetailsElement = (props: EmployeeDetailsElementProps) => {
  const { name, value, className } = props;

  if (typeof value !== 'string')
    return (
      <article className={cn('flex justify-between gap-3', className)}>
        <p>{name}</p>
        {value}
      </article>
    );

  return (
    <article className={cn('flex justify-between gap-3', className)}>
      <p className="max-w-[50%]">{name}</p>
      <p className="text-end max-w-[50%]">{value}</p>
    </article>
  );
};
export default EmployeeDetailsElement;
