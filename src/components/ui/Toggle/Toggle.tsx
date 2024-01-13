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
                ? 'h-2.5 w-7 before:h-2.5 before:w-2.5 after:h-4 after:w-4 checked:after:h-4 checked:after:w-4 focus:after:h-4 focus:after:w-4'
                : 'h-3.5 w-8 before:h-3.5 before:w-3.5 after:h-5 after:w-5 checked:after:h-5 checked:after:w-5 focus:after:h-5 focus:after:w-5'
            }
            mr-2 
            mt-[0.3rem] 
            appearance-none 
            rounded-[0.4375rem] 
            bg-neutral-300 
            before:pointer-events-none 
            before:absolute              
            before:rounded-full 
            before:bg-transparent 
            before:content-[''] 
            after:absolute 
            after:z-[2] 
            after:-mt-[0.1875rem]              
            after:rounded-full
            after:border-none              
            after:bg-neutral-100 
            after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] 
            after:transition-[background-color_0.2s,transform_0.2s] 
            after:content-[''] 
            checked:bg-primary              
            checked:after:absolute 
            checked:after:z-[2] 
            checked:after:-mt-[3px]
            checked:after:ml-[1.0625rem]            
            checked:after:rounded-full 
            checked:after:border-none 
            checked:after:bg-primary 
            checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] 
            checked:after:transition-[background-color_0.2s,transform_0.2s] 
            checked:after:content-[''] 
            hover:cursor-pointer 
            focus:outline-none 
            focus:ring-0 
            focus:before:scale-100 
            focus:before:opacity-[0.12] 
            focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] 
            focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
            focus:after:absolute
            focus:after:z-[1] 
            focus:after:block 
            focus:after:rounded-full 
            focus:after:content-['']             
            checked:focus:border-primary             
            checked:focus:bg-primary 
            checked:focus:before:ml-[1.0625rem] 
            checked:focus:before:scale-100 
            checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] 
            checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
            dark:bg-neutral-600 
            dark:after:bg-neutral-400 
            dark:checked:bg-primary 
            dark:checked:after:bg-primary 
            dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] 
            dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]`,
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
            inline-block 
            pl-[0.15rem] 
            hover:cursor-pointer`
        )}
        htmlFor={`${label.replaceAll(' ', '_')}-switch`}
      >
        {label}
      </label>
    </div>
  );
};

export default Toggle;
