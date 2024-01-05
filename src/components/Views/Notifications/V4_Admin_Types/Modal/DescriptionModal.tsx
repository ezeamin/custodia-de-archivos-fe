import { useModal } from '@/stores/useModal';

const DescriptionModal = () => {
  const { opened, closeModal, data } = useModal();

  const handleClose = () => {
    closeModal();
  };

  // I love TS!
  if (
    data &&
    typeof data === 'object' &&
    'title' in data &&
    'description' in data &&
    typeof data.title === 'string' &&
    typeof data.description === 'string'
  ) {
    return (
      <dialog
        className={`modal modal-bottom md:modal-middle ${
          opened ? 'modal-open' : ''
        }`}
      >
        <div className="modal-box bg-white dark:bg-gray-800">
          <h3 className="font-bold text-lg">{data.title}</h3>
          <section className="pt-5">{data.description}</section>
          <div className="modal-action">
            <button className="btn" type="button" onClick={handleClose}>
              Cerrar
            </button>
          </div>
        </div>
      </dialog>
    );
  }

  return null;
};
export default DescriptionModal;
