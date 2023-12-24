import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import type { FormSchemas } from '@/form-schemas';
import { cn } from '@/utilities';

import Icon from '@/components/ui/Icon/Icon';
import InputController from '@/components/ui/InputController/InputController';
import type { InputProps } from '@/components/ui/TextInput/TextInput.types';

const PasswordInput = <T extends FormSchemas>(
  props: InputProps<T>
): JSX.Element => {
  const { className = '', control, name, label, ...rest } = props;

  const [displayPass, setDisplayPass] = useState(false);

  const handleChange = (): void => {
    setDisplayPass((prev) => !prev);
  };

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
          <div
            className={`relative input input-bordered overflow-hidden bg-gray-100 dark:bg-slate-700 mt-1 ${
              error ? 'border-error' : ''
            }`}
          >
            <input
              className="w-[90%] input border-0 px-0 h-full bg-gray-100 dark:bg-slate-700"
              disabled={rest.disabled}
              id={name as string}
              placeholder={rest.placeholder ?? 'Ingrese un valor'}
              ref={field.ref}
              type={displayPass ? 'text' : 'password'}
              value={field.value as string}
              onBlur={field.onBlur}
              onChange={field.onChange}
              {...rest}
            />
            <button
              className="absolute block z-50 h-full w-[40px] p-0 bottom-0 top-0 right-0 btn btn-ghost rounded-btn"
              disabled={rest.disabled}
              type="button"
              onClick={handleChange}
            >
              {displayPass ? (
                <Icon
                  className="flex w-full text-gray-600 dark:text-gray-400"
                  iconComponent={<IoMdEyeOff />}
                  title="Ocultar contraseña"
                />
              ) : (
                <Icon
                  className="flex w-full text-gray-600 dark:text-gray-400"
                  iconComponent={<IoMdEye />}
                  title="Mostrar contraseña"
                />
              )}
            </button>
          </div>
        )}
      />
    </fieldset>
  );
};

export default PasswordInput;
