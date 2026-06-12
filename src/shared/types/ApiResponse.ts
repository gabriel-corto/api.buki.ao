export interface ApiDataResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
export interface ApiNoDataResponse {
  message: string;
  success: boolean;
}
