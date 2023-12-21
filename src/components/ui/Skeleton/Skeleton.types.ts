import { type AnyProp } from '../../types';

export interface SkeletonProps extends AnyProp {
  type?: 'circle' | 'rect';
  className?: string;
}
