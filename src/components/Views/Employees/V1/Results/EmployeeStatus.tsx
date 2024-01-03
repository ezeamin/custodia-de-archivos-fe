import { usePortrait } from '@/hooks';

import { EmployeeStatusProps } from '@/components/interface/views';

const EmployeeStatus = (props: EmployeeStatusProps) => {
  const { status } = props;

  const isPortrait = usePortrait();

  let color = '';
  let portraitColors = '';
  let text = '';
  switch (status) {
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
    default:
      break;
  }

  if (isPortrait) {
    return (
      <span className={`badge badge-outline ${portraitColors}`}>
        <span className={`${color} w-3 h-3 rounded-full inline-block mr-2`} />
        <p>{text}</p>
      </span>
    );
  }

  return <span className={`${color} w-3 h-3 rounded-full inline-block`} />;
};
export default EmployeeStatus;
