import { useState } from 'react';

import { cn, removeLineBreaks } from '@/utilities';

import type { TogglePropsType } from './Toggle.types';

/**
 * Switches toggle the state of a single setting on or off.
 * @param props - The component props.
 * @param checked - Default value.
 * @param className - Additional class names to apply to the Toggle component.
 * @param disabled - Default value.
 * @param dti - Data Test ID for testing purposes.
 * @param label - You can provide a label to the Toggle component.
 * @param size - Icon's size.
 * @returns JSX.Element The rendered Toggle component.
 *
 * ```
 * @example
 *
 * - Standalone usage:
 * <Toggle dti="example" label="Some Label"/>
 * ```
 */

const Toggle = (props: TogglePropsType): JSX.Element => {
  const {
    className = '',
    defaultChecked = false,
    disabled = false,
    label = '',
    size = 'medium',
  } = props;

  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div>
      <input
        checked={checked}
        className={cn(
          removeLineBreaks`          
            ${
              size === 'small'
                ? 'after:h-4 after:w-4 before:h-2.5 before:w-2.5 checked:after:h-4 checked:after:w-4 focus:after:h-4 focus:after:w-4 h-2.5 w-7'
                : 'after:h-5 after:w-5 before:h-3.5 before:w-3.5 checked:after:h-5 checked:after:w-5 focus:after:h-5 focus:after:w-5 h-3.5 w-8'
            }
            after:absolute 
            after:bg-neutral-100 
            after:border-none 
            after:content-[''] 
            after:rounded-full 
            after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] 
            after:transition-[background-color_0.2s,transform_0.2s]              
            after:z-[2] 
            after:-mt-[0.1875rem] 
            appearance-none 
            before:absolute 
            before:bg-transparent 
            before:content-['']              
            before:pointer-events-none
            before:rounded-full              
            bg-neutral-300 
            checked:after:absolute 
            checked:after:bg-primary 
            checked:after:border-none 
            checked:after:content-['']              
            checked:after:ml-[1.0625rem] 
            checked:after:rounded-full 
            checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)]
            checked:after:transition-[background-color_0.2s,transform_0.2s]            
            checked:after:z-[2] 
            checked:after:-mt-[3px] 
            checked:bg-primary 
            checked:focus:before:ml-[1.0625rem] 
            checked:focus:before:scale-100 
            checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] 
            checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
            checked:focus:bg-primary 
            checked:focus:border-primary 
            dark:after:bg-neutral-400 
            dark:bg-neutral-600 
            dark:checked:after:bg-primary 
            dark:checked:bg-primary 
            dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]
            dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] 
            focus:after:absolute 
            focus:after:block 
            focus:after:content-['']             
            focus:after:rounded-full             
            focus:after:z-[1] 
            focus:before:opacity-[0.12] 
            focus:before:scale-100 
            focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] 
            focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
            focus:outline-none 
            focus:ring-0 
            hover:cursor-pointer 
            mr-2 
            mt-[0.3rem] 
            rounded-[0.4375rem]`,
          className
        )}
        disabled={disabled}
        id={`${label.replaceAll(' ', '_')}-switch`}
        role="switch"
        type="checkbox"
        onClick={() => {
          setChecked(!checked);
        }}
      />
      <label
        className={cn(
          removeLineBreaks`
            ${size === 'large' ? 'text-xl' : ''}
            ${size === 'medium' ? 'text-base' : ''}
            ${size === 'small' ? 'text-xs' : ''}
            hover:cursor-pointer 
            inline-block 
            pl-[0.15rem]`
        )}
        htmlFor={`${label.replaceAll(' ', '_')}-switch`}
      >
        {label}
      </label>
    </div>
  );
};

export default Toggle;
