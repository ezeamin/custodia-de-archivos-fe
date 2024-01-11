import { useModal } from '@/stores/useModal';

import { Button } from '@/components/ui/';

import { cn } from '@/utilities';

import { ModalProps } from './Modal.types';

const Modal = (props: ModalProps) => {
  const {
    id,
    title,
    children,
    className,
    submitButton = false,
    submitButtonText = 'Guardar',
    loading = false,
    footerChildren,
  } = props;

  const { opened, closeModal, modalId } = useModal();

  const handleClose = () => {
    closeModal();
  };

  if (modalId !== id) return null;

  return (
    <dialog
      className={`modal modal-bottom md:modal-middle ${
        opened ? 'modal-open' : ''
      }`}
    >
      <div className="overflow-y-hidden modal-box bg-white dark:bg-gray-800 lg:ml-[272px] border border-t border-b-0 border-l-0 border-r-0 md:border-l-[1px] md:border-b-[1px] md:border-r-[1px] dark:border-gray-500 md:max-w-[48rem]">
        <h3 className="font-bold text-lg pb-3">{title}</h3>
        <section
          className={cn('pt-4 max-h-[400px] overflow-y-auto', className)}
        >
          {children}
        </section>
        <div className="modal-action">
          {footerChildren}
          <button className="btn" type="button" onClick={handleClose}>
            Cerrar
          </button>
          {submitButton && (
            <Button
              lowerCase
              colorLight="btn-primary"
              loading={loading}
              textColorLight="text-white"
              type="submit"
            >
              {submitButtonText}
            </Button>
          )}
        </div>
      </div>
    </dialog>
  );
};
export default Modal;
