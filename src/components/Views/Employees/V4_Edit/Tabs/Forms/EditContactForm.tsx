import { EmployeeInfoProps } from '@/components/interface/views';

const EditContactForm = (props: EmployeeInfoProps) => {
  const { data } = props;

  console.log(data);

  return <div>EditContactForm</div>;
};
export default EditContactForm;
