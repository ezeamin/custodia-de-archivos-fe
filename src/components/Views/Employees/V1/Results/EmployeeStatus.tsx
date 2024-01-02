import { EmployeeStatusProps } from '@/components/interface/views';

// TODO: Make this component available in Mobile

const EmployeeStatus = (props: EmployeeStatusProps) => {
  const { status } = props;

  let color = '';
  switch (status) {
    case 'active':
      color = 'bg-green-500';
      break;
    case 'inactive':
      color = 'bg-red-500';
      break;
    case 'suspended':
      color = 'bg-orange-300';
      break;
    default:
      break;
  }

  return <span className={`${color} w-3 h-3 rounded-full inline-block`} />;
};
export default EmployeeStatus;
