import { usePortrait } from '@/hooks';

import { cn } from '@/utilities';

import { EmployeeStatusProps } from '@/components/interface/views';

const EmployeeStatus = (props: EmployeeStatusProps) => {
  const { status, expanded, className = '' } = props;

  const isPortrait = usePortrait();

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

  if (isPortrait || expanded) {
    return (
      <span className={cn(`badge badge-outline ${portraitColors}`, className)}>
        <span className={`${color} w-3 h-3 rounded-full inline-block mr-2`} />
        <p>{text}</p>
      </span>
    );
  }

  return (
    <span
      className={cn(`${color} w-3 h-3 rounded-full inline-block`, className)}
    />
  );
};
export default EmployeeStatus;
