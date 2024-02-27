import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';

import EmployeeDataField from '../../../EmployeeDataField';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteFamilyMemberFn } from '@/api/api-calls/employees';

import { useModal } from '@/stores/useModal';

import { Button, Grid } from '@/components/ui';

import { formatCuil } from '@/utilities/utils';

import { FamilyInfoModalContentProps } from '@/components/interface/views';

const FamilyInfoModalContent = (props: FamilyInfoModalContentProps) => {
  const { data } = props;
  const { id: employeeId } = useParams();

  const navigate = useNavigate();
  const { closeModal } = useModal();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteFamilyMember } = useMutation({
    mutationFn: deleteFamilyMemberFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      toast.success('Familiar eliminado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['employee', employeeId],
      });
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleEdit = () => {
    closeModal();
    navigate(`/employees/${employeeId}/family/${data.id}`);
  };

  const handleDelete = () => {
    Swal.fire({
      title: '¿Está seguro?',
      html: `<p>Eliminará al familiar <b>"${data.lastname}, ${data.name}"</b>. Esta acción no se puede revertir.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        deleteFamilyMember({ employeeId: employeeId!, memberId: data.id });
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  const formattedCuil = formatCuil(data.cuil);
  const formattedPhone = data.phone
    ? data.phone.replace(/(\d{2})(\d{4})(\d{4})/, '+$1 $2-$3')
    : 'N/A';
  const formattedAddress = data.address
    ? `${data.address.street.description} ${data.address.streetNumber}${
        data.address.apt ? ` - Dpto. ${data.address.apt}` : ''
      }, ${data.address.locality.description}, ${data.address.state.description}`
    : 'N/A';

  return (
    <>
      <h2 className="text-center text-3xl font-bold">
        {data.lastname}, {data.name}
      </h2>
      <h3 className="text-center text-2xl">{data.relationship.description}</h3>
      <div className="divider" />
      <Grid container gap={2}>
        <Grid item md={6} xs={12}>
          <EmployeeDataField label="CUIL" value={formattedCuil} />
        </Grid>
        <Grid item md={6} xs={12}>
          <EmployeeDataField label="Teléfono" value={formattedPhone} />
        </Grid>
        <Grid item md={6} xs={12}>
          <EmployeeDataField label="Género" value={data.gender.description} />
        </Grid>
        <Grid item md={6} xs={12}>
          <EmployeeDataField
            label="Localidad"
            value={data.address ? data.address.locality.description : 'N/A'}
          />
        </Grid>
        <Grid item xs={12}>
          <EmployeeDataField label="Dirección" value={formattedAddress} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Button
            outlineButton
            className="w-full"
            colorLight="btn-primary"
            disabled={isLoading}
            startIcon={<FaPencil />}
            textColorLight="text-white"
            onClick={handleEdit}
          >
            Editar información
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <Button
            outlineButton
            className="w-full"
            colorLight="btn-error"
            loading={isLoading}
            startIcon={<FaTrash />}
            onClick={handleDelete}
          >
            Eliminar familiar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default FamilyInfoModalContent;
