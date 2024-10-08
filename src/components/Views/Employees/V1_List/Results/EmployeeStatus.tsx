import { usePortrait } from '@/hooks';

import { cn } from '@/utilities';

import { EmployeeStatusProps } from '@/components/interface/views';

const EmployeeStatus = (props: EmployeeStatusProps) => {
  const { status, expanded, noBadge, className = '' } = props;

  const isPortrait = usePortrait('lg');

  let color = '';
  let portraitColors = '';
  let text = '';
  switch (status.description) {
    case 'active':
      color = 'bg-green-500';
      portraitColors = 'border-green-600 text-green-600';
      text = 'Activo';
      break;
    case 'inactive':
      color = 'bg-red-500';
      portraitColors = 'border-red-600 text-red-600';
      text = 'Inactivo';
      break;
    case 'suspended':
      color = 'bg-orange-300';
      portraitColors = 'border-orange-600 text-orange-600';
      text = 'Suspendido';
      break;
    case 'deleted':
      color = 'bg-gray-500';
      portraitColors = 'border-gray-600 text-gray-600';
      text = 'Eliminado';
      break;
    default:
      break;
  }

  if (noBadge) {
    return (
      <div className="flex">
        <span className={`${color} mr-2 inline-block h-3 w-3 rounded-full`} />
        <p>{text}</p>
      </div>
    );
  }

  if (isPortrait || expanded) {
    return (
      <span className={cn(`badge badge-outline ${portraitColors}`, className)}>
        <span className={`${color} mr-2 inline-block h-3 w-3 rounded-full`} />
        <p>{text}</p>
      </span>
    );
  }

  return (
    <span
      className={cn(`${color} inline-block h-3 w-3 rounded-full`, className)}
    />
  );
};
export default EmployeeStatus;
