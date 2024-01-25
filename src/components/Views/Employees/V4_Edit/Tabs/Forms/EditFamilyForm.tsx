import { Alert } from '@/components/ui';

import { EmployeeInfoProps } from '@/components/interface/views';

const EditFamilyForm = (props: EmployeeInfoProps) => {
  const { data: employeeOriginalData } = props;

  console.log(employeeOriginalData);

  return (
    <Alert type="warning">
      Atención! Esta característica aún no está disponible. Lo sentimos
    </Alert>
  );
};
export default EditFamilyForm;
