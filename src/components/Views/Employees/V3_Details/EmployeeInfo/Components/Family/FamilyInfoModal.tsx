import { useParams } from 'react-router-dom';

import FamilyInfoModalContent from './FamilyInfoModalContent';
import { useQuery } from '@tanstack/react-query';

import { getFamilyMemberInfoFn } from '@/api/api-calls/employees';

import { useModal } from '@/stores/useModal';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Modal } from '@/components/ui';

import { FamilyModalData } from '@/components/interface/views';

const FamilyInfoModal = () => {
  const { id: employeeId } = useParams();
  const { data: memberId } = useModal() as FamilyModalData;

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const {
    data: familyMemberData,
    isFetching,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['familyMember', memberId],
    queryFn: () => getFamilyMemberInfoFn({ employeeId: employeeId!, memberId }),
    enabled: !!(memberId && employeeId),
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleRetry = () => {
    refetch();
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <Modal className="overflow-x-hidden px-1" id="family" title="">
      {isFetching && <p className="text-center">Cargando familiar...</p>}
      {isError && <ErrorMessage refetch={handleRetry} />}
      {isSuccess && !isFetching && familyMemberData.data && (
        <FamilyInfoModalContent data={familyMemberData.data} />
      )}
    </Modal>
  );
};
export default FamilyInfoModal;
