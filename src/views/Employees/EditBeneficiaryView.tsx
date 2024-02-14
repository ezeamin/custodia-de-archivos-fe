import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getBeneficiaryInfoFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import Title from '@/components/Common/Title';
import ErrorMessage from '@/components/Error/ErrorMessage';
import CreateBeneficiaryForm from '@/components/Views/Employees/V6_Beneficiary/CreateBeneficiaryForm';

const EditBeneficiaryView = () => {
  const { id: employeeId, lifeInsuranceId, beneficiaryId } = useParams();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const {
    data: beneficiaryOriginalData,
    isLoading,
    isError,
    status,
    refetch,
  } = useQuery({
    queryKey: ['beneficiary', beneficiaryId],
    queryFn: () =>
      getBeneficiaryInfoFn({
        employeeId: employeeId!,
        lifeInsuranceId: lifeInsuranceId!,
        beneficiaryId: beneficiaryId!,
      }),
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleRetry = () => {
    refetch();
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (isError) {
    return (
      <>
        <Title
          buttonClassName="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
          buttonText="Cancelar edición"
          href={`/employees/${employeeId}/personal`}
          title="Editar Beneficiario"
        />
        <ErrorMessage refetch={handleRetry} />;
      </>
    );
  }

  if (beneficiaryOriginalData?.data) {
    return (
      <>
        <Title
          buttonClassName="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
          buttonText="Cancelar edición"
          href={`/employees/${employeeId}/personal`}
          title="Editar Beneficiario"
        />
        <CreateBeneficiaryForm
          beneficiaryOriginalData={beneficiaryOriginalData?.data}
        />
      </>
    );
  }

  return null;
};
export default EditBeneficiaryView;
