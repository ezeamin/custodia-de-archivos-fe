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
      <div className="modal-box bg-white dark:bg-gray-800 md:ml-[272px]">
        <h3 className="font-bold text-lg">Archivos adjuntos</h3>
        <section className="pt-5">
          {/* <FilterModalForm closeModal={closeModal} /> */}
          {JSON.stringify(data.files, null, 2)}
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
