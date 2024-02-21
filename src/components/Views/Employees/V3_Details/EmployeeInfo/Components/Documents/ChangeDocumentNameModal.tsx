import { useEffect, useMemo, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { putFileFn } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Alert, Modal, TextInput } from '@/components/ui';

import {
  ChangeDocNameSchema,
  changeDocNameSchema,
} from '@/form-schemas/schemas/employees/changeDocNameSchema';

import { ChangeDocModalData } from '@/components/interface/views';

const ChangeDocumentNameModal = () => {
  // -------------------------------------------------
  // STATE & FORM
  // -------------------------------------------------

  const { data, closeModal } = useModal() as ChangeDocModalData;
  const { control, onSubmitMiddleware, setValue } =
    useZodForm(changeDocNameSchema);

  const [isLoading, setIsLoading] = useState(false);

  const nameWithoutExt = useMemo(() => data?.doc?.name.split('.')[0], [data]);

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const { mutate: editFile } = useMutation({
    mutationFn: putFileFn,
    onError: () => {
      setIsLoading(false);
      closeModal();
      toast.error(
        'Ocurrió un error editando el archivo. Intente nuevamente más tarde'
      );
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      toast.success(`El archivo ${data.doc?.name} fue editado correctamente`);
      queryClient.invalidateQueries({
        queryKey: ['employeeDocs', data.employeeId],
      });
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (formData: ChangeDocNameSchema) => {
    if (formData.newName.trim() === nameWithoutExt) {
      toast.info('El nombre del archivo no ha cambiado');
      closeModal();
      return;
    }

    setIsLoading(true);
    editFile({
      employeeId: data?.employeeId,
      fileId: data?.doc?.id,
      body: {
        name: formData.newName.trim(),
      },
    });
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  useEffect(() => {
    if (nameWithoutExt) {
      setValue('newName', nameWithoutExt);
    }
  }, [setValue, nameWithoutExt]);

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form onSubmit={onSubmitMiddleware(handleSubmit)}>
      <Modal
        submitButton
        className="p-1"
        id="changeDocument"
        loading={isLoading}
        title="Cambiar nombre"
      >
        <Alert className="mb-3">
          <b>
            No incluya la extensión del archivo, espacios ni caracteres
            especiales.{' '}
          </b>
          Se aconseja utilizar &quot;_&quot; para separar cada palabra. No
          incluya caracteres especiales (ñ, @, tildes, etc.).
        </Alert>
        <TextInput
          className="w-full"
          control={control}
          disabled={isLoading}
          label="Nombre (sin extensión)"
          name="newName"
          placeholder="Nombre"
        />
      </Modal>
    </form>
  );
};
export default ChangeDocumentNameModal;
