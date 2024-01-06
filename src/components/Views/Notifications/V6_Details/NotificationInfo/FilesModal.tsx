import FileItem from './FileItem';

import { useModal } from '@/stores/useModal';

import { NotificationInfoContentProps } from '@/components/interface/views';

const FilesModal = (props: NotificationInfoContentProps) => {
  const { data } = props;

  const { opened, closeModal } = useModal();

  const handleClose = () => {
    closeModal();
  };

  return (
    <dialog
      className={`modal modal-bottom md:modal-middle ${
        opened ? 'modal-open' : ''
      }`}
    >
      <div className="modal-box bg-white dark:bg-gray-800 lg:ml-[272px] border dark:border-gray-500">
        <h3 className="font-bold text-lg">Archivos adjuntos</h3>
        <section className="pt-5 flex flex-col gap-3">
          {data.files?.map((file) => <FileItem file={file} key={file.id} />)}
        </section>
        <div className="modal-action">
          <button className="btn" type="button" onClick={handleClose}>
            Cerrar
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default FilesModal;
