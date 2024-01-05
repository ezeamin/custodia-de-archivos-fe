import MultipleComboBox from '../MultipleComboBox/MultipleComboBox';

import InputController from '@/components/ui/InputController/InputController';

import { cn } from '@/utilities';

import type { FormSchemas } from '@/form-schemas';

import type { ComboBoxInputProps } from '@/components/ui/ComboBoxInput/ComboBoxInput.types';

const MultipleComboBoxInput = <T extends FormSchemas>(
  props: ComboBoxInputProps<T>
): JSX.Element => {
  const {
    className = '',
    control,
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
          <MultipleComboBox<T>
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
    </fieldset>
  );
};

export default MultipleComboBoxInput;
