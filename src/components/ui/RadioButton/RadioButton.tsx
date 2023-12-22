import { useState } from 'react';

import { cn, removeLineBreaks } from '@/utilities';

import type { RadioButtonProps } from './RadioButton.types';

const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const {
    ariaLabel,
    className = '',
    colorDark = '',
    colorLight = '',
    defaultChecked = false,
    disabled = false,
    label = '',
    textColorDark = '',
    textColorLight = '',
  } = props;

  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="w-full flex gap-2">
      <input
        aria-label={ariaLabel}
        checked={checked}
        className={cn(
          removeLineBreaks`
          ${colorLight} 
          ${colorDark} 
          ${textColorLight} 
          ${textColorDark ? `dark:${textColorDark}` : ''}`,
          className
        )}
        disabled={disabled}
        id={`${label.replaceAll(' ', '_')}-switch`}
        onClick={() => {
          setChecked(!checked);
        }}
        type="radio"
      />

      <label
        className="inline-block pl-[0.15rem] hover:cursor-pointer"
        htmlFor="RadioButton"
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
