export interface PaginationPropsType {
  totalElements: number;
  onPageChange?: (event: React.SyntheticEvent, numberParam: number) => void;
  queryKey: string[];
  entries?: number;
}
