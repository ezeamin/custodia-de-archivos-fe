import HourPicker from '../HourPicker/HourPicker';

import InputController from '@/components/ui/InputController/InputController';

import { cn } from '@/utilities';

import type { FormSchemas } from '@/form-schemas';

import type { InputProps } from '@/components/ui/TextInput/TextInput.types';

const HourInput = <T extends FormSchemas>(
  props: InputProps<T>
): JSX.Element => {
  const { control, name, label, className = '', ...rest } = props;

  return (
    <fieldset className={cn('form-control ', className)}>
      <label className="text-lg" htmlFor={name as string}>
        {label}
      </label>
      <InputController
        control={control}
        defaultValue=""
        name={name}
        render={({
          field: { onChange, name: inputName },
          fieldState: { error },
        }) => (
          <HourPicker
            className="mt-1"
            disabled={rest.disabled}
            error={Boolean(error)}
            name={inputName}
            onChange={onChange}
            {...rest}
          />
        )}
      />
    </fieldset>
  );
};

export default HourInput;
