import type { AnyProp } from '@/interface';

export interface SkeletonProps extends AnyProp {
  type?: 'circle' | 'rect';
  className?: string;
}
