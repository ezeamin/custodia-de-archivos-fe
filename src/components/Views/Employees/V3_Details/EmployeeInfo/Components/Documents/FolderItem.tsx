import { useState } from 'react';
import { FaFolder } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteFolderFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Button, Icon } from '@/components/ui';

import { FolderItemProps } from '@/components/interface/views';

const FolderItem = (props: FolderItemProps) => {
  const { folder } = props;

  const { id: employeeId } = useParams();
  const { openModal, setModalData } = useModal();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: deleteFolder, status: deleteStatus } = useMutation({
    mutationFn: deleteFolderFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success(
        `La carpeta ${folder?.name} y todos sus archivos fueron eliminados correctamente`
      );
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
    if (folder) {
      setModalData({
        documents: folder.documents || [],
      });
      openModal('folderModal');
    }
  };

  const handleEdit = () => {
    setModalData({
      employeeId: employeeId!,
      folder: {
        id: folder?.id,
        name: folder?.name,
        color: folder?.color,
      },
    });
    openModal('addNewFolder');
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'ATENCION',
      html: `¿Está seguro que desea eliminar la carpeta <b>"${folder?.name}"</b>? Esta acción no podrá deshacerse y eliminará TODOS los documentos dentro de ella.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        if (folder && employeeId)
          deleteFolder({ employeeId, folderId: folder.id });
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  // Loading
  if (!folder) {
    return (
      <article className="flex items-center justify-between gap-2 rounded-md border border-gray-400 p-3 lg:items-start lg:justify-normal lg:border-none lg:p-0">
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

  return (
    <article className="flex flex-col justify-between gap-2 rounded-md border border-gray-400 p-3 lg:flex-row lg:items-center lg:justify-normal lg:border-none lg:p-0">
      <div className="flex items-center justify-start gap-2 rounded-md lg:h-20 lg:w-20 lg:justify-center lg:border lg:border-gray-400 lg:px-3">
        <Icon
          className="h-8 w-8"
          color={folder.color || '#cccccc'}
          iconComponent={<FaFolder />}
          title="documento"
        />
        <span className="font-bold lg:hidden">{folder.name}</span>
      </div>
      <div className="flex w-full flex-col justify-between gap-2">
        <p className="flex">
          <span className="text-md hidden font-bold lg:block">
            {folder.name}
          </span>
          <span className="hidden sm:inline md:hidden lg:block">
            &nbsp;{folder.documents.length > 0 && '-'}&nbsp;
          </span>
          <span>
            {folder.documents.length > 0 &&
              `${folder.documents.length} archivo(s)`}
          </span>
        </p>
        <div className="flex w-full flex-col gap-2 lg:flex-row">
          <Button
            className="w-full border border-gray-400 hover:border-gray-500 dark:hover:border-gray-300 lg:w-20"
            onClick={handleOpen}
          >
            Abrir
          </Button>
          {folder.name !== 'Notificaciones' && (
            <>
              <Button
                className="border border-gray-400 hover:border-gray-500 dark:hover:border-gray-300"
                onClick={handleEdit}
              >
                Editar
              </Button>
              <Button
                className="btn-outline hover:animate-pulse"
                colorLight="btn-error"
                textColorLight="text-white"
                onClick={handleDelete}
              >
                Eliminar
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};
export default FolderItem;
