import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Beneficiaries from './Beneficiaries/Beneficiaries';
import LifeInsuranceEditPanel from './LifeInsuranceEditPanel';
import LifeInsuranceInfoPanel from './LifeInsuranceInfoPanel';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteLifeInsuranceFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Modal } from '@/components/ui';

import { LifeInsuranceModalData } from '@/components/interface/views';

const LifeInsuranceInfoModal = () => {
  const { id: employeeId } = useParams();
  const { data: lifeInsurance, closeModal } =
    useModal() as LifeInsuranceModalData;

  const [isEditing, setIsEditing] = useState(false);

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteLifeInsurance, status } = useMutation({
    mutationFn: deleteLifeInsuranceFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success('Seguro de vida eliminado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['employee', employeeId],
      });
      closeModal();
    },
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleClickEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleClickDelete = () => {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está por eliminar el seguro "${lifeInsurance.name}". No podrá revertir esto`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        deleteLifeInsurance({
          lifeInsuranceId: lifeInsurance?.id,
          employeeId: employeeId!,
        });
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <Modal
      className="overflow-x-hidden px-1 pt-0"
      id="lifeInsuranceInfo"
      title="Seguro de vida"
      onClose={() => {
        setIsEditing(false);
      }}
    >
      {isEditing ? (
        <LifeInsuranceEditPanel
          data={lifeInsurance}
          onFinishEdit={handleClickEdit}
        />
      ) : (
        <LifeInsuranceInfoPanel
          data={lifeInsurance}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
        />
      )}
      <Beneficiaries
        employeeId={employeeId!}
        isEditing={isEditing}
        lifeInsurance={lifeInsurance}
      />
    </Modal>
  );
};
export default LifeInsuranceInfoModal;
