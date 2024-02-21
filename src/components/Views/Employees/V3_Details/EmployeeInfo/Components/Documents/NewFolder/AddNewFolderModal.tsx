import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postFolderFn, putFolderFn } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Grid, Modal, TextInput } from '@/components/ui';

import {
  AddFolderSchema,
  addFolderSchema,
} from '@/form-schemas/schemas/employees/addFolderSchema';

import { NewFolderModalData } from '@/components/interface/views';

const AddNewFolderModal = () => {
  // -------------------------------------------------
  // STATE & FORM
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  const { closeModal, data: modalData } = useModal() as NewFolderModalData;
  const { control, onSubmitMiddleware, reset, setValue } =
    useZodForm(addFolderSchema);

  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!modalData;

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const { mutate: addFolder } = useMutation({
    mutationFn: postFolderFn,
    onError: () => {
      setIsLoading(false);
      closeModal();
      reset();
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.success(`La carpeta fue agregada correctamente`);
      queryClient.invalidateQueries({
        queryKey: ['employeeDocs', employeeId],
      });
    },
  });

  const { mutate: editFolder } = useMutation({
    mutationFn: putFolderFn,
    onError: () => {
      setIsLoading(false);
      closeModal();
      reset();
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.success(`La carpeta fue editada correctamente`);
      queryClient.invalidateQueries({
        queryKey: ['employeeDocs', employeeId],
      });
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (formData: AddFolderSchema) => {
    setIsLoading(true);

    if (!employeeId) {
      toast.error('No se pudo obtener el id del empleado');
      return;
    }

    if (isEditing) {
      editFolder({
        employeeId,
        folderId: modalData.folder.id,
        body: formData,
      });
    } else {
      addFolder({
        employeeId,
        body: formData,
      });
    }
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  useEffect(() => {
    if (modalData && modalData.folder) {
      setValue('name', modalData.folder.name);
      setValue('color', modalData.folder.color);
    }
  }, [modalData, setValue]);

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form onSubmit={onSubmitMiddleware(handleSubmit)}>
      <Modal
        submitButton
        className="overflow-x-hidden p-1"
        id="addNewFolder"
        loading={isLoading}
        title="Nueva Carpeta"
        onClose={reset}
      >
        <Grid container gap={2}>
          <Grid item md={6} xs={12}>
            <TextInput
              className="mt-3 w-full"
              control={control}
              disabled={isLoading}
              label="Nombre"
              name="name"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextInput
              className="mt-3 w-full"
              control={control}
              defaultValue="#ffffff"
              disabled={isLoading}
              label="Color"
              name="color"
              type="color"
            />
          </Grid>
        </Grid>
      </Modal>
    </form>
  );
};
export default AddNewFolderModal;
