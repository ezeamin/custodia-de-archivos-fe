import { useState } from 'react';

import { cn, removeLineBreaks } from '@/utilities';

import type { AccordionPropsType } from './Accordion.types';

/**
 * Accordion is used for showing and hiding content but only one item can stay open at a time.
 * @param props - The component props.
 * @param className - Additional class names to apply to the icon container.
 * @param title - Title element.
 * @returns JSX.Element The rendered Icon component.
 *
 * ```
 * @example
 *
 * - Standalone usage:
 * <Accordion title="Some Text">Some Content</Accordion>
 * ```
 */

const Accordion = (props: AccordionPropsType): JSX.Element => {
  const { children, className = '', title = '' } = props;

  const [open, setOpen] = useState(false);

  return (
    <div className="join join-vertical w-full">
      <div
        className={cn(
          removeLineBreaks`
            ${open ? 'collapse-open' : 'collapse-close'}
            collapse collapse-arrow join-item border border-base-300`,
          className
        )}
      >
        <input
          checked={open}
          name="my-accordion"
          type="radio"
          onClick={() => {
            setOpen(!open);
          }}
        />
        <div className="collapse-title text-xl font-medium">{title}</div>
        <div className="collapse-content">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
