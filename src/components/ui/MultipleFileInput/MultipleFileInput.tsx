import { useEffect, useState } from 'react';

import MultipleFilePicker from '../MultipleFilePicker/MultipleFilePicker';

import { Alert, InputController } from '@/components/ui';

import { cn } from '@/utilities';

import type { FormSchemas } from '@/form-schemas';

import { MultipleFileInputProps } from './MultipleFileInput.types';

const MultipleFileInput = <T extends FormSchemas>(
  props: MultipleFileInputProps<T>
): JSX.Element => {
  const {
    className = '',
    control,
    disabled = false,
    name,
    setValue,
    maxFiles = Infinity,
    maxSize = Infinity, // in bytes
  } = props;

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setValue(name as string, files);
  }, [files, name, setValue]);

  return (
    <fieldset className={cn('form-control w-full', className)}>
      {!!(maxFiles !== Infinity && maxSize === Infinity) && (
        <Alert className="my-2">Puede subir hasta {maxFiles} archivos</Alert>
      )}
      {!!(maxSize !== Infinity && maxFiles === Infinity) && (
        <Alert className="my-2">
          El tamaño máximo de cada archivo es de {maxSize / 1000000} MB
        </Alert>
      )}
      {maxFiles !== Infinity && maxSize !== Infinity && (
        <Alert className="my-2">
          Puede subir hasta {maxFiles} archivos de {maxSize / 1000000} MB cada
          uno
        </Alert>
      )}
      <InputController
        control={control}
        defaultValue={null}
        name={name}
        render={() => (
          <MultipleFilePicker
            disabled={disabled}
            files={files}
            maxFiles={maxFiles}
            maxSize={maxSize}
            setFiles={setFiles}
          />
        )}
      />
    </fieldset>
  );
};

export default MultipleFileInput;
