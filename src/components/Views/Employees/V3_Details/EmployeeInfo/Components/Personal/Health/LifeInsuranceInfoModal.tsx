import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
      <section className="mt-5 flex flex-col items-center justify-between sm:flex-row">
        <h2 className="mb-2 font-bold sm:mb-0">Beneficiarios</h2>
        <Link
          className="btn btn-primary mb-3 w-full text-white sm:mb-0 sm:w-auto"
          to={`/employees/${employeeId}/life-insurance/${lifeInsurance?.id}/beneficiary`}
          // to={`/employees/${employeeId}/life-insurance/${lifeInsurance?.id}/beneficiary/${beneficiary?.id}`}
        >
          AGREGAR BENEFICIARIO
        </Link>
      </section>
      <p className="mt-3 text-center">
        Acá iría la lista de beneficiarios lol xd
      </p>
    </Modal>
  );
};
export default LifeInsuranceInfoModal;
