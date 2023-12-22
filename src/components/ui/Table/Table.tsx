import { cn, removeLineBreaks } from '@/utilities';

import './Table.styles.css';
import type { TablePropsType } from './Table.types';

/**
 * A custom Table  component.
 * @param props - The component props.
 * @param bordered - For controlling if table has borders.
 * @param className - Additional class names to apply to the icon container.
 * @param hovered - For controlling if color changes at hover.
 * @param layout - For controlling the table layout algorithm.
 * @param padding - For controlling the cells padding.
 * @param shadow - For controlling iftable has shadow.
 * @param size - For controlling the font size.
 * @param transparent - For controlling if table has background color.
 * @returns JSX.Element The rendered Icon component.
 *
 * ```
 * @example
 * <Table bordered hovered layout="auto" padding="normal" size="small" transparent>Table content</Table>
 * ```
 */

const Table = (props: TablePropsType): JSX.Element => {
  const {
    bordered = false,
    children,
    className = '',
    hovered = false,
    layout = 'auto',
    padding = 'none',
    rounded = false,
    shadow = false,
    size = 'medium',
    transparent = false,
    zebra = false,
  } = props;

  return (
    <table
      className={cn(
        removeLineBreaks`
          ${bordered ? 'bordered-table' : ''}
          ${hovered ? 'hovered-table' : ''}
          ${layout === 'auto' ? 'table-auto' : ''}
          ${layout === 'fixed' ? 'table-fixed' : ''}
          ${padding === 'normal' ? 'padding-normal' : ''}
          ${padding === 'large' ? 'padding-large' : ''}
          ${shadow ? 'table-shadow' : ''}
          ${size === 'small' ? 'table-small' : ''}
          ${size === 'large' ? 'table-large' : ''}
          ${!transparent ? 'bg-white' : ''}
          ${zebra ? 'table-zebra' : ''}
          ${rounded ? 'rounded-table' : ''}
          personalized-table
          table
          w-full`,
        className
      )}
    >
      {children}
    </table>
  );
};

export default Table;
