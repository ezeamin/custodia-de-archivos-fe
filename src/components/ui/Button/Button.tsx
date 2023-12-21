'use client';

import { useEffect, useState } from 'react';

import { cn, removeLineBreaks } from 'utilities';

import Icon from '../Icon/Icon';

import type { ButtonPropsType } from './Button.types';

/**
 * Generates the ARIA label for the button.
 *
 * @param content - The content of the button.
 * @param buttonAriaLabel - A custom ARIA label for the button.
 * @param aditionalText - Additional text to prepend to the generated ARIA label.
 * @returns The generated ARIA label for the button.
 */
const generateAriaLabel = (
  content: ButtonPropsType['children'],
  buttonAriaLabel: string | undefined,
  aditionalText: string | undefined
): string | undefined => {
  if (buttonAriaLabel) {
    return buttonAriaLabel;
  }

  if (typeof content === 'string') {
    return `${aditionalText} ${content}`.toLowerCase();
  }

  return undefined;
};

/**
 * A reusable generic button in the DaisyUI style.
 *
 * @param props - Properties for the generic button.
 * @param activeButton - Specifies whether the button should have an active style.
 * @param ariaHidden - Specifies whether the button should be hidden from screen readers.
 * @param ariaLabel - A string that provides a label for the button for screen readers. If not provided, the label is generated based on the button's content.
 * @param className - Additional CSS classes to apply to the button.
 * @param children - Content to display within the button.
 * @param colorDark - The color of the button in dark mode. You can provide a DaisyUI color class to be applied in dark mode. Example: 'btn-info'.
 * @param colorLight - The color of the button in light mode. You can provide a DaisyUI color class to be applied in light mode. Example: 'btn-ghost'.
 * @param disabled - Specifies whether the button is disabled.
 * @param dti - Data Test ID for testing purposes.
 * @param endIcon - The icon component to display after the text.
 * @param glass- Specifies whether the button should have a glass effect.
 * @param name - The name attribute of the button.
 * @param onClick - Event handler for the button's click event.
 * @param outlineButton - Specifies whether the button should have an outline style.
 * @param size - Specifies the text size of the button using predefined classes like 'text-xs' or 'text-lg', or a custom size using 'text-[18px]'.
 * @param sizeText - Additional classes for customizing the text size of the button.
 * @param startIcon - The icon component to display before the text.
 * @param tabIndex - Specifies the tab index of the button for keyboard navigation.
 * @param textColorDark - The color of the text in the button in dark mode. You can provide a DaisyUI color class to be applied to the text in dark mode. Example: 'text-zinc-100 or text-white'.
 * @param textColorLight - The color of the text in the button in light mode. You can provide a DaisyUI color class to be applied to the text in light mode. Example: 'text-zinc-900 or text-black'.
 * @param type - Specifies the type of the button.
 * @param unstyled - Specifies whether the button should be unstyled (without default button styling).
 * @param withoutAnimation - Specifies whether to disable click animation.
 * @returns JSX.Element A stylized button element.
 * @throws Will throw an error if both `activeButton` and `outlineButton` are enabled simultaneously.
 *
 * ```
 * @example
 *
 * - Standard button:
 * <Button color="btn-primary" size="btn-md" onClick={handleClick}>Click Me</Button>
 *
 * @example
 * - Button with icons:
 * <Button startIcon={{ iconComponent: IconStart }} endIcon={{ iconComponent: IconEnd }}>Button with Icons</Button>
 *
 * @example
 * - Outline button:
 * <Button outlineButton color="btn-accent" size="btn-lg">Outlined Button</Button>
 * ```
 */

const Button = (props: ButtonPropsType): JSX.Element => {
  const {
    activeButton = false,
    ariaHidden = false,
    ariaLabel,
    className = '',
    children,
    colorDark = '',
    colorLight = '',
    dti,
    disabled = false,
    endIcon,
    glass = false,
    ignoreDefaultColor = false,
    loading = false,
    lowerCase = false,
    name,
    onClick,
    outlineButton = false,
    size = '',
    sizeText = '',
    startIcon,
    tabIndex = 0,
    textColorDark = '',
    textColorLight = '',
    type = 'button',
    unbordered = false,
    unstyled = false,
    value,
    withoutAnimation = false,
  } = props;

  const [disabledState, setDisabledState] = useState(true);

  if (activeButton && outlineButton) {
    throw new Error(
      'Both activeButton and outlineButton are enabled. Use either one, not both.'
    );
  }

  if (
    (startIcon?.iconComponent || endIcon?.iconComponent) &&
    !children &&
    !ariaLabel
  ) {
    throw new Error(
      'To improve accessibility it is necessary the ariaLabel prop in the button.'
    );
  }

  useEffect(() => {
    setDisabledState(disabled);
  }, [disabled]);

  const defaultColor = ignoreDefaultColor || unstyled ? '' : 'dark:text-white';

  const textContent =
    typeof children === 'string' && !lowerCase
      ? children.toUpperCase()
      : children;

  return (
    <button
      aria-disabled={Boolean(disabledState)}
      aria-hidden={ariaHidden}
      aria-label={generateAriaLabel(children, ariaLabel, 'Botón para')}
      className={cn(
        removeLineBreaks`
      ${unstyled ? '' : 'btn'} 
      ${activeButton ? 'btn-active' : ''}
      ${colorLight} 
      ${colorDark} 
      ${glass ? 'glass' : ''}
      ${outlineButton ? 'btn-outline' : ''} 
      ${size}
      ${sizeText}
      ${textColorLight} 
      ${textColorDark ? textColorDark : defaultColor}
      ${unbordered ? 'border-0' : ''}
      ${withoutAnimation ? 'no-animation' : ''}`,
        className
      )}
      data-testid={dti}
      disabled={disabledState || loading}
      name={name}
      onClick={onClick}
      tabIndex={tabIndex}
      // eslint-disable-next-line react/button-has-type -- default value: 'button'
      type={type}
      value={value}
    >
      {startIcon && !loading ? (
        <Icon
          iconComponent={startIcon.iconComponent}
          title={
            startIcon.title ||
            (typeof children === 'string'
              ? `icon-start-button-${children}`
              : `icon-start-button`)
          }
        />
      ) : null}

      {loading ? <span className="loading loading-spinner loading-sm" /> : null}

      {typeof children === 'string' ? textContent : children}

      {endIcon ? (
        <Icon
          iconComponent={endIcon.iconComponent}
          title={
            endIcon.title ||
            (typeof children === 'string'
              ? `icon-end-button-${children}`
              : `icon-end-button`)
          }
        />
      ) : null}
    </button>
  );
};

export default Button;
