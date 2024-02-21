import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getEmployeeDocsFn, postFileFn } from '@/api/api-calls/employees';

import { useLoading, useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { ComboBoxInput, FileInput, Modal, TextInput } from '@/components/ui';

import {
  AddDocumentSchema,
  addDocumentSchema,
} from '@/form-schemas/schemas/employees/addDocumentSchema';

const AddNewDocumentModal = () => {
  // -------------------------------------------------
  // STATE & FORM
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  const { closeModal } = useModal();
  const { control, onSubmitMiddleware, setValue, reset } =
    useZodForm(addDocumentSchema);

  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const {
    data: foldersData,
    isLoading: isLoadingFolders,
    isError: isErrorFolders,
    status: statusFolders,
  } = useQuery({
    queryKey: ['employeeDocs', employeeId],
    queryFn: () => getEmployeeDocsFn(employeeId!),
  });

  const folders = useMemo(
    () =>
      foldersData?.data
        ?.map((folder) => ({
          id: folder.id,
          description: folder.name,
        }))
        .filter((folder) => folder.description !== 'Notificaciones'),
    [foldersData]
  );

  const { mutate: addFile } = useMutation({
    mutationFn: postFileFn,
    onError: () => {
      setIsLoading(false);
      closeModal();
      reset();
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.success(`El documento fue agregado correctamente`);
      queryClient.invalidateQueries({
        queryKey: ['employeeDocs', employeeId],
      });
    },
  });

  useLoading(isLoadingFolders, statusFolders);

  if (isErrorFolders) {
    toast.error(
      'Ocurrió un error cargando las carpetas. Reintente nuevamente más tarde.'
    );
    reset();
    closeModal();
  }

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (formData: AddDocumentSchema) => {
    setIsLoading(true);

    const fd = new FormData();
    fd.append('file', formData.file);
    fd.append('folderId', formData.folder.id);
    fd.append('name', formData.name);

    if (!employeeId) {
      toast.error('No se pudo obtener el id del empleado');
      return;
    }

    addFile({
      employeeId,
      body: fd,
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form onSubmit={onSubmitMiddleware(handleSubmit)}>
      <Modal
        submitButton
        className="overflow-x-hidden p-1"
        id="addNewDocument"
        loading={isLoading}
        title="Nuevo Documento"
      >
        <FileInput
          className="w-full"
          control={control}
          disabled={isLoading}
          inputClassName="max-w-none"
          label="Documento"
          name="file"
          setValue={setValue}
        />
        <ComboBoxInput
          className="mt-3 w-full"
          control={control}
          disabled={isLoading}
          helperText={
            folders?.length === 0
              ? 'No se pueden agregar documentos a la carpeta "Notificaciones". Cree una nueva desde el botón "NUEVA CARPETA" detrás de esta ventana.'
              : undefined
          }
          label="Carpeta"
          name="folder"
          options={folders || []}
        />
        <TextInput
          className="mt-3 w-full"
          control={control}
          disabled={isLoading}
          helperText={`No incluya la extensión del archivo, espacios ni caracteres
          especiales. Se aconseja utilizar "_" para separar cada palabra. No
          incluya caracteres especiales (ñ, @, tildes, etc.).`}
          label="Nombre"
          name="name"
        />
      </Modal>
    </form>
  );
};
export default AddNewDocumentModal;
