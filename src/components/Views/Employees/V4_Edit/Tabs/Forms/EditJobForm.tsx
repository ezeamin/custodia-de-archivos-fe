import { EmployeeInfoProps } from '@/components/interface/views';

const EditJobForm = (props: EmployeeInfoProps) => {
  const { data } = props;

  console.log(data);

  return <div>EditJobForm</div>;
};
export default EditJobForm;
