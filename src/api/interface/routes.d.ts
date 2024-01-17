import { AnyProp } from '@/interface';

export interface ApiRoute extends AnyProp {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  useToken?: boolean;
  omitBaseUrl?: boolean;
}
