import { cn } from 'utilities';

import { type SkeletonProps } from './Skeleton.types';

const Skeleton = (props: SkeletonProps): JSX.Element => {
  const { type = 'rect', className, ...rest } = props;

  const circularStyles = cn(
    'h-12 w-12 bg-skeleton rounded-full animate-pulse',
    className
  );

  const rectStyles = cn(
    'h-10 w-16 bg-skeleton rounded animate-pulse',
    className
  );

  return (
    <div
      className={type === 'circle' ? circularStyles : rectStyles}
      {...rest}
    />
  );
};
export default Skeleton;
