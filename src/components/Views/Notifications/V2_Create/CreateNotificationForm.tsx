import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  receiverOptions as mockedReceiverOptions,
  typeOptions as mockedTypeOptions,
} from './mocked';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getNotificationReceiversFn,
  getNotificationTypesFn,
  postNotificationFn,
} from '@/api/api-calls/notifications';

import { useLoading, useZodForm } from '@/hooks';

import {
  Alert,
  Button,
  ComboBoxInput,
  Grid,
  MultipleComboBoxInput,
  MultipleFileInput,
  TextAreaInput,
} from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import {
  CreateSchema,
  createSchema,
} from '@/form-schemas/schemas/notifications/createSchema';

const CreateNotificationForm = () => {
  // -------------------------------------------------
  // FORM
  // -------------------------------------------------

  const { control, onSubmitMiddleware, watch, reset, setValue } =
    useZodForm(createSchema);

  const selectedNotificationType = watch('type');
  const selectedReceivers = watch('receiver');
  const message = watch('message');
  const uploadedFiles = watch('files');

  // -------------------------------------------------
  // STATES
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);
  const [showFileSection, setShowFileSection] = useState(false);
  const [canSendForm, setCanSendForm] = useState(false);

  const navigate = useNavigate();
  const { search } = useLocation();

  const isResponse =
    search.includes('type=response') && search.includes('receiverId=');
  const receiverId = search.split('receiverId=')[1];

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const {
    data: notificationTypes,
    isLoading: isLoadingTypes,
    isError: isErrorTypes,
    status: statusTypes,
  } = useQuery({
    queryKey: ['notificationTypes'],
    queryFn: getNotificationTypesFn,
  });

  const {
    data: notificationReceivers,
    isLoading: isLoadingReceivers,
    isError: isErrorReceivers,
    status: statusReceivers,
  } = useQuery({
    queryKey: ['receiverOptions'],
    queryFn: getNotificationReceiversFn,
  });

  const { mutate: createNotification } = useMutation({
    mutationFn: postNotificationFn,
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Notificación creada y enviada con éxito');
      window.setTimeout(() => {
        navigate(paths.NOTIFICATIONS.MAIN);
      }, 1000);
    },
  });

  if (isErrorTypes || isErrorReceivers) {
    toast.error(
      'Ocurrió un error trayendo la información para tipo y/o receptores. Por favor, intente nuevamente luego'
    );
  }

  useLoading(isLoadingTypes, statusTypes);
  useLoading(isLoadingReceivers, statusReceivers);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleShowFileSection = () => {
    setShowFileSection((prev) => !prev);
  };

  const handleSubmit = (data: CreateSchema) => {
    setIsLoading(true);

    console.log(data);

    const fd = new FormData();

    fd.append('typeId', data.type.id);
    fd.append('receiverId', JSON.stringify(data.receiver.map((r) => r.id)));
    fd.append('message', data.message);
    if (data.files) {
      data.files.forEach((file) => {
        fd.append('files', file);
      });
    }

    createNotification(fd);
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  // Enable submit button
  useEffect(() => {
    if (showFileSection) {
      setCanSendForm(
        !!(
          selectedNotificationType &&
          selectedReceivers &&
          message &&
          uploadedFiles &&
          uploadedFiles.length > 0
        )
      );
    } else {
      setCanSendForm(
        !!(selectedNotificationType && selectedReceivers && message)
      );
    }
  }, [
    selectedNotificationType,
    selectedReceivers,
    message,
    uploadedFiles,
    showFileSection,
  ]);

  // If it is a response, set the type and receiver as default values
  useEffect(() => {
    if (
      isResponse &&
      receiverId &&
      notificationTypes?.data &&
      notificationReceivers?.data
    ) {
      const receiver = notificationReceivers.data.find(
        (r) => r.id === receiverId
      );
      const type = notificationTypes.data.find(
        (t) => t.description === 'Respuesta'
      );

      if (!receiver || !type) {
        toast.error(
          'Ocurrió un error trayendo la información para la respuesta. Por favor, intente nuevamente luego o cargue manualmente los campos "Tipo" y "Receptor(es)"'
        );
        navigate(paths.NOTIFICATIONS.CREATE);
        return;
      }

      setValue('type', type);
      setValue('receiver', [receiver]);
    }
  }, [
    receiverId,
    isResponse,
    notificationTypes?.data,
    setValue,
    notificationReceivers?.data,
    navigate,
  ]);

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  const notificationDescription = notificationTypes?.data
    ? notificationTypes.data?.find((t) => t.id === selectedNotificationType.id)
        ?.description
    : '';

  return (
    <form
      className="card content-card animate-in-bottom a-delay-200"
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      <Grid container gap={2}>
        <Grid item sm={6} xs={12}>
          <ComboBoxInput<CreateSchema>
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Tipo de notificación"
            name="type"
            options={mockedTypeOptions.data}
            // options={notificationTypes.data}
            placeholder="Seleccione un tipo"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <MultipleComboBoxInput<CreateSchema>
            className="w-full"
            control={control}
            disabled={isLoading}
            helperText="Si algún empleado no figura, puede que no tenga usuario creado"
            label="Receptor(es)"
            name="receiver"
            options={mockedReceiverOptions.data}
            // options={notificationReceivers.data}
            placeholder="Seleccione al menos 1 receptor"
          />
        </Grid>
        {!!notificationDescription && (
          <Grid item xs={12}>
            <Alert className="mt-2">{notificationDescription}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextAreaInput<CreateSchema>
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Mensaje"
            name="message"
            placeholder="Envío este mensaje para..."
          />
        </Grid>
      </Grid>
      <fieldset className="form-control mt-3">
        <label className="label cursor-pointer" htmlFor="toggle">
          <span className="">Enviar documentos</span>
          <input
            checked={showFileSection}
            className="toggle [--tglbg:white] dark:[--tglbg:#2d3740] border-gray-400 checked:toggle-primary dark:checked:!bg-white"
            id="toggle"
            type="checkbox"
            onChange={handleShowFileSection}
          />
        </label>
      </fieldset>
      {showFileSection && (
        <MultipleFileInput<CreateSchema>
          control={control}
          maxFiles={5}
          maxSize={10000000} // 10MB
          name="files"
          setValue={setValue}
        />
      )}
      <Button
        className="mt-4"
        colorLight="btn-primary"
        disabled={!canSendForm}
        loading={isLoading && canSendForm}
        type="submit"
      >
        Guardar y enviar
      </Button>
    </form>
  );
};

export default CreateNotificationForm;
