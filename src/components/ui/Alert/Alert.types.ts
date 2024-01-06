export interface AlertPropsType {
  children?: string | React.ReactNode;
  className?: string;
  closable?: boolean;
  hideIcon?: boolean;
  type?: 'error' | 'info' | 'success' | 'warning' | 'loading';
}
