import { useEffect, useMemo, useState } from 'react';

import { cn, removeLineBreaks } from '@/utilities';

import type { CheckboxProps } from './Checkbox.types';

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const {
    ariaLabel,
    className = '',
    colorDark = '',
    colorLight = '',
    disabled = false,
    label = '',
    textColorDark = '',
    textColorLight = '',
  } = props;

  const [disabledState, setDisabledState] = useState(disabled);
  const isChecked = useMemo(() => false, []);

  useEffect(() => {
    setDisabledState(disabled);
  }, [disabled]);

  return (
    <div className="flex w-full gap-2">
      <input
        aria-label={ariaLabel}
        checked={isChecked}
        className={cn(
          removeLineBreaks`
          ${colorLight} 
          ${colorDark} 
          ${textColorLight} 
          ${textColorDark ? `dark:${textColorDark}` : ''}`,
          className
        )}
        disabled={disabledState}
        type="checkbox"
      />

      <label
        className="inline-block pl-[0.15rem] hover:cursor-pointer"
        htmlFor="checkboxexample"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
