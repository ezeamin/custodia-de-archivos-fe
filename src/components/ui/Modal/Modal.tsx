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
      <div className="modal-box overflow-y-hidden border border-b-0 border-l-0 border-r-0 border-t bg-white dark:border-gray-500 dark:bg-gray-800 md:max-w-[48rem] md:border-b-[1px] md:border-l-[1px] md:border-r-[1px] lg:ml-[272px]">
        <h3 className="pb-3 text-lg font-bold">{title}</h3>
        <section
          className={cn('max-h-[400px] overflow-y-auto pt-4', className)}
        >
          {children}
        </section>
        <div className="modal-action">
          {footerChildren}
          <button
            className="btn"
            disabled={loading}
            type="button"
            onClick={handleClose}
          >
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
