export interface MultipleFilePickerProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  className?: string;
  disabled?: boolean;
  maxFiles: number;
  maxSize: number;
}
