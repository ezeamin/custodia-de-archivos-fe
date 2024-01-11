export type ModalProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  footerChildren?: React.ReactNode;
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
