import { useState } from 'react';
import { IoDocumentAttach } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteFileFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Button, Icon } from '@/components/ui';

import { openFile } from '@/utilities/utils';

import { DocumentItemProps } from '@/components/interface/views';

const DocumentItem = (props: DocumentItemProps) => {
  const { doc } = props;

  const { id: employeeId } = useParams();
  const { openModal, setModalData } = useModal();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: deleteFile, status: deleteStatus } = useMutation({
    mutationFn: deleteFileFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success(`El archivo ${doc?.name} fue eliminado correctamente`);
      queryClient.invalidateQueries({
        queryKey: ['employeeDocs', employeeId],
      });
    },
  });

  useLoading(isLoading, deleteStatus);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleOpen = () => {
    if (doc) openFile(doc.url, doc.name);
  };

  const handleRename = () => {
    setModalData({
      employeeId: employeeId!,
      doc: {
        id: doc?.id,
        name: doc?.name,
      },
    });
    openModal('changeDocument');
  };

  const handleDelete = () => {
    Swal.fire({
      title: '¿Está seguro?',
      html: `¿Está seguro que desea eliminar el documento <b>"${doc?.name}"</b>? Esta acción no podrá deshacerse.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        if (doc && employeeId) deleteFile({ employeeId, fileId: doc.id });
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  // Loading
  if (!doc) {
    return (
      <article className="mb-2 flex items-center justify-between gap-2 rounded-md border border-gray-400 p-3 lg:items-start lg:justify-normal lg:border-none lg:p-0">
        <div className="custom-skeleton h-20 w-20 rounded-md pl-3 lg:pl-0" />
        <div className="flex w-1/2 flex-col justify-between gap-3">
          <span className="custom-skeleton hidden h-[20px] w-1/2 rounded-md text-sm lg:block" />
          <div className="flex w-full flex-col gap-2 lg:flex-row">
            <span className="custom-skeleton h-[48px] w-full rounded-md lg:w-[61px]" />
            <span className="custom-skeleton h-[48px] w-full rounded-md lg:w-[122px]" />
            <span className="custom-skeleton h-[48px] w-full rounded-md lg:w-[100px]" />
          </div>
        </div>
      </article>
    );
  }

  const extension = doc.name.split('.').pop()?.toUpperCase();
  const shortenedName =
    doc.name.length > 20
      ? `${doc.name.slice(0, 20)}... .${extension?.toLowerCase()}`
      : doc.name;

  return (
    <article className="mb-2 flex flex-col items-center gap-2 rounded-md border border-gray-400 p-3 sm:flex-row lg:items-start lg:justify-normal lg:border-none lg:p-0">
      <div className="hidden h-20 w-20 min-w-20 flex-col items-center justify-center gap-2 rounded-md p-3 sm:flex lg:border lg:border-gray-400">
        <Icon
          className="h-8 w-8"
          iconComponent={<IoDocumentAttach />}
          title="documento"
        />
        <span className="text-sm font-bold">{extension}</span>
      </div>
      <span className="lg:hidden">{shortenedName}</span>
      <div className="flex w-full items-center justify-between gap-2 sm:justify-end lg:justify-between">
        <div className="flex h-20 w-20 min-w-20 flex-col items-center justify-center gap-2 rounded-md p-3 sm:hidden md:hidden lg:border lg:border-gray-400 lg:pl-0">
          <Icon
            className="h-8 w-8"
            iconComponent={<IoDocumentAttach />}
            title="documento"
          />
          <span className="text-sm font-bold">{extension}</span>
        </div>
        <div className="flex flex-col justify-between gap-3 sm:justify-end">
          <span className="hidden text-sm lg:block">{shortenedName}</span>
          <div className="flex flex-col justify-end gap-2 sm:flex-row">
            <Button
              className="border border-gray-400 hover:border-gray-500 dark:hover:border-gray-300"
              onClick={handleOpen}
            >
              Ver
            </Button>
            <Button
              className="border border-gray-400 hover:border-gray-500 dark:hover:border-gray-300"
              onClick={handleRename}
            >
              Renombrar
            </Button>
            <Button
              className="btn-outline hover:animate-pulse"
              colorLight="btn-error"
              textColorLight="text-white"
              onClick={handleDelete}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};
export default DocumentItem;
