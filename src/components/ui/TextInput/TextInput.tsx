import type { FormSchemas } from '@/form-schemas';
import { cn } from '@/utilities';

import type { InputProps } from './TextInput.types';
import InputController from '@/components/ui/InputController/InputController';

const TextInput = <T extends FormSchemas>(
  props: InputProps<T>
): JSX.Element => {
  const {
    className = '',
    control,
    hideLabel = false,
    name,
    label,
    type = 'text',
    ...rest
  } = props;

  return (
    <fieldset className={cn('form-control w-72', className)}>
      {!hideLabel && (
        <label className="text-lg" htmlFor={name as string}>
          {label}
        </label>
      )}
      <InputController
        control={control}
        defaultValue=""
        name={name}
        render={({ field, fieldState: { error } }) => (
          <input
            className={`input input-bordered bg-gray-100 dark:bg-slate-700 w-full mt-1 ${
              error ? 'border-error' : ''
            }`}
            disabled={rest.disabled}
            id={name as string}
            placeholder={rest.placeholder ?? 'Ingrese un valor'}
            ref={field.ref}
            type={type}
            value={field.value as string}
            onBlur={field.onBlur}
            onChange={field.onChange}
            {...rest}
          />
        )}
      />
    </fieldset>
  );
};

export default TextInput;
