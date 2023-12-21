'use client';

import { useHydrate } from 'hooks';

import { cn } from 'utilities';

import ComboBox from '../ComboBox/ComboBox';
import InputController from '../InputController/InputController';
import type { FormSchemas } from 'form-schemas';

import type { ComboBoxInputProps } from './ComboBoxInput.types';

const ComboBoxInput = <T extends FormSchemas>(
  props: ComboBoxInputProps<T>
): JSX.Element => {
  const {
    className = '',
    control,
    dti,
    inputClassName = '',
    name,
    label,
    options = [],
    placeholder,
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
          <ComboBox<T>
            controller={field}
            disabled={!hydrated || rest.disabled}
            dti={dti}
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
    </fieldset>
  );
};

export default ComboBoxInput;
