export interface ApiDataResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}
export interface ApiNoDataResponse {
  message: string;
  success: boolean;
}
