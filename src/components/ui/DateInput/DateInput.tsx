'use client';

import { useHydrate } from 'hooks';

import { cn } from 'utilities';

import DatePicker from '../DatePicker/DatePicker';
import InputController from '../InputController/InputController';
import type { FormSchemas } from 'form-schemas';

import type { InputProps } from './DateInput.types';

// TODO: Improve typing for this component!!

const DateInput = <T extends FormSchemas>(
  props: InputProps<T>
): JSX.Element => {
  const { control, name, label, className = '', dti, ...rest } = props;

  const hydrated = useHydrate();

  return (
    <fieldset className={cn('form-control ', className)}>
      <label className="text-lg" htmlFor={name as string}>
        {label}
      </label>
      <InputController
        control={control}
        defaultValue=""
        // ^ This doesn't work here because DateTimePicker works differently than other inputs
        name={name}
        render={({
          field: { onChange, name: inputName },
          fieldState: { error },
        }) => (
          <DatePicker
            disabled={!hydrated || rest.disabled}
            dti={dti}
            error={Boolean(error)}
            name={inputName}
            // TODO: Check this! Throws error when building project
            // @ts-expect-error - onChange takes the value in the DateTimePicker component, but not here. Works this way
            onChange={onChange}
            {...rest}
          />
        )}
      />
    </fieldset>
  );
};
export default DateInput;
