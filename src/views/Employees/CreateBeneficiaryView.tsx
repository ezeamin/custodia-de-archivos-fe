import { useParams } from 'react-router-dom';

import Title from '@/components/Common/Title';
import CreateBeneficiaryForm from '@/components/Views/Employees/V6_Beneficiary/CreateBeneficiaryForm';

const CreateBeneficiaryView = () => {
  const { id: employeeId } = useParams();

  return (
    <>
      <Title
        buttonClassName="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
        buttonText="Cancelar"
        href={`/employees/${employeeId}/personal`}
        title="Agregar Beneficiario"
      />
      <CreateBeneficiaryForm />
    </>
  );
};
export default CreateBeneficiaryView;
