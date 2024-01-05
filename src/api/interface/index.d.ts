export interface API_GlobalResponse<T, V> {
  data: T | V | null;
  message: string | null;
  totalElements?: number;
}

export interface API_EmptyResponse {}

export interface EmptyResponse extends API_EmptyResponse {}
