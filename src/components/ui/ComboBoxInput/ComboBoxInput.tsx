import ComboBox from '@/components/ui/ComboBox/ComboBox';
import InputController from '@/components/ui/InputController/InputController';

import { cn } from '@/utilities';

import type { FormSchemas } from '@/form-schemas';

import type { ComboBoxInputProps } from './ComboBoxInput.types';

const ComboBoxInput = <T extends FormSchemas>(
  props: ComboBoxInputProps<T>
): JSX.Element => {
  const {
    className = '',
    control,
    helperText = '',
    inputClassName = '',
    name,
    label,
    options = [],
    placeholder,
    ...rest
  } = props;

  return (
    <fieldset className={cn('form-control w-72', className)}>
      <label className="text-lg" htmlFor={name as string}>
        {label}
      </label>
      <InputController
        control={control}
        defaultValue=""
        name={name}
        render={({ field, fieldState: { error } }) => (
          <ComboBox<T>
            controller={field}
            disabled={rest.disabled}
            error={!!error}
            id={name as string}
            inputClassName={inputClassName}
            name={name.toString()}
            options={options}
            placeholder={placeholder ?? 'Ingrese un valor'}
            value={field.value as string}
            {...rest}
          />
        )}
      />
      {helperText && (
        <p className="text-sm text-gray-400 dark:text-gray-400 mt-1">
          {helperText}
        </p>
      )}
    </fieldset>
  );
};

export default ComboBoxInput;
