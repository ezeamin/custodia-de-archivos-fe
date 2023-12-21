'use client';

import { useHydrate } from 'hooks';

import { cn } from 'utilities';

import InputController from '../InputController/InputController';
import type { FormSchemas } from 'form-schemas';

import type { InputProps } from './TextInput.types';

const TextInput = <T extends FormSchemas>(
  props: InputProps<T>
): JSX.Element => {
  const {
    className = '',
    control,
    name,
    label,
    type = 'text',
    dti,
    ...rest
  } = props;

  const hydrated = useHydrate();

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
          <input
            className={`input input-bordered bg-gray-100 dark:bg-slate-700 w-full mt-1 ${
              error ? 'border-error' : ''
            }`}
            data-testid={dti}
            disabled={!hydrated || rest.disabled}
            id={name as string}
            onBlur={field.onBlur}
            onChange={field.onChange}
            placeholder={rest.placeholder ?? 'Ingrese un valor'}
            ref={field.ref}
            type={type}
            value={field.value as string}
            {...rest}
          />
        )}
      />
    </fieldset>
  );
};

export default TextInput;
