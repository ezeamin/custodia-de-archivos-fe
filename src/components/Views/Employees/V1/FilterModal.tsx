import { useModal } from '@/stores/useModal';

import FilterModalForm from './FilterModalForm';

const FilterModal = () => {
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
      <div className="modal-box bg-white dark:bg-gray-800">
        <h3 className="font-bold text-lg">Roles</h3>
        <section className="pt-5">
          <FilterModalForm closeModal={closeModal} />
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
export default FilterModal;
