import { useState } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getEmployeeTrainingsTypesFn,
  postEmployeeTrainingFn,
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
  TextInput,
} from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import {
  AddNewTrainingSchema,
  addNewTrainingSchema,
} from '@/form-schemas/schemas/employees/addNewTrainingSchema';

const AddNewTrainingModal = () => {
  // -------------------------------------------------
  // STATE & FORM
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  const { closeModal } = useModal();
  const { control, onSubmitMiddleware, reset, watch } =
    useZodForm(addNewTrainingSchema);

  const [isLoading, setIsLoading] = useState(false);

  const selectedTrainingType = watch('type');

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const {
    data: trainingsTypes,
    isLoading: isLoadingTrainingsTypes,
    isError: isErrorTrainingsTypes,
    status: statusTrainingsTypes,
  } = useQuery({
    queryKey: ['employeeTrainingsTypes'],
    queryFn: getEmployeeTrainingsTypesFn,
  });

  const { mutate: addTraining } = useMutation({
    mutationFn: postEmployeeTrainingFn,
    onError: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.error(
        'Ocurrió un error guardando la capacitación. Intente nuevamente más tarde'
      );
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.success(`La capacitación fue registrada correctamente`);
      queryClient.invalidateQueries({
        queryKey: ['employeeTrainings', employeeId],
      });
    },
  });

  useLoading(isLoadingTrainingsTypes, statusTrainingsTypes);

  if (isErrorTrainingsTypes) {
    toast.error(
      'Ocurrió un error al obtener los tipos de capacitaciones. Intente nuevamente más tarde'
    );
    reset();
    closeModal();
  }

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (formData: AddNewTrainingSchema) => {
    setIsLoading(true);

    if (!employeeId) {
      toast.error('No se pudo obtener el id del empleado');
      return;
    }

    addTraining({
      employeeId,
      ...formData,
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  const trainingDescription = trainingsTypes?.data
    ? trainingsTypes.data?.find((t) => t.id === selectedTrainingType?.id)
        ?.description
    : '';

  return (
    <form onSubmit={onSubmitMiddleware(handleSubmit)}>
      <Modal
        submitButton
        className="overflow-x-hidden p-1 pt-0"
        id="addNewTraining"
        loading={isLoading}
        title="Nueva Capacitación"
      >
        <Alert className="mb-3">
          ¿No encuentra el tipo de capacitación que busca? Deberá agregarla
          desde Tipos de listado &gt; Tipos de capacitaciones
          <div className="flex">
            <Link className="btn mt-2" to={paths.TYPES_LIST.TRAININGS}>
              <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
              IR A LA PÁGINA
            </Link>
          </div>
        </Alert>
        <DateInput
          className="mb-2"
          control={control}
          disabled={isLoading}
          label="Fecha de capacitación *"
          name="date"
        />
        <ComboBoxInput
          className="mb-2 w-full"
          control={control}
          disabled={isLoading}
          label="Tipo de capacitación *"
          name="type"
          options={
            trainingsTypes?.data?.map((type) => ({
              id: type.id,
              description: type.title,
            })) || []
          }
          placeholder="Elija un tipo de capacitación de la lista"
        />
        {!!trainingDescription && (
          <Alert className="my-2">{trainingDescription}</Alert>
        )}
        <TextInput
          className="w-full"
          control={control}
          disabled={isLoading}
          label="Razón *"
          name="reason"
          placeholder="El empleado había recibido 3 llamados de atención..."
        />
        <TextAreaInput
          className="mt-2 w-full"
          control={control}
          disabled={isLoading}
          label="Observaciones"
          name="observations"
          placeholder="En la capacitación se mostró..."
        />
      </Modal>
    </form>
  );
};
export default AddNewTrainingModal;
