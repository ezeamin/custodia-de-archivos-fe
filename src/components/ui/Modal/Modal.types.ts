export type ModalProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
} & (
  | {
      submitButton: true;
      submitButtonText?: string;
      loading?: boolean;
    }
  | {
      submitButton?: never;
      submitButtonText?: never;
      loading?: never;
    }
);
