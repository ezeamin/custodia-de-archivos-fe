import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { receiverOptions, typeOptions } from './mocked';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getNotificationType,
  postNotification,
} from '@/api/api-calls/notifications';

import { useLoading, useZodForm } from '@/hooks';

import {
  Alert,
  Button,
  ComboBoxInput,
  Grid,
  MultipleComboBoxInput,
  TextAreaInput,
} from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import {
  CreateSchema,
  createSchema,
} from '@/form-schemas/schemas/notifications/createSchema';

const CreateNotificationForm = () => {
  // -------------------------------------------------
  // STATES & FORM
  // -------------------------------------------------

  const { control, onSubmitMiddleware, areAllFieldsFilled, watch, reset } =
    useZodForm(createSchema);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { mutate: createNotification } = useMutation({
    mutationFn: postNotification,
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

  const {
    data: notificationType,
    mutate: getNotificationTypeFn,
    reset: resetNotificationTypeMutation,
  } = useMutation({
    mutationFn: getNotificationType,
    onError: () => {
      setIsLoading(false);
      toast.error(
        'Ocurrió un error trayendo la descripción del tipo de notificación'
      );
    },
    onSuccess: () => {
      setIsLoading(false);
    },
  });

  useLoading(isLoading);

  const selectedNotificationType = watch('type');
  // const uploadedFiles = watch('files');

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: CreateSchema) => {
    setIsLoading(true);

    const fd = new FormData();

    fd.append('typeId', data.type.id);
    fd.append('receiverId', JSON.stringify(data.receiver.map((r) => r.id)));
    fd.append('message', data.message);
    // fd.append('files', data.files);

    createNotification(fd);
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  useEffect(() => {
    if (selectedNotificationType) {
      setIsLoading(true);
      getNotificationTypeFn(selectedNotificationType.id);
    } else {
      setIsLoading(false);
      resetNotificationTypeMutation();
    }
  }, [
    selectedNotificationType,
    getNotificationTypeFn,
    resetNotificationTypeMutation,
  ]);

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

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
            options={typeOptions.data}
            placeholder="Seleccione un tipo"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <MultipleComboBoxInput<CreateSchema>
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Receptor(es)"
            name="receiver"
            options={receiverOptions.data}
            placeholder="Seleccione al menos 1 receptor"
          />
        </Grid>
        {!!(notificationType && notificationType.data) && (
          <Grid item xs={12}>
            <Alert className="mt-2">{notificationType.data.description}</Alert>
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
      {/* <div className="flex gap-3 mb-3 items-end">
        <div className="w-32 h-32 rounded-md bg-gray-400 overflow-hidden">
          {uploadedFiles.map((file: File) => (
            // create badges with the file names and a delete option
            <div className="flex items-center gap-2 p-2" key={file.name}>
              <span className="text-sm">{file.name}</span>
              <button
                className="btn btn-error"
                type="button"
                onClick={() => {
                  setValue(
                    'files',
                    uploadedFiles.filter((f: File) => f.name !== file.name)
                  );
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
        <div>
          <FileInput<CreateSchema>
            control={control}
            disabled={isLoading}
            label="Seleccione una imagen"
            name="imgFile"
            setValue={setValue}
          />
        </div>
      </div> */}
      <Button
        className="mt-4"
        colorLight="btn-primary"
        disabled={!areAllFieldsFilled}
        loading={isLoading}
        type="submit"
      >
        Guardar y enviar
      </Button>
    </form>
  );
};

export default CreateNotificationForm;
