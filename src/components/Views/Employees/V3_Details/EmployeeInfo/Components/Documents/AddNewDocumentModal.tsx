import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postFileFn } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { FileInput, Modal, TextInput } from '@/components/ui';

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

  const { mutate: addFile } = useMutation({
    mutationFn: postFileFn,
    onError: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.error(
        'Ocurrió un error guardando el documento. Intente nuevamente más tarde'
      );
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.success(`El documento fue agregado correctamente`);
      queryClient.invalidateQueries({
        queryKey: [`employeeDocs_${employeeId}`],
      });
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (formData: AddDocumentSchema) => {
    setIsLoading(true);

    const fd = new FormData();
    fd.append('file', formData.file);
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
        className="overflow-x-hidden"
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
        <TextInput
          className="w-full mt-3"
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
