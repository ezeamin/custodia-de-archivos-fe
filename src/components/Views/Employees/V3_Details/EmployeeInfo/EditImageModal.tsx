import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { putEmployeeImageFn } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { FileInput, Modal } from '@/components/ui';

import {
  EditImageSchema,
  editImageSchema,
} from '@/form-schemas/schemas/employees/editImageSchema';

const EditImageModal = () => {
  // -------------------------------------------------
  // FORM & STATES
  // -------------------------------------------------

  const { control, onSubmitMiddleware, setValue, reset, watch } =
    useZodForm(editImageSchema);

  const uploadedImage = watch('imgFile');

  const [isLoading, setIsLoading] = useState(false);

  const { closeModal } = useModal();

  const { id: employeeId } = useParams();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const { mutate: editImage } = useMutation({
    mutationFn: putEmployeeImageFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Imagen editada con éxito');
      queryClient.invalidateQueries({
        queryKey: [`employee_${employeeId}`],
      });
      closeModal();
    },
  });

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  const handleSubmit = (data: EditImageSchema) => {
    setIsLoading(true);

    const fd = new FormData();
    fd.append('id', employeeId as string);
    fd.append('imgFile', data.imgFile);

    editImage(fd);
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form onSubmit={onSubmitMiddleware(handleSubmit)}>
      <Modal
        submitButton
        className="overflow-y-hidden"
        id="editImage"
        loading={isLoading}
        title="Editar imagen"
      >
        <div className="mb-3 flex items-end gap-3">
          <div className="h-32 w-32 overflow-hidden rounded-md bg-gray-400">
            {uploadedImage && (
              <img
                alt="Uploaded"
                className="h-full w-full object-cover"
                height={128}
                src={URL.createObjectURL(uploadedImage)}
                width={128}
              />
            )}
          </div>
          <div>
            <FileInput
              control={control}
              disabled={isLoading}
              label="Seleccione una imagen"
              name="imgFile"
              setValue={setValue}
            />
          </div>
        </div>
      </Modal>
    </form>
  );
};
export default EditImageModal;
