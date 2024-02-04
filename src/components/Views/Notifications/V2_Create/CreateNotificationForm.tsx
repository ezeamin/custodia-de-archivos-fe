import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import {
  getNotificationReceiversFn,
  getNotificationTypesFn,
  postNotificationFn,
} from '@/api/api-calls/notifications';

import { useLoading, useZodForm } from '@/hooks';
import { useSession } from '@/stores/useSession';

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
import { userRoles } from '@/constants/userRoles/userRoles';

import {
  CreateSchema,
  createSchema,
} from '@/form-schemas/schemas/notifications/createSchema';

import { BasicList } from '@/interface';

const CreateNotificationForm = () => {
  const { user } = useSession();
  // -------------------------------------------------
  // FORM
  // -------------------------------------------------

  const { control, onSubmitMiddleware, watch, reset, setValue } =
    useZodForm(createSchema);

  const selectedNotificationType = watch('type');
  const selectedReceivers = watch('receivers');
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

  const isResponse = useMemo(
    () =>
      search.includes('type=response') &&
      search.includes('receiverId=') &&
      search.includes('message='),
    [search]
  );
  const searchParams = new URLSearchParams(search);
  const receiverId = searchParams.get('receiverId');
  const prevMessage = searchParams.get('message');

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const {
    data: notificationTypes,
    isLoading: isLoadingTypes,
    isError: isErrorTypes,
    status: statusTypes,
  } = useQuery({
    queryKey: ['notificationTypes', false],
    queryFn: () => getNotificationTypesFn({ all: false }),
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

  // Remove "Respuesta" from types if it is not a response
  const formattedTypes = useMemo(
    () =>
      (notificationTypes?.data
        ?.map((type) => {
          if (!isResponse && type.title.toLowerCase() === 'respuesta')
            return null;

          return {
            id: type.id,
            description: type.title,
          };
        })
        .filter(Boolean) as BasicList[]) || [],
    [notificationTypes?.data, isResponse]
  );

  const formattedReceivers = useMemo(
    () =>
      notificationReceivers?.data?.map((receiver) => ({
        id: receiver.id,
        description: receiver.description,
      })) || [],
    [notificationReceivers?.data]
  );

  const { mutate: createNotification } = useMutation({
    mutationFn: postNotificationFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Notificación creada y enviada con éxito');
      navigate(paths.NOTIFICATIONS.MAIN);
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

    const fd = new FormData();

    const receivers = data.receivers.map((r) => {
      const type = notificationReceivers?.data?.find(
        (ro) => ro.id === r.id
      )?.type;

      return {
        id: r.id,
        type,
      };
    });

    fd.append('typeId', data.type.id);
    fd.append('receivers', JSON.stringify(receivers));
    fd.append('message', data.message);
    if (data.files) {
      data.files.forEach((file) => {
        fd.append('files', file);
      });
    }
    fd.append('isResponse', isResponse.toString());

    createNotification(fd);
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  // Avoid selecting "Respuesta" as notification type (only a safeguard, should not happen in the UI)
  useEffect(() => {
    if (
      selectedNotificationType &&
      selectedNotificationType.description.toLowerCase() === 'respuesta' &&
      !isResponse
    ) {
      toast.warning(
        `No se puede mandar una respuesta cuando no lo es. Para crear una respuesta, seleccione "RESPONDER" desde una notificación recibida`,
        { duration: 7000 }
      );
      reset({
        type: undefined,
      });
    }
  }, [selectedNotificationType, reset, isResponse]);

  // If "Todos los empleados" is selected, set value to that option and remove the other selected ones
  useEffect(() => {
    if (
      selectedReceivers &&
      selectedReceivers.length > 1 &&
      selectedReceivers.some((r) =>
        r.description.toLowerCase().includes('todos')
      )
    ) {
      setValue(
        'receivers',
        formattedReceivers.filter((r) =>
          r.description.toLowerCase().includes('todos')
        )
      );
    }
  }, [selectedReceivers, formattedReceivers, setValue]);

  // Check for current hour and if it is in the range of the selected notification type
  useEffect(() => {
    const type = notificationTypes?.data?.find(
      (t) => t.id === selectedNotificationType?.id
    );

    if (!type) return;

    const { startHour, endHour } = type;

    const currentHour = new Date().getHours();
    const currentMinutes = new Date().getMinutes();
    const currentTime = `${currentHour}:${currentMinutes}`;

    if (currentTime < startHour || currentTime > endHour) {
      Swal.fire({
        title: 'Atención',
        html: `No se puede enviar este tipo de notificación en este horario. Por favor, intente nuevamente en el rango de ${startHour} a ${endHour}`,
        icon: 'info',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: 'Entendido',
      });
      reset({
        type: undefined,
      });
    }
  }, [selectedNotificationType, notificationTypes?.data, reset]);

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
      prevMessage &&
      notificationTypes?.data &&
      notificationReceivers?.data
    ) {
      const receiver = notificationReceivers.data.find(
        (r) => r.id === receiverId
      );
      const type = notificationTypes.data.find((t) => t.title === 'Respuesta');

      if (!receiver || !type) {
        toast.error(
          'Ocurrió un error trayendo la información para la respuesta. Por favor, intente nuevamente luego o cargue manualmente los campos "Tipo" y "Receptor(es)"'
        );
        navigate(paths.NOTIFICATIONS.CREATE);
        return;
      }

      const formattedType = {
        id: type.id,
        description: type.title,
      };

      setValue('type', formattedType);
      setValue('receivers', [receiver]);
      setValue('message', prevMessage);
    }
  }, [
    receiverId,
    prevMessage,
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
    ? notificationTypes.data?.find((t) => t.id === selectedNotificationType?.id)
        ?.description
    : '';
  const notificationStartHour = notificationTypes?.data
    ? notificationTypes.data?.find((t) => t.id === selectedNotificationType?.id)
        ?.startHour
    : '';
  const notificationEndHour = notificationTypes?.data
    ? notificationTypes.data?.find((t) => t.id === selectedNotificationType?.id)
        ?.endHour
    : '';

  return (
    <form
      className="content-card animate-in-bottom a-delay-200 card"
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      {notificationTypes?.data &&
        formattedTypes.length === 0 &&
        user &&
        user.role === userRoles.ADMIN && (
          <Alert className="mb-3">
            <p>
              Parece que no hay Tipos de Notificaciones creadas, por lo que no
              podrá crear una notificación. Para crear un tipo, por favor
              dirijase al siguiente enlace
            </p>
            <Link className="btn mt-2" to={paths.TYPES_LIST.NOTIFICATIONS}>
              CREAR TIPO
            </Link>
          </Alert>
        )}
      {notificationTypes?.data &&
        formattedTypes.length === 0 &&
        user &&
        user.role !== userRoles.ADMIN && (
          <Alert className="mb-3">
            Parece que no hay Tipos de Notificaciones creadas, por lo que no
            podrá crear una notificación. Para solicitar la creación de un tipo,
            por favor contacte con un administrador.
          </Alert>
        )}
      {notificationReceivers?.data &&
        notificationReceivers.data.findIndex((r) => r.type === 'user') ===
          -1 && (
          <Alert className="mb-3">
            Si su notificación es para un empleado en particular, esto no podrá
            hacerlo hasta que ese empleado tenga un usuario en el Portal. Esto
            puede realizarlo desde el detalle del empleado, en el botón
            &quot;CREAR USUARIO&quot;.
          </Alert>
        )}
      <Grid container gap={2}>
        <Grid item sm={6} xs={12}>
          <ComboBoxInput<CreateSchema>
            className="w-full"
            control={control}
            disabled={isLoading || isResponse}
            helperText="Si no figura el tipo que necesita, debe solicitarle a un administrador que lo genere"
            label="Tipo de notificación"
            name="type"
            options={formattedTypes}
            placeholder="Seleccione un tipo"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <MultipleComboBoxInput<CreateSchema>
            className="w-full"
            control={control}
            disabled={isLoading || isResponse}
            helperText="Si algún empleado no figura, puede que no tenga usuario creado"
            label="Receptor(es)"
            name="receivers"
            options={formattedReceivers}
            placeholder="Seleccione al menos 1 receptor"
          />
        </Grid>
        {!!notificationDescription && (
          <Grid item xs={12}>
            <Alert className="mt-2">
              <p>{notificationDescription}.</p>
              <p className="mt-1">
                Se puede enviar desde las {notificationStartHour} hasta las{' '}
                {notificationEndHour}.
              </p>
            </Alert>
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
            className="toggle border-gray-400 [--tglbg:white] checked:toggle-primary dark:[--tglbg:#2d3740] dark:checked:!bg-white"
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
        textColorLight="text-white"
        type="submit"
      >
        Guardar y enviar
      </Button>
    </form>
  );
};

export default CreateNotificationForm;
