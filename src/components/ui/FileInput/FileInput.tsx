import { useState } from 'react';
import { IoTrashBin } from 'react-icons/io5';

import { Button, Icon, InputController } from '@/components/ui';

import { cn } from '@/utilities';

import type { FormSchemas } from '@/form-schemas';

import { FileInputProps } from './FileInput.types';

const FileInput = <T extends FormSchemas>(
  props: FileInputProps<T>
): JSX.Element => {
  const {
    className = '',
    control,
    disabled = false,
    hideLabel = false,
    name,
    label,
    setValue,
    ...rest
  } = props;

  const [hasLoadedImage, setHasLoadedImage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      setHasLoadedImage(false);
    } else {
      setHasLoadedImage(true);
    }

    setValue(name as string, file);
  };

  const handleRemove = () => {
    setValue(name as string, null);
    setHasLoadedImage(false);
  };

  return (
    <fieldset className={cn('form-control w-full', className)}>
      {!hideLabel && (
        <label className="md:text-lg" htmlFor={name as string}>
          {label}
        </label>
      )}
      <div className="flex flex-col md:flex-row gap-2 mt-1">
        <InputController
          control={control}
          defaultValue={null}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <input
              className={`file-input file-input-sm md:file-input-md file-input-ghost focus:bg-gray-200 dark:focus:bg-gray-800 border border-gray-300 dark:border-gray-500 w-full max-w-xs ${
                error ? 'border-error' : ''
              }`}
              disabled={disabled}
              id={name as string}
              ref={field.ref}
              type="file"
              onBlur={field.onBlur}
              onChange={handleChange}
              {...rest}
            />
          )}
        />
        <Button
          className="border border-gray-300 md:tooltip md:tooltip-bottom btn-sm md:btn-md inline-block"
          data-tip="Borrar imagen"
          disabled={!hasLoadedImage}
          onClick={handleRemove}
        >
          <Icon
            className="hidden md:block"
            iconComponent={<IoTrashBin />}
            title="Borrar"
          />
          <p className="md:hidden">BORRAR IMAGEN</p>
        </Button>
      </div>
    </fieldset>
  );
};

export default FileInput;
