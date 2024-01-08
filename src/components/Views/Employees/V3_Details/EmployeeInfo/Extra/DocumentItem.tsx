import { useState } from 'react';
import { IoDocumentAttach } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteFileFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import { Button, Icon } from '@/components/ui';

import { openFile } from '@/utilities/utils';

import { DocumentItemProps } from '@/components/interface/views';

const DocumentItem = (props: DocumentItemProps) => {
  const { doc } = props;

  const { id: employeeId } = useParams();

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
        queryKey: [`employeeDocs_${employeeId}`],
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

  const handleRename = () => {};

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
      <article className="flex gap-2 items-center justify-between md:items-start md:justify-normal border border-gray-400 p-3 md:p-0 rounded-md md:border-none">
        <div className="w-20 h-20 pl-3 md:pl-0 rounded-md custom-skeleton" />
        <div className="flex flex-col justify-between gap-3 w-1/2">
          <span className="text-sm hidden md:block custom-skeleton h-[20px] rounded-md w-1/2" />
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <span className="custom-skeleton w-full md:w-[61px] h-[48px] rounded-md" />
            <span className="custom-skeleton w-full md:w-[122px] h-[48px] rounded-md" />
            <span className="custom-skeleton w-full md:w-[100px] h-[48px] rounded-md" />
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
    <article className="flex gap-2 items-center justify-between md:items-start md:justify-normal border border-gray-400 p-3 md:p-0 rounded-md md:border-none">
      <div className="w-20 h-20 pl-3 md:pl-0 rounded-md md:border md:border-gray-400 flex flex-col items-center justify-center gap-2">
        <Icon
          className="w-8 h-8"
          iconComponent={<IoDocumentAttach />}
          title="documento"
        />
        <span className="text-sm font-bold">{extension}</span>
        <span className="text-sm text-center md:hidden">{shortenedName}</span>
      </div>
      <div className="flex flex-col justify-between gap-3">
        <span className="text-sm hidden md:block">{shortenedName}</span>
        <div className="flex flex-col md:flex-row gap-2">
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
    </article>
  );
};
export default DocumentItem;
