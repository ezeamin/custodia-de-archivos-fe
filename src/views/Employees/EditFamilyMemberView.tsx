import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getFamilyMemberInfoFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import Title from '@/components/Common/Title';
import ErrorMessage from '@/components/Error/ErrorMessage';
import FamilyMemberForm from '@/components/Views/Employees/V5_Family/FamilyMemberForm';

const EditFamilyMemberView = () => {
  const { id: employeeId, memberId } = useParams();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const {
    data: familyMemberData,
    isLoading,
    isError,
    status,
    refetch,
  } = useQuery({
    queryKey: [`family_${memberId}`],
    queryFn: () =>
      getFamilyMemberInfoFn({ employeeId: employeeId!, memberId: memberId! }),
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
          title="Editar familiar"
        />
        <ErrorMessage refetch={handleRetry} />;
      </>
    );
  }

  if (familyMemberData?.data) {
    return (
      <>
        <Title
          buttonClassName="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
          buttonText="Cancelar edición"
          href={`/employees/${employeeId}/personal`}
          title="Editar familiar"
        />
        <FamilyMemberForm memberOriginalData={familyMemberData?.data} />
      </>
    );
  }

  return null;
};

export default EditFamilyMemberView;
