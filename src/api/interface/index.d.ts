export interface API_GlobalResponse<T, V> {
  data: T | V | null;
  message: string | null;
  totalElements?: number;
}
