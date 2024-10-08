import { useState } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getEmployeeLicensesTypesFn,
  postEmployeeLicenseFn,
} from '@/api/api-calls/employees';

import { useLoading, useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import {
  Alert,
  ComboBoxInput,
  DateInput,
  Icon,
  Modal,
  TextAreaInput,
} from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import {
  AddNewLicenseSchema,
  addNewLicenseSchema,
} from '@/form-schemas/schemas/employees/addNewLicenseSchema';

const AddNewLicenseModal = () => {
  // -------------------------------------------------
  // STATE & FORM
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  const { closeModal } = useModal();
  const { control, onSubmitMiddleware, reset, watch } =
    useZodForm(addNewLicenseSchema);

  const [isLoading, setIsLoading] = useState(false);

  const selectedLicenseType = watch('type');

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const {
    data: licensesTypes,
    isLoading: isLoadingLicensesTypes,
    isError: isErrorLicensesTypes,
    status: statusLicensesTypes,
  } = useQuery({
    queryKey: ['employeeLicensesTypes'],
    queryFn: getEmployeeLicensesTypesFn,
  });

  const { mutate: addLicense } = useMutation({
    mutationFn: postEmployeeLicenseFn,
    onError: () => {
      setIsLoading(false);
      reset();
      closeModal();
      toast.error(
        'Ocurrió un error guardando la licencia. Intente nuevamente más tarde'
      );
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      closeModal();
      toast.success(`La licencia fue registrada correctamente`);
      queryClient.invalidateQueries({
        queryKey: ['employeeLicenses', employeeId],
      });
    },
  });

  useLoading(isLoadingLicensesTypes, statusLicensesTypes);

  if (isErrorLicensesTypes) {
    toast.error(
      'Ocurrió un error al obtener los tipos de licencias. Intente nuevamente más tarde'
    );
    reset();
    closeModal();
  }

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (formData: AddNewLicenseSchema) => {
    setIsLoading(true);

    if (!employeeId) {
      toast.error('No se pudo obtener el id del empleado');
      return;
    }

    addLicense({
      employeeId,
      ...formData,
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  const licenseDescription = licensesTypes?.data
    ? licensesTypes.data?.find((t) => t.id === selectedLicenseType?.id)
        ?.description
    : '';

  return (
    <form onSubmit={onSubmitMiddleware(handleSubmit)}>
      <Modal
        submitButton
        className="overflow-x-hidden p-1 pt-0"
        id="addNewLicense"
        loading={isLoading}
        title="Nueva Licencia"
      >
        <Alert className="mb-3">
          ¿No encuentra el tipo de licencia que busca? Deberá agregarla desde
          Tipos de listado &gt; Tipos de licencias
          <div className="flex">
            <Link className="btn mt-2" to={paths.TYPES_LIST.LICENSES}>
              <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
              IR A LA PÁGINA
            </Link>
          </div>
        </Alert>
        <ComboBoxInput
          className="mb-2 w-full"
          control={control}
          disabled={isLoading}
          label="Tipo de licencia *"
          name="type"
          options={
            licensesTypes?.data?.map((type) => ({
              id: type.id,
              description: type.title,
            })) || []
          }
          placeholder="Elija un tipo de licencia de la lista"
        />
        {!!licenseDescription && (
          <Alert className="my-2">{licenseDescription}</Alert>
        )}
        <DateInput
          className="mb-2 w-full"
          control={control}
          disabled={isLoading}
          label="Inicio de licencia *"
          name="fromDate"
          placeholder="Seleccione fecha de inicio"
        />
        <DateInput
          className="mb-2 w-full"
          control={control}
          disabled={isLoading}
          label="Fin de licencia *"
          name="toDate"
          placeholder="Seleccione fecha de fin"
        />
        <TextAreaInput
          className="w-full"
          control={control}
          disabled={isLoading}
          label="Observaciones"
          name="observations"
          placeholder="Esta licencia se pidio porque..."
        />
      </Modal>
    </form>
  );
};
export default AddNewLicenseModal;
