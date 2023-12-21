import { cn, removeLineBreaks } from 'utilities';

import type { StepperPropsType } from './Stepper.types';

/**
 * Steps can be used to show a list of steps in a process.
 * @param props - The component props.
 * @param active - For coloring the active steps.
 * @param className - Additional class names to apply to the stepper.
 * @param container - For fixing an element's width to the current breakpoint.
 * @param item - To control the flexbox behavior of an element.
 * @returns JSX.Element The rendered Stepper component.
 *
 * ```
 * @example
 *
 * - Standalone usage:
 * <Stepper container><Stepper active item>Some Text</Stepper></Stepper>
 * ```
 */

const Stepper = (props: StepperPropsType): JSX.Element => {
  const {
    active = false,
    children,
    className,
    container = false,
    item = false,
  } = props;

  return (
    <div
      className={cn(
        removeLineBreaks`
          ${active ? 'step-neutral' : ''}
          ${container ? 'steps steps-vertical md:steps-horizontal' : ''}
          ${item ? 'step' : ''}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Stepper;
