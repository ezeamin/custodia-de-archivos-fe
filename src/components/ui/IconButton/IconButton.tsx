'use client';

import { useEffect, useState } from 'react';

import { cn, removeLineBreaks } from 'utilities';

import './IconButton.styles.css';

import type { IconButtonPropsType } from './IconButton.types';

/**
 * IconButton component displays an SVG icon with customizable styling and accessibility attributes.
 * @param props - The component props.
 * @param className - Additional class names to apply to the icon container.
 * @param colorDark - The color of the button in dark mode. You can provide a DaisyUI color class to be applied in dark mode. Example: 'btn-info'.
 * @param colorLight - The color of the button in light mode. You can provide a DaisyUI color class to be applied in light mode. Example: 'btn-ghost'.
 * @param disabled - Specifies whether the button is disabled.
 * @param dti - Data Test ID for testing purposes.
 * @param iconComponent - The SVG icon component to render.
 * @param label - The title attribute for the icon (used for tooltip).
 * @param onClick - Event handler for the button's click event.
 * @returns JSX.Element The rendered Icon component.
 *
 * ```
 * @example
 *
 * - Standalone usage:
 * <IconButton iconComponent={<SomeIcon/>} />
 *
 * @example
 *
 * - Colored IconButton:
 * <IconButton className='hover:bg-slate-500' colorDark='dark:bg-slate-700' colorLight='bg-slate-600' iconComponent={<SomeIcon color="iconColor"/>} label="tooltip text" />
 *
 * @example
 *
 * - Tooltip IconButton:
 * <IconButton iconComponent={<SomeIcon/>} label="tooltip text" />
 * ```
 */

const IconButton = (props: IconButtonPropsType): JSX.Element => {
  const {
    className,
    colorDark = '',
    colorLight = '',
    disabled = false,
    dti,
    iconComponent: IconComponent,
    label = '',
    unbordered = false,
    onClick,
  } = props;

  const [disabledState, setDisabledState] = useState(true);

  useEffect(() => {
    setDisabledState(disabled);
  }, [disabled]);

  return (
    <button
      aria-label={label}
      className={cn(
        removeLineBreaks`
      ${disabled ? '' : colorLight} 
      ${disabled ? '' : colorDark}
      ${disabledState ? 'cursor-not-allowed' : 'cursor-pointer'}
      animated
      ${!unbordered ? 'bordered' : ''}
      p-2
      rounded-full
      tooltip`,
        className
      )}
      data-testid={dti}
      data-tip={label || null}
      disabled={disabledState}
      onClick={onClick}
      type="button"
    >
      {IconComponent}
    </button>
  );
};

export default IconButton;
