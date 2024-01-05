export interface API_GlobalResponse<V> {
  data: V | null;
  message: string | null;
  totalElements?: number;
}

export interface API_EmptyResponse {}

export interface EmptyResponse extends API_EmptyResponse {}
