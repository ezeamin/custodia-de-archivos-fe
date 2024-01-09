export type ModalProps = {
  title: string;
  children: React.ReactNode;
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
