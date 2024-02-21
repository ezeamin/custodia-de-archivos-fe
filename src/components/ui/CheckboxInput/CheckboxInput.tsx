import InputController from '../InputController/InputController';

import { cn } from '@/utilities';

import { FormSchemas } from '@/form-schemas';

import { InputProps } from './CheckboxInput.types';

const CheckboxInput = <T extends FormSchemas>(
  props: InputProps<T>
): JSX.Element => {
  const {
    className = '',
    control,
    hideLabel = false,
    name,
    label,
    labelSide = 'left',
    defaultValue = '',
    ...rest
  } = props;

  return (
    <InputController
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field }) => (
        <div className="form-control">
          <label
            className="label cursor-pointer gap-2"
            htmlFor={name as string}
          >
            {!hideLabel && labelSide === 'left' && <span>{label}</span>}
            {/* @ts-expect-error -- checkboxes don't accept boolean values, but it works and I don't have much time */}
            <input
              {...field}
              checked={!!field.value}
              className={cn('checkbox', className)}
              id={name as string}
              type="checkbox"
              {...rest}
            />
            {!hideLabel && labelSide === 'right' && <span>{label}</span>}
          </label>
        </div>
      )}
    />
  );
};
export default CheckboxInput;
