export type ModalProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  footerChildren?: React.ReactNode;
  onClose?: () => void;
} & (
  | {
      submitButton: true;
      submitButtonText?: string;
      loading?: boolean;
      disabledSubmitButton?: boolean;
    }
  | {
      submitButton?: never;
      submitButtonText?: never;
      loading?: never;
      disabledSubmitButton?: never;
    }
);
