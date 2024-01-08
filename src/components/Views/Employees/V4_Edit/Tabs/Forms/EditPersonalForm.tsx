import { EmployeeInfoProps } from '@/components/interface/views';

const EditPersonalForm = (props: EmployeeInfoProps) => {
  const { data } = props;

  console.log(data);

  return <div>EditPersonalForm</div>;
};
export default EditPersonalForm;
