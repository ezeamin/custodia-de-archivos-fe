import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteBeneficiaryFn } from '@/api/api-calls/employees';

import { useModal } from '@/stores/useModal';

import { Button, Grid } from '@/components/ui';

import { formatAddress, formatCuil } from '@/utilities/utils';

import { BeneficiaryItemProps } from '@/components/interface/views';

const BeneficiaryItem = (props: BeneficiaryItemProps) => {
  const { beneficiary, lifeInsuranceId } = props;

  const { id: employeeId } = useParams();
  const { closeModal } = useModal();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteBeneficiary } = useMutation({
    mutationFn: deleteBeneficiaryFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      toast.success('Beneficiario eliminado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['employee', employeeId],
      });
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleClickDeletion = () => {
    Swal.fire({
      title: '¿Está seguro?',
      html: `<p>Eliminará al beneficiario <b>"${beneficiary.lastname}, ${beneficiary.name}"</b>. Esta acción no se puede revertir.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        deleteBeneficiary({
          employeeId: employeeId!,
          lifeInsuranceId,
          beneficiaryId: beneficiary.id,
        });
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  const formattedCuil = formatCuil(beneficiary?.cuil);
  const formattedAddress = formatAddress(beneficiary?.address);

  return (
    <article className="content-card">
      <div className="flex justify-between gap-2">
        <h2 className="mb-0 text-xl font-bold">
          {beneficiary.lastname}, {beneficiary.name}
        </h2>
        <h2 className="mb-0 text-xl font-bold">
          {beneficiary?.percentage !== null && `${beneficiary.percentage}%`}
        </h2>
      </div>
      <p className="text-sm">{beneficiary.relationship.description}</p>
      <p>
        CUIL: <span className="font-bold">{formattedCuil}</span>
      </p>
      <p>
        Dirección: <span className="font-bold">{formattedAddress}</span>
      </p>
      <div className="divider my-1" />
      <Grid container gap={2}>
        <Grid item sm={6} xs={12}>
          <Link
            className={`btn w-full ${isLoading ? 'btn-disabled' : ''}`}
            to={`/employees/${employeeId}/life-insurance/${lifeInsuranceId}/beneficiary/${beneficiary.id}`}
          >
            <FaPencil />
            EDITAR
          </Link>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button
            outlineButton
            className="w-full"
            colorLight="btn-error"
            loading={isLoading}
            startIcon={<FaTrash />}
            onClick={handleClickDeletion}
          >
            ELIMINAR
          </Button>
        </Grid>
      </Grid>
    </article>
  );
};
export default BeneficiaryItem;
