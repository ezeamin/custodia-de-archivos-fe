'use client';

import { cn, removeLineBreaks } from 'utilities';

import type { TooltipPropsType } from './Tooltip.types';

/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 * @param props - The component props.
 * @param className - Additional class names to apply to the icon container.
 * @param position - Placement.
 * @param title - Informative text displayed.
 * @returns JSX.Element The rendered Icon component.
 *
 * ```
 * @example
 *
 * - Standalone usage:
 * <Tooltip title='Some Informative Text'>Some Text</Tooltip>
 * ```
 */

const Tooltip = (props: TooltipPropsType): JSX.Element => {
  const { children, className = '', position = 'top', title = '' } = props;

  return (
    <div
      className={cn(
        removeLineBreaks`
          ${position === 'bottom' ? 'tooltip-bottom' : ''}        
          ${position === 'left' ? 'tooltip-left' : ''}
          ${position === 'right' ? 'tooltip-right' : ''}
          ${position === 'top' ? 'tooltip-top' : ''}
          tooltip
          tooltip-info`,
        className
      )}
      data-tip={title}
    >
      {children}
    </div>
  );
};

export default Tooltip;
